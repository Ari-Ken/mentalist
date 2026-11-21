/**
 * THE MENTALIST — "FLIP THE SCRIPT" CBT COGNITIVE GYM
 * Fast-paced cognitive distortion identification and reframing drill.
 */

import { economy } from './economy.js';
import { storage } from './storage.js';
import { audio } from './audio.js';

export const CBT_DISTORTIONS = [
  {
    distortionType: 'Catastrophizing & Personalization',
    mentalistTrap: "Your flagship startup burned $5M and failed. You are a biological failure who will never build anything.",
    options: [
      { text: "He is right. I wasted investor money and ruined my family's reputation.", isCorrect: false },
      { text: "I bought $5M worth of empirical market data on what models fail; I retain the architecture and execute the enterprise pivot.", isCorrect: true },
      { text: "It wasn't my fault, the venture capitalists rigged the term sheet against me.", isCorrect: false },
      { text: "I will hide in my basement until the media forgets my name.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Black-and-White Thinking',
    mentalistTrap: "You didn't hit 100% of your quarterly revenue target. That means you are completely incompetent.",
    options: [
      { text: "Missing a target is proof that perfection is impossible, so goals don't matter.", isCorrect: false },
      { text: "A 92% realization in a contracting macro-climate proves our pricing power; we adjust pipeline velocity for Q3.", isCorrect: true },
      { text: "I should fire all sales managers immediately without reviewing conversion funnels.", isCorrect: false },
      { text: "I will falsify the remaining 8% on deferred invoices to show a win.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Emotional Reasoning',
    mentalistTrap: "I feel sick and anxious about this boardroom presentation, therefore disaster is guaranteed to occur.",
    options: [
      { text: "Anxiety is a physical sign of elevated adrenaline and readiness; physiological arousal is fuel for sharp execution.", isCorrect: true },
      { text: "My feelings never lie; if I feel like a fraud, the board will see it too.", isCorrect: false },
      { text: "I should cancel the board meeting and send a memo instead.", isCorrect: false },
      { text: "I'll take anxiolytics and numb my emotions so I don't care about the outcome.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Fortune Telling & Scarcity Bias',
    mentalistTrap: "Interest rates increased 200 bps. The commercial real estate industry is dead forever.",
    options: [
      { text: "Sell everything at fire-sale discounts before prices hit zero.", isCorrect: false },
      { text: "Higher interest rates flush out reckless overleveraged speculators; our cash-rich balance sheet now acquires distressed trophies at 40% discounts.", isCorrect: true },
      { text: "Lobby the government for an emergency bailout.", isCorrect: false },
      { text: "Refuse to pay property taxes in protest.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Sunk Cost Fallacy & Emotional Honoring',
    mentalistTrap: "We have poured $2.5M into this legacy ERP software. We cannot abandon it now for a $50k modern SaaS tool.",
    options: [
      { text: "The $2.5M is already spent and gone; evaluate solely on forward operating leverage and productivity.", isCorrect: true },
      { text: "Keep spending $500k a year maintaining it so the original investment isn't wasted.", isCorrect: false },
      { text: "Blame the original CTO and force the engineers to write patches forever.", isCorrect: false },
      { text: "Pretend the system works fine so the board doesn't see a writedown.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Mind Reading & Imposter Syndrome',
    mentalistTrap: "The lead venture partner paused for 4 seconds during my pitch deck. She clearly thinks I am a fraud.",
    options: [
      { text: "A pause indicates deep cognitive processing and evaluation; I maintain grounded silence and let the data stand.", isCorrect: true },
      { text: "Start rambling frantically and offer a 20% discount on pre-money valuation.", isCorrect: false },
      { text: "Apologize for wasting her time and pack up my laptop.", isCorrect: false },
      { text: "Conclude that Silicon Valley is rigged against founders like me.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Should Statements & Martyrdom',
    mentalistTrap: "I should be working 100 hours a week without sleeping. Real billionaires don't need recovery.",
    options: [
      { text: "Exhausted executives make catastrophic asymmetric mistakes; prefrontal cortex recovery is an essential risk management protocol.", isCorrect: true },
      { text: "Sleep is for the weak; drink more energy stimulants and push through.", isCorrect: false },
      { text: "Complain on Twitter about hustle culture while accomplishing nothing.", isCorrect: false },
      { text: "Quit entrepreneurship altogether and take a passive salary.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Discounting the Positive (Vanity Obsession)',
    mentalistTrap: "Our net operating profit grew 45% this year, but a competitor got featured on the cover of Forbes, so we lost.",
    options: [
      { text: "Public relations covers don't fund payroll or build balance sheets; true wealth is audited free cash flow.", isCorrect: true },
      { text: "Spend $100k on PR agencies to get an vanity magazine cover too.", isCorrect: false },
      { text: "Fire the marketing team for not getting media attention.", isCorrect: false },
      { text: "Pivot the entire company to copy the competitor's soundbites.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Social Proof Stampede & Herd Mania',
    mentalistTrap: "Every hedge fund on Wall Street is buying this new speculative token. We are fools if we hold cash.",
    options: [
      { text: "Herd stampedes create irrational bubbles; independent thinkers buy when others are panicking and hold cash when the herd is manic.", isCorrect: true },
      { text: "FOMO in with 50% of the firm's capital so we don't look stupid.", isCorrect: false },
      { text: "Short the asset with 10x leverage to prove we are smarter than the crowd.", isCorrect: false },
      { text: "Resign and give our capital to a meme coin influencer.", isCorrect: false }
    ]
  },
  {
    distortionType: 'Charlie Munger Envy & Jealousy Tendency',
    mentalistTrap: "Your college roommate just made $40M on an AI flip. You are falling behind in the social hierarchy.",
    options: [
      { text: "Envy is the only mortal sin with zero fun attached; celebrate peer variance while compounding your own sovereign moat.", isCorrect: true },
      { text: "Take extreme reckless leverage on penny stocks to catch up quickly.", isCorrect: false },
      { text: "Stop talking to him and secretly pray his venture fails.", isCorrect: false },
      { text: "Publicly post passive-aggressive critiques of his tech stack on LinkedIn.", isCorrect: false }
    ]
  }
];

class CBTGymManager {
  constructor() {
    this.timer = null;
    this.timeLeft = 60;
    this.score = 0;
    this.currentIndex = 0;
    this.isActive = false;
  }

  startDrill() {
    this.timeLeft = 60;
    this.score = 0;
    this.currentIndex = 0;
    this.isActive = true;
    audio.ensureContext();

    this.timer = setInterval(() => {
      this.timeLeft--;
      window.dispatchEvent(new CustomEvent('mentalist:cbt_tick', { detail: { timeLeft: this.timeLeft } }));
      if (this.timeLeft <= 0) {
        this.endDrill();
      }
    }, 1000);

    this.renderCurrentQuestion();
  }

  getCurrentQuestion() {
    return CBT_DISTORTIONS[this.currentIndex % CBT_DISTORTIONS.length];
  }

  renderCurrentQuestion() {
    const q = this.getCurrentQuestion();
    window.dispatchEvent(new CustomEvent('mentalist:cbt_render_question', {
      detail: { question: q, index: this.currentIndex, score: this.score }
    }));
  }

  answer(optionIndex) {
    if (!this.isActive) return;
    const q = this.getCurrentQuestion();
    const chosen = q.options[optionIndex];

    if (chosen.isCorrect) {
      this.score += 100;
      audio.playCoinChime();
      storage.update((state) => {
        state.mindGraph.stoicRegulation = Math.min(100, state.mindGraph.stoicRegulation + 2);
        state.mindGraph.financialEQ = Math.min(100, state.mindGraph.financialEQ + 3);
      });
    } else {
      audio.playAlarmSpike();
      this.timeLeft = Math.max(0, this.timeLeft - 5); // 5-second penalty
    }

    this.currentIndex++;
    this.renderCurrentQuestion();
  }

  endDrill() {
    if (this.timer) clearInterval(this.timer);
    this.isActive = false;

    // Reward Cognitive Credits
    const earnedCredits = Math.round(this.score / 2);
    economy.addCredits(earnedCredits, 0, `Cognitive Gym Yield: Flip the Script (${this.score} pts)`);

    window.dispatchEvent(new CustomEvent('mentalist:cbt_completed', {
      detail: { score: this.score, earnedCredits }
    }));
  }
}

export const cbtGym = new CBTGymManager();
