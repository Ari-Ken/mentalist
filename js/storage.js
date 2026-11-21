/**
 * THE MENTALIST — CRASH-PROOF PERSISTENCE & STATE STORAGE
 */

const STORAGE_KEY = 'the_mentalist_state_v1';

const DEFAULT_STATE = {
  profile: {
    archetype: 'tech_disruptor', // 'tech_disruptor', 'wall_street_quant', 'real_estate_mogul', 'legacy_industrialist'
    callsign: 'BUILDER-77',
    clearanceStatus: 'UNCERTIFIED', // 'UNCERTIFIED', 'REMANDED_TO_YARD', 'CLEARED_BUILDER', 'SOVEREIGN_ARCHITECT'
    totalSessions: 0,
    passedSessions: 0,
    failedSessions: 0
  },
  wallet: {
    cognitiveCredits: 1200, // Starting grant
    totalInvestedUSD: 0,
    transactions: [
      {
        id: 'INIT_GRANT',
        date: new Date().toISOString(),
        description: 'Founding American Builder Capital Grant',
        amountUSD: 0,
        credits: 1200,
        status: 'CONFIRMED'
      }
    ],
    activeBonds: []
  },
  mindGraph: {
    locusOfControl: 65,      // 0-100 (Internal vs External/Victim)
    resilienceGrit: 58,      // 0-100
    financialEQ: 62,         // 0-100 (Behavioral Economics bias immunity)
    riskTolerance: 70,       // 0-100 (Objective risk vs fear)
    stoicRegulation: 60,     // 0-100 (Emotional control under duress)
    strategicIntegrity: 75   // 0-100 (Ethical abundance vs shortcut traps)
  },
  empire: {
    unlockedBuildings: ['think_tank'], // 'think_tank', 'behavioral_library', 'quant_terminal', 'resilience_center'
    equippedSkills: ['stoic_pause'],    // 'stoic_pause', 'loss_shield', 'inversion_lens'
    unlockedSkills: ['stoic_pause']
  },
  dossiers: {
    currentStreak: 3,
    lastCompletedDate: null,
    history: []
  },
  activeSession: null, // Holds active interrogation progress for crash recovery
  yardState: {
    isJailed: false,
    reason: null,
    assignedModule: null
  }
};

class StorageManager {
  constructor() {
    this.state = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('[Storage] Error reading state from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('[Storage] Error persisting state to localStorage:', e);
    }
  }

  getState() {
    return this.state;
  }

  update(updaterFn) {
    updaterFn(this.state);
    this.save();
    window.dispatchEvent(new CustomEvent('mentalist:state_updated', { detail: this.state }));
  }

  resetAll() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
    window.dispatchEvent(new CustomEvent('mentalist:state_updated', { detail: this.state }));
  }

  exportData() {
    return JSON.stringify(this.state, null, 2);
  }

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      this.state = { ...DEFAULT_STATE, ...parsed };
      this.save();
      window.dispatchEvent(new CustomEvent('mentalist:state_updated', { detail: this.state }));
      return true;
    } catch (e) {
      console.error('[Storage] Import failed', e);
      return false;
    }
  }
}

export const storage = new StorageManager();
