/**
 * THE MENTALIST — "AMERICAN EMPIRE" BASE BUILDING & SKILL TREE DEFENSES
 * Visual meta-progression: building cognitive infrastructure and equipping psychological shields.
 */

import { storage } from './storage.js';
import { economy } from './economy.js';
import { audio } from './audio.js';

export const EMPIRE_BUILDINGS = [
  {
    id: 'think_tank',
    name: 'Founding Think Tank',
    icon: '🏛️',
    costCredits: 0,
    benefit: 'Baseline cognitive operational center (+5% Mind Capital yield)',
    category: 'Core'
  },
  {
    id: 'behavioral_library',
    name: 'Behavioral Economics Library',
    icon: '📚',
    costCredits: 500,
    benefit: 'Passive +10% FEQ boost and deconstruction of historical billionaire models',
    category: 'Analytics'
  },
  {
    id: 'quant_terminal',
    name: 'Algorithmic Risk Terminal',
    icon: '💻',
    costCredits: 1000,
    benefit: 'Instant Expected Value (EV) overlays in high-duress dilemmas',
    category: 'Intelligence'
  },
  {
    id: 'resilience_center',
    name: 'Stoic Citadel & Resilience Center',
    icon: '🛡️',
    costCredits: 1500,
    benefit: 'Increases Cognitive Load panic threshold from 100% to 120%',
    category: 'Defense'
  },
  {
    id: 'fed_war_room',
    name: 'Federal Reserve Macro War Room',
    icon: '🦅',
    costCredits: 2500,
    benefit: 'Grants +20% extra yield on matured Discipline Bonds & liquidity crisis immunity',
    category: 'Sovereignty'
  },
  {
    id: 'sovereign_vault',
    name: 'Sovereign Bullion & Mind Vault',
    icon: '🪙',
    costCredits: 4000,
    benefit: 'Doubles daily dossier credit rewards and unlocks exclusive Forbes-grade clearance insignia',
    category: 'Ascension'
  }
];

export const SKILL_TREE = [
  {
    id: 'stoic_pause',
    name: 'The Stoic Pause',
    description: 'Grants +3 extra seconds before hesitation penalties kick in, allowing deliberate thought without panic.',
    costCredits: 350,
    equipped: true
  },
  {
    id: 'loss_shield',
    name: 'Loss Aversion Shield',
    description: 'Dampens the Mentalist’s fear provocations and scarcity traps by 20%.',
    costCredits: 750,
    equipped: false
  },
  {
    id: 'inversion_lens',
    name: 'Charlie Munger Inversion Lens',
    description: 'Illuminates deceptive honey-traps and off-the-books side deals before you make a decision.',
    costCredits: 1200,
    equipped: false
  },
  {
    id: 'sovereign_presence',
    name: 'Sovereign Titan Presence',
    description: 'Renders your prefrontal cortex immune to verbal insults; dampens ego penalty spikes by 35%.',
    costCredits: 1800,
    equipped: false
  }
];

class EmpireManager {
  getEmpireState() {
    return storage.getState().empire;
  }

  unlockBuilding(buildingId) {
    const building = EMPIRE_BUILDINGS.find(b => b.id === buildingId);
    if (!building) return { success: false, message: 'Invalid building' };

    const state = storage.getState();
    if (state.empire.unlockedBuildings.includes(buildingId)) {
      return { success: false, message: 'Building already constructed' };
    }

    if (!economy.canAfford(building.costCredits)) {
      return { success: false, message: `Insufficient Cognitive Capital. Requires ${building.costCredits} ₡.` };
    }

    economy.deductCredits(building.costCredits, `Constructed Infrastructure: ${building.name}`);

    storage.update((s) => {
      s.empire.unlockedBuildings.push(buildingId);
    });

    audio.playCoinChime();
    window.dispatchEvent(new CustomEvent('mentalist:empire_updated'));
    return { success: true };
  }

  unlockSkill(skillId) {
    const skill = SKILL_TREE.find(s => s.id === skillId);
    if (!skill) return { success: false, message: 'Invalid skill' };

    const state = storage.getState();
    if (state.empire.unlockedSkills.includes(skillId)) {
      return { success: false, message: 'Skill already acquired' };
    }

    if (!economy.canAfford(skill.costCredits)) {
      return { success: false, message: `Insufficient Cognitive Capital. Requires ${skill.costCredits} ₡.` };
    }

    economy.deductCredits(skill.costCredits, `Unlocked Mental Defense: ${skill.name}`);

    storage.update((s) => {
      s.empire.unlockedSkills.push(skillId);
      s.empire.equippedSkills.push(skillId);
    });

    audio.playCoinChime();
    window.dispatchEvent(new CustomEvent('mentalist:empire_updated'));
    return { success: true };
  }

  toggleEquipSkill(skillId) {
    storage.update((s) => {
      const idx = s.empire.equippedSkills.indexOf(skillId);
      if (idx > -1) {
        s.empire.equippedSkills.splice(idx, 1);
      } else if (s.empire.unlockedSkills.includes(skillId)) {
        s.empire.equippedSkills.push(skillId);
      }
    });
    window.dispatchEvent(new CustomEvent('mentalist:empire_updated'));
  }
}

export const empire = new EmpireManager();
