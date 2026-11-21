/**
 * THE MENTALIST — SOVEREIGN DIGITAL MONEY & ECONOMY LEDGER
 * "You Don't Spend. You Invest."
 */

import { storage } from './storage.js';
import { FLUTTERWAVE_CONFIG } from '../config/flutterwave.config.js';
import { audio } from './audio.js';

class EconomyManager {
  constructor() {
    this.packages = FLUTTERWAVE_CONFIG.PACKAGES;
    this.coinName = FLUTTERWAVE_CONFIG.COIN_NAME;
    this.coinSymbol = FLUTTERWAVE_CONFIG.COIN_SYMBOL;
  }

  getBalance() {
    return storage.getState().wallet.cognitiveCredits;
  }

  canAfford(cost) {
    return this.getBalance() >= cost;
  }

  deductCredits(cost, description) {
    if (!this.canAfford(cost)) {
      return { success: false, message: 'Insufficient Cognitive Capital. Allocate funds to proceed.' };
    }

    storage.update((state) => {
      state.wallet.cognitiveCredits -= cost;
      state.wallet.transactions.unshift({
        id: 'ALLOC_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        description: description,
        amountUSD: 0,
        credits: -cost,
        status: 'DEPLOYED'
      });
    });

    return { success: true, newBalance: this.getBalance() };
  }

  addCredits(credits, amountUSD, description, transactionRef = null) {
    storage.update((state) => {
      state.wallet.cognitiveCredits += credits;
      state.wallet.totalInvestedUSD += amountUSD;
      state.wallet.transactions.unshift({
        id: transactionRef || 'FLW_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        description: description,
        amountUSD: amountUSD,
        credits: credits,
        status: 'CONFIRMED'
      });
    });

    audio.playCoinChime();
    window.dispatchEvent(new CustomEvent('mentalist:capital_allocated', {
      detail: { credits, amountUSD, description }
    }));

    return this.getBalance();
  }

  getTransactions() {
    return storage.getState().wallet.transactions;
  }
}

export const economy = new EconomyManager();
