/**
 * THE MENTALIST — DYNAMIC ESCALATION PROTOCOLS
 * Real-time hesitation tracking, scarcity keyword analysis, and Black Swan overrides.
 */

import { audio } from './audio.js';
import { storage } from './storage.js';

export class EscalationEngine {
  constructor(stateMachine, onInterruptCallback, onBlackSwanCallback) {
    this.stateMachine = stateMachine;
    this.onInterrupt = onInterruptCallback;
    this.onBlackSwan = onBlackSwanCallback;

    this.timer = null;
    this.elapsedSeconds = 0;
    this.hasWarned8s = false;
    this.hasWarned15s = false;
    this.active = false;

    this.scarcityKeywords = [
      { word: 'hope', penalty: { load: 5, scarcity: 10 }, response: "Hope is not a business strategy. Hope is the currency of the unprepared." },
      { word: 'try', penalty: { load: 5, ego: 10 }, response: "There is no 'try'. You either have leverage or you are the leverage." },
      { word: 'fair', penalty: { load: 10, scarcity: 15 }, response: "Fair? You're in enterprise, not a kindergarten. 'Fair' is invented by people who can't build leverage." },
      { word: 'unfair', penalty: { load: 10, scarcity: 15 }, response: "Complaining about 'unfair' rules proves you're a victim, not an architect." },
      { word: 'impossible', penalty: { load: 15, scarcity: 20 }, response: "Impossible only describes what someone else hasn't figured out yet." }
    ];
  }

  startHesitationTracker(phaseNumber) {
    this.stopHesitationTracker();
    this.elapsedSeconds = 0;
    this.hasWarned8s = false;
    this.hasWarned15s = false;
    this.active = true;

    // Check equipped skills
    const equipped = storage.getState().empire?.equippedSkills || [];
    const hasStoicPause = equipped.includes('stoic_pause');
    const firstThreshold = hasStoicPause ? 11 : 8;
    const secondThreshold = hasStoicPause ? 18 : 15;

    this.timer = setInterval(() => {
      this.elapsedSeconds += 1;
      audio.playClockTick();

      // UI countdown fill update event
      window.dispatchEvent(new CustomEvent('mentalist:hesitation_tick', {
        detail: { seconds: this.elapsedSeconds, hasStoicPause }
      }));

      // First Hesitation Penalty
      if (this.elapsedSeconds >= firstThreshold && !this.hasWarned8s) {
        this.hasWarned8s = true;
        this.stateMachine.applyDelta({ load: 5 });
        audio.playAlarmSpike();
        if (this.onInterrupt) {
          this.onInterrupt(hasStoicPause 
            ? "[STOIC PAUSE ACTIVE] Time buffer expended. The market makes the choice for you. Next."
            : "Take too long to think, and the market makes the choice for you. Next.");
        }
      }

      // Second Hesitation Penalty
      if (this.elapsedSeconds >= secondThreshold && !this.hasWarned15s) {
        this.hasWarned15s = true;
        this.stateMachine.applyDelta({ ego: 10, load: 10 });
        audio.playAlarmSpike();
        if (this.onInterrupt) {
          this.onInterrupt("Silence is just fear wearing a suit. You're terrified of making the wrong choice. That's why you'll stay mediocre.");
        }
      }
    }, 1000);
  }

  stopHesitationTracker() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.active = false;
  }

  checkKeywords(text) {
    if (!text) return null;
    const lower = text.toLowerCase();
    for (const item of this.scarcityKeywords) {
      if (lower.includes(item.word)) {
        this.stateMachine.applyDelta(item.penalty);
        audio.playAlarmSpike();
        return item.response;
      }
    }
    return null;
  }

  evaluateBlackSwan(phaseNumber) {
    const metrics = this.stateMachine.getMetrics();
    // If player has breezed through without taking any cognitive load by Phase 3
    if (phaseNumber === 3 && metrics.cognitiveLoad < 20 && metrics.stoicWealth > 60) {
      if (this.onBlackSwan) {
        this.onBlackSwan({
          title: "BLACK SWAN ANOMALY DETECTED",
          text: "Actually, forget your comfortable spreadsheet. I just received a subpoena. Your lead engineer just stole your core codebase and sold it to an overseas competitor. You have 60 seconds to tell me how you protect the cap table or I'm notifying the DOJ. Go."
        });
        this.stateMachine.applyDelta({ load: 35 });
        audio.playAlarmSpike();
        return true;
      }
    }
    return false;
  }
}
