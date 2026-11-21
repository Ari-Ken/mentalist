/**
 * THE MENTALIST — PROBABILITY CALIBRATION SIMULATOR
 * Expected Value (EV) vs Loss Aversion under duress.
 */

import { storage } from './storage.js';
import { economy } from './economy.js';
import { audio } from './audio.js';

export const PROBABILITY_CASES = [
  {
    title: 'The Series B Bridge Dilemma',
    scenario: 'You have a cash offer of $1.5M guaranteed, OR an 80% chance of closing a $3.0M syndicated round with a 20% risk of total financing collapse.',
    guaranteedEV: 1.5,
    riskEV: 2.4, // 0.8 * 3.0 = 2.4M
    rationalChoice: 'risk',
    wealthLesson: "Wealth builders choose positive expected value (+EV $2.4M vs $1.5M) and hedge the downside, rather than letting loss aversion lock in inferior terms."
  },
  {
    title: 'The Hostile Competitor Acquisition',
    scenario: 'A competitor offers $10M cash acquisition today, OR a 70% probability of capturing the market worth $25M (EV $17.5M) with a 30% risk of losing $2M.',
    guaranteedEV: 10.0,
    riskEV: 16.9, // 0.7 * 25 - 0.3 * 2 = 16.9M
    rationalChoice: 'risk',
    wealthLesson: "Selling out cheap due to fear of downside variance transfers compound enterprise upside to corporate predators."
  },
  {
    title: 'The Patent Litigation Settlement',
    scenario: 'A patent troll offers to settle out of court for $2.0M cash, OR your litigators cite an 85% probability of complete dismissal with a 15% risk of paying $4.0M in damages.',
    guaranteedEV: 2.0,
    riskEV: 0.6, // Expected loss: 0.15 * 4.0 = $0.6M
    rationalChoice: 'risk',
    wealthLesson: "Fighting frivolous extortion when your mathematical odds are 85% protects both your treasury ($0.6M EV loss vs $2.0M guaranteed extortion) and institutional reputation."
  },
  {
    title: 'The Commercial Real Estate Distressed Bid',
    scenario: 'Acquire an office trophy at 50% discount ($12M) with a 65% probability of generating $28M post-conversion vs guaranteed 5% return ($12.6M) in government money markets.',
    guaranteedEV: 12.6,
    riskEV: 18.2, // 0.65 * 28 = $18.2M
    rationalChoice: 'risk',
    wealthLesson: "Generational fortunes in American real estate are built by allocating cash into deep distress during macroeconomic rate hikes."
  },
  {
    title: 'The Asymmetric R&D AI Wedge',
    scenario: 'Invest $1M in proprietary foundational weights: 40% probability of creating an enterprise moat worth $12M, 60% probability of zero return, OR leave the $1M in cash reserves.',
    guaranteedEV: 1.0,
    riskEV: 4.8, // 0.4 * 12 = $4.8M
    rationalChoice: 'risk',
    wealthLesson: "Nassim Taleb's Antifragile Barbell: Allocate small bounded capital (-$1M) to capture unbounded convex upside (+$12M)."
  },
  {
    title: 'The Overleveraged Yield Trap',
    scenario: 'A private credit fund offers a guaranteed 18% yield on subordinated mezzanine debt, OR an index of AAA sovereign treasuries yielding 5.2%.',
    guaranteedEV: 1.18,
    riskEV: 1.052,
    rationalChoice: 'guaranteed',
    wealthLesson: "Rule #1: Never reach for yield in opaque credit during late economic cycles. Return OF capital precedes return ON capital."
  }
];

class ProbabilitySimulator {
  constructor() {
    this.currentCaseIndex = 0;
  }

  getCurrentCase() {
    return PROBABILITY_CASES[this.currentCaseIndex % PROBABILITY_CASES.length];
  }

  evaluateDecision(choice) {
    const c = this.getCurrentCase();
    const isCorrect = (choice === c.rationalChoice);

    if (isCorrect) {
      audio.playCoinChime();
      storage.update(state => {
        state.mindGraph.financialEQ = Math.min(100, state.mindGraph.financialEQ + 6);
        state.mindGraph.riskTolerance = Math.min(100, state.mindGraph.riskTolerance + 5);
      });
      economy.addCredits(75, 0, 'Probability Calibration Mastery');
    } else {
      audio.playAlarmSpike();
      storage.update(state => {
        state.mindGraph.financialEQ = Math.max(0, state.mindGraph.financialEQ - 4);
      });
    }

    this.currentCaseIndex++;
    return { isCorrect, lesson: c.wealthLesson };
  }
}

export const probabilityGym = new ProbabilitySimulator();
