/**
 * THE MENTALIST — "THE YARD" (PSYCHOLOGICAL RESET & REHABILITATION)
 * "Going to jail isn't Game Over. It is a mandatory psychiatric debrief."
 */

import { storage } from './storage.js';

export const REHAB_MODULES = [
  {
    id: 'loss_aversion_cbt',
    title: 'Extinguishing Loss Aversion',
    framework: 'Kahneman & Tversky Behavioral Finance',
    description: 'Human neurobiology feels losses twice as intensely as equivalent gains. Learn to uncouple amygdala fear spikes from capital reallocation.',
    questions: [
      {
        prompt: "Your product development is $3M in the hole, with zero organic adoption. A competitor just released a free API. You are experiencing...",
        choices: [
          { text: "A rational desire to protect the $3M already spent (Loyalty)", isCorrect: false },
          { text: "The Sunk Cost Fallacy: honoring past expenses that cannot be recovered", isCorrect: true },
          { text: "Bad luck caused by macroeconomic Fed policies", isCorrect: false }
        ],
        explanation: "Sunk costs are unrecoverable. Every future dollar must be judged solely on forward-looking ROI."
      },
      {
        prompt: "When the Mentalist screamed that your career was over, your optimal neuro-cognitive response was...",
        choices: [
          { text: "Shouting back louder to establish alpha status", isCorrect: false },
          { text: "Immediate compliance to de-escalate the tension", isCorrect: false },
          { text: "CBT Cognitive Restructuring: recognizing emotional volume does not change mathematics", isCorrect: true }
        ],
        explanation: "Stoic detachment allows your prefrontal cortex to maintain dominance over fear centers."
      }
    ]
  },
  {
    id: 'munger_inversion',
    title: 'Charlie Munger: Inversion Thinking',
    framework: 'Mental Models for High-Stakes Capital',
    description: 'Always invert. Instead of asking how to become a billionaire, ask what guarantees bankruptcy, and ruthlessly eliminate it.',
    questions: [
      {
        prompt: "How does Charlie Munger solve complex dilemmas under pressure?",
        choices: [
          { text: "He models the worst possible catastrophic failure, then avoids it backwards", isCorrect: true },
          { text: "He assumes optimism will manifest positive revenue", isCorrect: false },
          { text: "He accepts secret side deals to guarantee downside protection", isCorrect: false }
        ],
        explanation: "Inversion clarifies risk: 'All I want to know is where I'm going to die so I'll never go there.'"
      },
      {
        prompt: "Under high emotional temptation to accept a compromised side-deal, inversion dictates...",
        choices: [
          { text: "Assume nobody will discover the conflict of interest", isCorrect: false },
          { text: "Invert: If this agreement appeared on the front page of the Wall Street Journal, would it destroy the firm?", isCorrect: true },
          { text: "Ask if competitors are doing it and copy them", isCorrect: false }
        ],
        explanation: "The newspaper headline test instantly reveals fiduciary toxicity before contracts are signed."
      }
    ]
  },
  {
    id: 'founder_sunk_cost',
    title: 'Sunk Cost & Founder Attachment',
    framework: 'Executive Prefrontal Restructuring',
    description: 'Overcoming emotional identity fusion with failed legacy projects. Leaders reallocate capital without guilt.',
    questions: [
      {
        prompt: "Why do founders cling to dying product architectures instead of pivoting?",
        choices: [
          { text: "Identity Fusion: they confuse abandoning a bad product with admitting personal inadequacy", isCorrect: true },
          { text: "Because stubbornness is the true mark of genius", isCorrect: false },
          { text: "Because venture capitalists demand zero pivots", isCorrect: false }
        ],
        explanation: "Pivoting is not failure; it is empirical calibration based on live market evidence."
      }
    ]
  },
  {
    id: 'antifragility_taleb',
    title: 'The Antifragile Capital Barbell',
    framework: 'Nassim Taleb Risk Architecture',
    description: 'Constructing balance sheets that gain from chaos rather than shattering when black swans strike.',
    questions: [
      {
        prompt: "What separates an antifragile builder from a fragile speculator?",
        choices: [
          { text: "Antifragile builders hold deep cash reserves and capped downside while exploiting convex upside", isCorrect: true },
          { text: "Fragile builders take zero risks and never invest", isCorrect: false },
          { text: "Antifragile builders rely on government bailouts during liquidity freezes", isCorrect: false }
        ],
        explanation: "True American builders survive the worst draw-down and compound while others are liquidated."
      }
    ]
  }
];

class YardManager {
  isJailed() {
    return storage.getState().yardState.isJailed;
  }

  getDetentionDetails() {
    return storage.getState().yardState;
  }

  completeRehabilitation() {
    storage.update((state) => {
      state.yardState.isJailed = false;
      state.yardState.reason = null;
      state.profile.clearanceStatus = 'UNCERTIFIED';
      state.mindGraph.resilienceGrit += 10;
      state.mindGraph.financialEQ += 5;
    });

    window.dispatchEvent(new CustomEvent('mentalist:yard_released'));
  }
}

export const yard = new YardManager();
