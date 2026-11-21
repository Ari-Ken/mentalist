/**
 * THE MENTALIST — PSYCHOLOGICAL STATE MACHINE
 * Mathematical hidden metrics engine and dynamic persona switching.
 */

import { storage } from './storage.js';

export class PsychologicalStateMachine {
  constructor(initialMetrics = {}) {
    this.cognitiveLoad = initialMetrics.cognitiveLoad || 15;     // 0-100% (Stress / Panic)
    this.egoDefensiveness = initialMetrics.egoDefensiveness || 20; // 0-100% (Arrogance / Justification)
    this.scarcityFear = initialMetrics.scarcityFear || 25;       // 0-100% (Loss aversion / Short-term fear)
    this.stoicWealth = initialMetrics.stoicWealth || 40;         // 0-100% (Probabilistic / Long-term)

    this.currentMode = 'observer'; // 'observer', 'provocateur', 'interrogator', 'trap_setter'
    
    // Check if player constructed Stoic Citadel in American Empire
    const unlocked = storage.getState()?.empire?.unlockedBuildings || [];
    this.panicThreshold = unlocked.includes('resilience_center') ? 120 : 100;
  }

  getMetrics() {
    return {
      cognitiveLoad: Math.min(100, Math.max(0, Math.round(this.cognitiveLoad))),
      egoDefensiveness: Math.min(100, Math.max(0, Math.round(this.egoDefensiveness))),
      scarcityFear: Math.min(100, Math.max(0, Math.round(this.scarcityFear))),
      stoicWealth: Math.min(100, Math.max(0, Math.round(this.stoicWealth))),
      mode: this.currentMode
    };
  }

  applyDelta({ load = 0, ego = 0, scarcity = 0, stoic = 0 }) {
    this.cognitiveLoad = Math.min(100, Math.max(0, this.cognitiveLoad + load));
    this.egoDefensiveness = Math.min(100, Math.max(0, this.egoDefensiveness + ego));
    this.scarcityFear = Math.min(100, Math.max(0, this.scarcityFear + scarcity));
    this.stoicWealth = Math.min(100, Math.max(0, this.stoicWealth + stoic));

    this.evaluatePersonaMode();
    return this.getMetrics();
  }

  evaluatePersonaMode() {
    // Mode 4: Trap-Setter (Deceptive Conny Strategy) when player is doing too well
    if (this.stoicWealth >= 65 && this.cognitiveLoad < 45) {
      this.currentMode = 'trap_setter';
    }
    // Mode 3: Interrogator (Hostile) when Ego spikes
    else if (this.egoDefensiveness >= 55) {
      this.currentMode = 'interrogator';
    }
    // Mode 2: Provocateur (Pressing) when Scarcity / Fear rises
    else if (this.scarcityFear >= 50 || this.cognitiveLoad >= 60) {
      this.currentMode = 'provocateur';
    }
    // Mode 1: Observer (Baseline)
    else {
      this.currentMode = 'observer';
    }

    return this.currentMode;
  }

  isPanicked() {
    return this.cognitiveLoad >= this.panicThreshold;
  }
}
