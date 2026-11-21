/**
 * THE MENTALIST — DAILY DOSSIERS & MENTAL MOMENTUM STREAKS
 * Daily behavioral riddles and real-world wealth-building challenges.
 */

import { storage } from './storage.js';
import { economy } from './economy.js';
import { bonds } from './bonds.js';
import { audio } from './audio.js';

export const DAILY_DOSSIERS = [
  {
    id: 'dossier_01',
    dayTitle: 'Dossier #01: The Asymmetric Bet',
    scenario: "You are considering spending $2,000 on an advanced predictive market intelligence feed. The downside is $2,000. The upside is identifying a single mispriced arbitrage worth $60,000. Your amygdala warns you: 'You might waste $2,000.' What is your decision?",
    options: [
      { text: "Pass. A guaranteed loss of $2,000 feels too painful.", isCorrect: false },
      { text: "Execute immediately. This is an asymmetric bet: capped downside (-$2k) vs convex upside (+$60k).", isCorrect: true },
      { text: "Wait 6 months and ask 10 friends on social media.", isCorrect: false }
    ],
    realWorldChallenge: "Today's Real-World Action: Audit your monthly recurring software or subscription expenses. Cut at least one low-ROI expense."
  },
  {
    id: 'dossier_02',
    dayTitle: 'Dossier #02: Delayed Gratification Audit',
    scenario: "You just closed a major client contract and received a $15,000 commission check. Traditional dopamine urges suggest buying a luxury watch. What does sovereign capital dictate?",
    options: [
      { text: "Buy the watch to project high status to other people.", isCorrect: false },
      { text: "Allocate 80% directly into cash-flow productive assets; compound interest creates permanent freedom.", isCorrect: true },
      { text: "Put it all in a checking account and let inflation erode it.", isCorrect: false }
    ],
    realWorldChallenge: "Today's Real-World Action: Do not spend any non-essential discretionary funds for 24 hours. Practice deliberate cognitive restraint."
  },
  {
    id: 'dossier_03',
    dayTitle: 'Dossier #03: Inversion Thinking (Munger Protocol)',
    scenario: "You are launching a high-priority enterprise project. Before writing the launch schedule, Charlie Munger advises you to ask...",
    options: [
      { text: "'How can we guarantee this project burns all capital, alienates customers, and ends in ruin?' — then eliminate those causes backwards.", isCorrect: true },
      { text: "'How can we get featured on the cover of a startup magazine on Day 1?'", isCorrect: false },
      { text: "'What is the fastest way to raise venture debt?'", isCorrect: false }
    ],
    realWorldChallenge: "Today's Real-World Action: Write down the single worst financial catastrophe that could hit your business or career this year. Build a preventative firewall."
  },
  {
    id: 'dossier_04',
    dayTitle: 'Dossier #04: The 24-Hour Stoic Rule',
    scenario: "A prospective corporate partner abruptly emails you cancelling a negotiated contract with rude language. Your heart spikes with adrenaline. What is the rule of American titans?",
    options: [
      { text: "Never reply in the heat of anger; impose a strict 24-hour pause so your prefrontal cortex analyzes the contractual breach objectively.", isCorrect: true },
      { text: "Reply within 60 seconds with furious legal threats and insults.", isCorrect: false },
      { text: "Post the rude email on LinkedIn to crowdsource outrage.", isCorrect: false }
    ],
    realWorldChallenge: "Today's Real-World Action: When hit by any frustrating message or news today, take 3 slow diaphragmatic breaths and wait at least 30 minutes before responding."
  },
  {
    id: 'dossier_05',
    dayTitle: 'Dossier #05: Margin of Safety Stress Test',
    scenario: "Your financial projections show your business breaks even at 70% capacity. Macroeconomic credit conditions are tightening. What does Ben Graham's Margin of Safety require?",
    options: [
      { text: "Assume 80% capacity is guaranteed because your marketing is great.", isCorrect: false },
      { text: "Re-engineer cost structures so the business survives at 45% capacity; resilience creates permanence.", isCorrect: true },
      { text: "Double down on marketing ad spend using credit lines.", isCorrect: false }
    ],
    realWorldChallenge: "Today's Real-World Action: Calculate your monthly personal or business burn rate. Verify you have at least 6 months of liquid reserves in cash equivalents."
  },
  {
    id: 'dossier_06',
    dayTitle: 'Dossier #06: The Flattery & Honey-Trap Filter',
    scenario: "A charismatic dealmaker praises your visionary intellect and asks you to personally guarantee a short-term promissory note for an offshore syndicate. How do you assess?",
    options: [
      { text: "Flattery is the cheapest anesthetic known to man; whenever anyone flatters your ego, immediately double your forensic skepticism.", isCorrect: true },
      { text: "Sign the guarantee because someone finally recognizes your greatness.", isCorrect: false },
      { text: "Negotiate a 1% higher interest rate and sign.", isCorrect: false }
    ],
    realWorldChallenge: "Today's Real-World Action: Review any active deal, contract, or partnership. Verify it stands on verified mathematical numbers, not charming rapport."
  },
  {
    id: 'dossier_07',
    dayTitle: 'Dossier #07: Sovereign Capital Compounding',
    scenario: "You complete a grueling 7-day cognitive cycle. The crowd celebrates quick exits and speculative trading. What is the definitive thesis of The Mentalist?",
    options: [
      { text: "You don't spend. You allocate capital to construct cognitive infrastructure that compounds sovereign freedom forever.", isCorrect: true },
      { text: "Wealth is flashy luxury toys and status displays.", isCorrect: false },
      { text: "Success is random luck and cannot be trained.", isCorrect: false }
    ],
    realWorldChallenge: "Today's Real-World Action: Reinvest a portion of your time or capital today into deep knowledge, foundational health, or cognitive mastery."
  }
];

class DossierManager {
  getTodayDossier() {
    const s = storage.getState().dossiers;
    const index = (s.currentStreak || 0) % DAILY_DOSSIERS.length;
    return DAILY_DOSSIERS[index];
  }

  submitDossierAnswer(optionIndex) {
    const d = this.getTodayDossier();
    const isCorrect = d.options[optionIndex].isCorrect;

    if (isCorrect) {
      audio.playCoinChime();
      storage.update((state) => {
        state.dossiers.currentStreak = (state.dossiers.currentStreak || 0) + 1;
        state.dossiers.lastCompletedDate = new Date().toISOString();
        state.mindGraph.financialEQ = Math.min(100, state.mindGraph.financialEQ + 4);
      });

      // Record bond completion
      bonds.recordDossierCompletion();

      // Yield Mind Capital
      economy.addCredits(100, 0, `Daily Dossier Solved: Streak #${storage.getState().dossiers.currentStreak}`);

      return { success: true, message: `Streak Maintained: ${storage.getState().dossiers.currentStreak} Days! +100 ₡ Capital credited.` };
    } else {
      audio.playAlarmSpike();
      return { success: false, message: 'Incorrect behavioral reframe. Review the wealth logic.' };
    }
  }
}

export const dossiers = new DossierManager();
