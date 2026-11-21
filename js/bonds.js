/**
 * THE MENTALIST — "SKIN IN THE GAME" DISCIPLINE BONDS ESCROW
 * Behavioral economics commitment contracts using Loss Aversion for good.
 */

import { storage } from './storage.js';
import { economy } from './economy.js';
import { FLUTTERWAVE_CONFIG } from '../config/flutterwave.config.js';

class DisciplineBondManager {
  constructor() {
    this.bondTiers = FLUTTERWAVE_CONFIG.DISCIPLINE_BONDS;
  }

  getActiveBonds() {
    return storage.getState().wallet.activeBonds || [];
  }

  stakeBond(bondId) {
    const bondDef = this.bondTiers.find(b => b.id === bondId);
    if (!bondDef) return { success: false, message: 'Invalid bond contract tier' };

    // Check if player has enough coins/capital
    if (!economy.canAfford(bondDef.coinsStake)) {
      return {
        success: false,
        message: `Insufficient capital. This contract requires staking ${bondDef.coinsStake} ₡. Fund your balance to commit.`
      };
    }

    // Deduct coins to escrow
    economy.deductCredits(bondDef.coinsStake, `Discipline Bond Locked: ${bondDef.name}`);

    const newBond = {
      instanceId: 'BOND_' + Date.now(),
      bondId: bondDef.id,
      name: bondDef.name,
      stakeCoins: bondDef.coinsStake,
      stakeUSD: bondDef.stakeUSD,
      startDate: new Date().toISOString(),
      expiresDate: new Date(Date.now() + bondDef.durationDays * 24 * 60 * 60 * 1000).toISOString(),
      requiredDossiers: bondDef.requiredDailyDossiers,
      completedDossiers: 0,
      requiredInterrogations: bondDef.requiredPassedInterrogations,
      passedInterrogations: 0,
      yieldMultiplier: bondDef.rewardYieldMultiplier,
      status: 'ACTIVE' // 'ACTIVE', 'SETTLED_SUCCESS', 'FORFEITED'
    };

    storage.update((state) => {
      if (!state.wallet.activeBonds) state.wallet.activeBonds = [];
      state.wallet.activeBonds.push(newBond);
    });

    return { success: true, bond: newBond };
  }

  recordDossierCompletion() {
    storage.update((state) => {
      if (!state.wallet.activeBonds) return;
      state.wallet.activeBonds.forEach(b => {
        if (b.status === 'ACTIVE') {
          b.completedDossiers += 1;
          this.checkSettlement(b, state);
        }
      });
    });
  }

  recordInterrogationSuccess() {
    storage.update((state) => {
      if (!state.wallet.activeBonds) return;
      state.wallet.activeBonds.forEach(b => {
        if (b.status === 'ACTIVE') {
          b.passedInterrogations += 1;
          this.checkSettlement(b, state);
        }
      });
    });
  }

  checkSettlement(bond, state) {
    if (bond.completedDossiers >= bond.requiredDossiers && bond.passedInterrogations >= bond.requiredInterrogations) {
      // Payout principal + yield!
      const payout = Math.round(bond.stakeCoins * bond.yieldMultiplier);
      bond.status = 'SETTLED_SUCCESS';
      state.wallet.cognitiveCredits += payout;
      state.wallet.transactions.unshift({
        id: 'YIELD_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        description: `Bond Matured with Yield: ${bond.name} (+${payout - bond.stakeCoins} ₡ bonus)`,
        amountUSD: 0,
        credits: payout,
        status: 'CONFIRMED'
      });
      alert(`★ COMMITMENT CONTRACT FULFILLED! You received your ${bond.stakeCoins} ₡ principal + ${payout - bond.stakeCoins} ₡ yield.`);
    }
  }
}

export const bonds = new DisciplineBondManager();
