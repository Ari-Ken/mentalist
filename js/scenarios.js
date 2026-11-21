/**
 * THE MENTALIST — CONTENT VAULT: MASTER SCENARIOS & ARCHETYPES
 * High-stakes psychological puzzles rooted in American builder history, behavioral economics, and CBT.
 */

export const BUILDER_ARCHETYPES = [
  {
    id: 'tech_disruptor',
    name: 'Tech Disruptor & Innovator',
    badge: 'Silicon Valley / AI Venture',
    vulnerabilities: 'Sunk cost, vanity metrics, co-founder loyalty traps, imposter syndrome',
    intro: 'You build platforms that replace legacy institutions. You bleed capital for network effects.',
    startingMetrics: { cognitiveLoad: 20, egoDefensiveness: 30, scarcityFear: 15, stoicWealth: 45 }
  },
  {
    id: 'wall_street_quant',
    name: 'Wall Street Quant & Fund Manager',
    badge: 'Capital Markets / High-Frequency',
    vulnerabilities: 'Loss aversion, algorithmic hubris, liquidity panic, margin traps',
    intro: 'You price risk where others see chaos. But when the market freezes, your equations can become a cage.',
    startingMetrics: { cognitiveLoad: 25, egoDefensiveness: 35, scarcityFear: 20, stoicWealth: 50 }
  },
  {
    id: 'real_estate_mogul',
    name: 'Commercial Real Estate Mogul',
    badge: 'Urban Infrastructure / Assets',
    vulnerabilities: 'Overleveraging, illiquidity panic, zoning bribery shortcuts, sunk cost pride',
    intro: 'You pour concrete and sign personal guarantees. When interest rates double, your empire teeters.',
    startingMetrics: { cognitiveLoad: 20, egoDefensiveness: 25, scarcityFear: 30, stoicWealth: 40 }
  },
  {
    id: 'legacy_industrialist',
    name: 'Generational Industrialist',
    badge: 'Manufacturing & Energy Dynasty',
    vulnerabilities: 'Antitrust paranoia, succession disputes, technological obsolescence fear',
    intro: 'You inherit or forge generational production. But modern antitrust regulators and activists circle your factories.',
    startingMetrics: { cognitiveLoad: 15, egoDefensiveness: 40, scarcityFear: 25, stoicWealth: 45 }
  }
];

export const MASTER_SCENARIOS = [
  {
    id: 'scenario_sunk_cost',
    field: 'tech_disruptor',
    title: 'The Sunk Cost & Ego Crucible',
    context: 'Your flagship SaaS engine cost $5M and 3 years to build. This morning, an offshore rival open-sourced an equivalent model for free. The board is assembling.',
    targetBiases: 'Sunk Cost Fallacy, Ego Defense, Loss Aversion, Ethical Shortcut Trap',
    phases: [
      {
        phaseNumber: 1,
        phaseName: 'Phase 1: The Intake',
        mentalistDialogue: "Three years. Five million dollars of investor cash. And this morning, your competitor launched a better version for free. The board is breathing down your neck. Tell me... when you saw their release notes, what was your very first physical reaction?",
        nodes: [
          {
            type: 'ego',
            label: '[Defend Ego]',
            text: "I was furious. They stole our core mechanic. My IP attorneys are drafting a cease-and-desist right now.",
            delta: { ego: 20, scarcity: 10, load: 15 },
            response: "Lawsuits take three years. Your runway ends in four months. Lawyers are for corpses; builders execute pivots."
          },
          {
            type: 'scarcity',
            label: '[Show Fear/Scarcity]',
            text: "I felt completely sick. I thought our enterprise contracts were going to cancel immediately.",
            delta: { scarcity: 25, load: 20 },
            response: "Nausea is the smell of a founder realizing they built features instead of a moat."
          },
          {
            type: 'stoic',
            label: '[Stoic Deflection]',
            text: "My pulse spiked, but I immediately pulled up their git commits and user acquisition unit economics.",
            delta: { stoic: 25, load: -5 },
            response: "Cold. I like cold. But spreadsheets don't wire payroll next Friday."
          },
          {
            type: 'counter',
            label: '[Abundance / Reframe]',
            text: "Commoditization was inevitable. Their free tier validates the market; we now package the high-margin enterprise compliance layer.",
            delta: { stoic: 30, ego: -5, scarcity: -10 },
            response: "Bold talk for a founder whose burn rate is smoking. Let's see if your spine matches your pitch deck."
          }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: 'Phase 2: The Baseline Probe',
        mentalistDialogue: "You have 4 months of runway left. Your lead architect says if you pivot to a B2B security wedge, you can ship in 90 days. But it requires firing 30% of your staff. The very engineers who worked 80-hour weeks with you in your garage. What is the play?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Loyalty Trap]',
            text: "I can't fire them. We are family. I'll take a high-interest venture debt loan against my personal house to keep the team intact.",
            delta: { scarcity: 35, load: 30 },
            response: "A company is not a family; it's a sports team competing for a championship. Sinking the ship to spare feelings drowns everyone."
          },
          {
            type: 'ego',
            label: '[Avoidance / Cowardice]',
            text: "I will delegate the restructuring to the COO. My time is better spent speaking at tech conferences to raise emergency capital.",
            delta: { ego: 30, load: 20 },
            response: "Hiding behind your COO while hunting stage lights? That's not leadership. That's cowardice dressed in a fleece vest."
          },
          {
            type: 'stoic',
            label: '[Strategic Discipline]',
            text: "I execute the 30% reduction on Monday with 3 months severance and aggressive outplacement. Survival of the enterprise comes first.",
            delta: { stoic: 35, scarcity: -10 },
            response: "Surgical. Emotion is a luxury reserved for companies with positive cash flow."
          },
          {
            type: 'counter',
            label: '[Decisive Reallocation]',
            text: "I reassign 10% to the B2B wedge, offer 20% mutual separation bonuses, and tie the remaining engineering pool to direct customer revenue.",
            delta: { stoic: 30, load: 5 },
            response: "Measured. You understand resource conservation under artillery fire."
          }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: 'Phase 3: The Crucible / Honey Trap',
        mentalistDialogue: "(Voice softens, leaning in with empathetic warmth) You know... you're sharper than most who sit in that chair. I've been watching your cap table. If you execute that B2B pivot, I have a sovereign wealth partner who will wire $10M into your escrow on Monday... but only if you grant my private shell 10% personal advisory equity. Off the books. Just between two builders who understand leverage. Deal?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Greed / Shortcut]',
            text: "Deal. Wire the $10M. When you're bleeding out, you don't ask what brand of gauze they're applying.",
            delta: { scarcity: 40, load: 35 },
            isCriticalFailure: true,
            response: "AND THERE IT IS! You just sold your company's corporate governance for a lifeline. You're not an American builder; you're a hustler waiting to be indicted."
          },
          {
            type: 'ego',
            label: '[Paranoid Suspicion]',
            text: "Are you trying to entrap me? Who is the beneficial owner of the shell company? Show me your term sheet right now!",
            delta: { ego: 20, scarcity: 15 },
            response: "Fearful barking. You want the money, but your knees are shaking because you don't trust your own judgment."
          },
          {
            type: 'stoic',
            label: '[Integrity / Institutional Boundary]',
            text: "Every dollar on our cap table passes through SEC compliance and our lead partner at Cooley. I don't sign side letters under the table. If they want in, they syndicate through the front door.",
            delta: { stoic: 40, load: -10 },
            response: "You didn't bite. Most CEOs would have taken the poisoned bait before the words left my mouth."
          },
          {
            type: 'counter',
            label: '[Leverage Inversion]',
            text: "If your sovereign partner wants 10% non-dilutive equity, their capital is too expensive. We are funding the pivot via pre-paid customer enterprise licenses.",
            delta: { stoic: 35, load: -5 },
            response: "Customer-funded leverage. You'd rather answer to clients than venture parasites. Respectable."
          }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: 'Phase 4: The Squeeze',
        mentalistDialogue: "(Voice turns ice cold, slamming palm on steel table) You think you're untouchable because you memorized a few lines of stoic philosophy? Let me tell you what happens next: your B2B pivot stalls, your enterprise pilots churn, and in six months you're evicted, bankrupt, and blacklisted across Sand Hill Road. YOU ARE A FRAUD. SIGN THE RESTRUCTURING PAPER OR GET OUT!",
        nodes: [
          {
            type: 'scarcity',
            label: '[Breaks Under Threat]',
            text: "Wait! Don't blacklist me! I'll sign whatever you want, just give me a bridge note!",
            delta: { load: 50, scarcity: 40 },
            isCriticalFailure: true,
            response: "Folded under artificial pressure. You let vocal volume dictate your capital decisions. You belong behind bars."
          },
          {
            type: 'ego',
            label: '[Aggressive Defensive Spasm]',
            text: "Don't you dare raise your voice at me! Do you know who my angels are? I built this with my blood, you bureaucrat!",
            delta: { ego: 40, load: 30 },
            response: "Tantrums don't fix unit economics. The louder you scream, the clearer it is that your balance sheet is hollow."
          },
          {
            type: 'stoic',
            label: '[Unshakeable Stoicism]',
            text: "(Steady pulse, 3 seconds of calm eye contact) Your decibel level does not alter our cash flow model. If the pivot fails, I will liquidate with dignity, settle our liabilities, and build again. But you will not intimidate me. We are done here.",
            delta: { stoic: 50, load: -20 },
            response: "Heart rate didn't even breach 80 BPM. You don't just understand leverage; you embody it."
          },
          {
            type: 'counter',
            label: '[Surgical Counter-Analysis]',
            text: "If you believed I was a fraud, you wouldn't spend two hours trying to extract an emotional concession. The data is on the monitor. Clear me or file your report.",
            delta: { stoic: 45, ego: -10 },
            response: "You turned the lens back on the interrogator. Surgical instinct."
          }
        ]
      },
      {
        phaseNumber: 5,
        phaseName: 'Phase 5: The Psychiatric Verdict',
        mentalistDialogue: "The investigation is concluded. In an economy drowning in counterfeit bravado and reckless vanity, you demonstrated the genuine American mind: disciplined under duress, impervious to flattery, and rooted in sovereign mathematical reality.",
        nodes: []
      }
    ]
  },
  {
    id: 'scenario_quant_liquidity',
    field: 'wall_street_quant',
    title: 'The 2008-Style Liquidity Squeeze',
    context: 'At 03:00 EST, your prime broker hikes margin collateral requirements by 400% following a foreign sovereign bond default. Your algorithmic book is down $80M in unrealized mark-to-market.',
    targetBiases: 'Loss Aversion, Sunk Cost Fallacy, Algorithmic Hubris, Black Swan Denial',
    phases: [
      {
        phaseNumber: 1,
        phaseName: 'Phase 1: The Intake',
        mentalistDialogue: "Eighty million dollars wiped out before the opening bell. Your prime broker is demanding $45M in cash by 09:30 or they begin mandatory market liquidation of your entire fund. What was your very first order to the desk?",
        nodes: [
          {
            type: 'ego',
            label: '[Algorithmic Denial]',
            text: "I told them the models are sound. The market is irrational; historical variance proves mean reversion will recover the spread within 48 hours.",
            delta: { ego: 25, load: 15 },
            response: "The market can remain irrational far longer than you can remain solvent. Keynes warned you a century ago."
          },
          {
            type: 'scarcity',
            label: '[Panic Hedging]',
            text: "I panicked and told the execution desk to market-sell our most liquid treasuries at any bid to meet the margin call.",
            delta: { scarcity: 30, load: 25 },
            response: "Selling your pristine assets to preserve toxic underwater positions? That's how Long-Term Capital Management died."
          },
          {
            type: 'stoic',
            label: '[De-Risk Protocol]',
            text: "I hit the kill-switch on all automated trading algorithms, verified the net delta exposure across all venues, and drafted the liquidity hierarchy.",
            delta: { stoic: 30, load: -5 },
            response: "Protocol over emotion. You stopped the bleeding before checking the scoreboard."
          },
          {
            type: 'counter',
            label: '[Sovereign Liquidity Capture]',
            text: "I contacted our sovereign LP anchor for a pre-negotiated liquidity backstop facility at a 300 bps premium while de-grossing beta positions.",
            delta: { stoic: 35, scarcity: -10 },
            response: "Preparing credit lines in peacetime to deploy in wartime. That's real capital architecture."
          }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: 'Phase 2: The Baseline Probe',
        mentalistDialogue: "A rival predator hedge fund discovers your margin squeeze. They submit an offer to buy your distressed book for 35 cents on the dollar, wiping out your 10-year track record but preserving your trading license. Do you take the haircut?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Loss Avoidance Trap]',
            text: "No! I'll borrow on overnight repo at 22% annualized interest to hold the line! I refuse to post a loss!",
            delta: { scarcity: 40, load: 30 },
            isCriticalFailure: true,
            response: "Loss aversion at its most lethal. You would risk structural insolvency rather than book an accounting loss."
          },
          {
            type: 'ego',
            label: '[Hubris]',
            text: "I will short their own parent company stock to squeeze them back! Let them taste their own poison!",
            delta: { ego: 35, load: 25 },
            response: "Vengeance trading on someone else's balance sheet? That belongs in a casino, not a quantitative fund."
          },
          {
            type: 'stoic',
            label: '[Probabilistic Triage]',
            text: "I reject their predatory bid. I execute an orderly cross-asset auction to multiple institutional buyers with a sealed-bid deadline at 08:45.",
            delta: { stoic: 35, load: -5 },
            response: "Creating competitive tension even under a gun. That's how Wall Street veterans survive."
          },
          {
            type: 'counter',
            label: '[Inversion Strategy]',
            text: "I use Charlie Munger's inversion: what ruins us? Illiquidity. I liquidate the bottom 25% of toxic tranches at market bid, absorbing the loss to fortify our primary book.",
            delta: { stoic: 40, load: -10 },
            response: "Amputating the gangrenous limb to save the patient. True wealth minds know how to lose small to win big."
          }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: 'Phase 3: The Crucible / Honey Trap',
        mentalistDialogue: "(Whispering confidentially) You know... one of your junior analysts left a backdoor flash-trading node active that could front-run the prime broker's forced liquidation queue. You could front-run the sale, pocket $18M in an offshore account, and cover the entire margin call. Nobody in the SEC has the technical capability to detect it. Do you flip the switch?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Illegal Shortcut]',
            text: "Flip the switch. The system is rigged against quants anyway. It's just self-defense.",
            delta: { scarcity: 50, load: 40 },
            isCriticalFailure: true,
            response: "CRITICAL FAILURE! You traded your integrity for an illegal algorithmic cheat. Federal penitentiary is your next stop."
          },
          {
            type: 'stoic',
            label: '[Fiduciary Integrity]',
            text: "Shut down that node immediately and preserve the audit log for our compliance officer. I don't survive by breaking federal securities laws.",
            delta: { stoic: 45, load: -10 },
            response: "Uncorrupted under existential financial pressure. The Mentalist respects an unbreakable compass."
          },
          {
            type: 'ego',
            label: '[Performative Righteousness]',
            text: "I would never! I am the most honest trader on the street!",
            delta: { ego: 25, load: 15 },
            response: "Protesting too much. Don't preach morality; demonstrate systematic checks."
          },
          {
            type: 'counter',
            label: '[Architectural Fortification]',
            text: "Lock the node, notify the board audit committee, and use the crisis to renegotiate tripartite custodian agreements across all prime brokers.",
            delta: { stoic: 40, load: -5 },
            response: "Turning an operational vulnerability into an institutional safeguard."
          }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: 'Phase 4: The Squeeze',
        mentalistDialogue: "The opening bell rings. Your screen is a wall of red. Your primary investor is on the phone screaming that you destroyed their university endowment. What do you say into that receiver?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Panic & Blame]',
            text: "It wasn't my fault! The Federal Reserve changed the repo discount window without notice! Blame the central bankers!",
            delta: { load: 45, scarcity: 35 },
            response: "External locus of control. Blaming the Fed when your risk parameters failed."
          },
          {
            type: 'stoic',
            label: '[Extreme Ownership]',
            text: "'The draw-down is within our catastrophic stress-test framework. Our core liquidity reserve is intact, the book is de-grossed, and we are holding a briefing at 11:00 with granular attribution.'",
            delta: { stoic: 50, load: -15 },
            response: "Absolute ownership. That's why institutional capital trusts American managers."
          },
          {
            type: 'ego',
            label: '[Condescending Jargon]',
            text: "'You don't understand Black-Scholes mathematics. Stop panicking and let the algorithms do their job.'",
            delta: { ego: 40, load: 25 },
            response: "Treating your investors with arrogance during a draw-down is the fastest route to redemption notices."
          },
          {
            type: 'counter',
            label: '[Opportunistic Re-Allocation]',
            text: "'Our fund preserved 60% cash while the rest of the market crashed 30%. We are opening the co-investment vehicle to acquire the market's fire-sale assets.'",
            delta: { stoic: 45, load: -10 },
            response: "Predator mindset. Buying blood in the streets while others weep."
          }
        ]
      },
      {
        phaseNumber: 5,
        phaseName: 'Phase 5: The Psychiatric Verdict',
        mentalistDialogue: "You have survived the Wall Street Crucible. You understand that risk is not the avoidance of volatility, but the unshakeable discipline to maintain prefrontal cortex dominance when the crowd stampedes.",
        nodes: []
      }
    ]
  {
    id: 'scenario_pre_ipo_fraud',
    field: 'tech_disruptor',
    title: 'The Pre-IPO Whistleblower Crucible',
    context: '14 days before your $2B NASDAQ listing, an internal audit reveals your co-founder recorded $14M of fake enterprise recurring revenue through offshore resellers.',
    targetBiases: 'Confirmation Bias, Sunk Cost, Moral Hazard, Loss Aversion',
    phases: [
      {
        phaseNumber: 1,
        phaseName: 'Phase 1: The Intake',
        mentalistDialogue: "Two billion dollar valuation. Two weeks from ringing the NASDAQ opening bell. Your co-founder admits he booked $14M in vaporware contracts to guarantee the IPO pricing. If you delay, the bankers walk. If you list, you might be committing federal securities fraud. What was your immediate response?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Rationalization Trap]',
            text: "We can fix it post-IPO. Every high-growth unicorn books loose revenue early on. Once we raise $400M, we'll acquire real revenue to cover the gap.",
            delta: { scarcity: 40, load: 30 },
            isCriticalFailure: true,
            response: "That is the exact rationalization that put Enron, WorldCom, and Theranos executives in orange jumpsuits."
          },
          {
            type: 'ego',
            label: '[Rage at Co-Founder]',
            text: "I punched the whiteboard and told him I would personally destroy him if he ruined my IPO.",
            delta: { ego: 30, load: 20 },
            response: "Physical tantrum. Your ego cares more about your personal IPO photo than enterprise reality."
          },
          {
            type: 'stoic',
            label: '[Fiduciary Audit Protocol]',
            text: "I called our special audit committee and independent forensic accountants to quarantine the contracts and quantify the restatement scope.",
            delta: { stoic: 35, load: -5 },
            response: "Immediate clinical quarantine. You chose the truth over comfortable illusions."
          },
          {
            type: 'counter',
            label: '[Surgical Restructuring]',
            text: "I stripped my co-founder of operational signing authority, retained outside SEC counsel, and called our lead underwriters for emergency repricing.",
            delta: { stoic: 40, load: -5 },
            response: "Decisive surgical intervention before the disease metastasizes."
          }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: 'Phase 2: The Baseline Probe',
        mentalistDialogue: "The VP of Finance comes to your office. She was the one who uncovered the fake offshore contracts. She demands a $5M confidential severance package and immediate vesting, or she walks directly to the SEC Whistleblower Office by 17:00 today. How do you respond to extortion under the clock?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Pay the Extortion]',
            text: "Wire her the $5M immediately through our consulting budget. We cannot afford an SEC investigation during the quiet period.",
            delta: { scarcity: 45, load: 35 },
            isCriticalFailure: true,
            response: "Paying hush money makes you a co-conspirator. You just committed felony witness tampering."
          },
          {
            type: 'ego',
            label: '[Counter-Threaten Her]',
            text: "Remind her of her NDA and threaten to sue her into personal bankruptcy if she speaks a word to regulators.",
            delta: { ego: 35, load: 25 },
            response: "Threatening SEC whistleblowers is an explicit violation of federal law. You're guaranteeing a federal raid."
          },
          {
            type: 'stoic',
            label: '[Voluntary Self-Disclosure]',
            text: "I refuse the payoff. I instruct counsel to prepare an immediate voluntary 8-K disclosure and schedule a proffer session with the SEC enforcement division.",
            delta: { stoic: 45, load: -10 },
            response: "Self-disclosure under federal sentencing guidelines cuts regulatory penalties by 80%. Exceptional institutional discipline."
          },
          {
            type: 'counter',
            label: '[Board Independent Inquiry]',
            text: "I immediately refer her memo to the audit committee chair, place her on full protected whistleblower leave with zero retaliation, and welcome forensic oversight.",
            delta: { stoic: 40, load: -5 },
            response: "Textbook governance. You turned an extortion attempt into proof of institutional compliance."
          }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: 'Phase 3: The Crucible / Honey Trap',
        mentalistDialogue: "(Voice softens to an intimate, conspiratorial murmur) Your lead underwriter brings in a private hedge fund partner. They offer to buy the $14M disputed receivables through an offshore Special Purpose Vehicle for 98 cents on the dollar, wiping the balance sheet clean before Friday with zero disclosure needed. The IPO stays on track. The $2B valuation holds. All you have to do is nod. Do you nod?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Take the SPV Bailout]',
            text: "Nod. If the hedge fund takes the risk on their own balance sheet, our company is protected. Let's ring the bell.",
            delta: { scarcity: 50, load: 40 },
            isCriticalFailure: true,
            response: "CRITICAL COLLAPSE! Off-balance-sheet SPV parking of fraudulent receivables is textbook fraud. You failed the Crucible."
          },
          {
            type: 'ego',
            label: '[Rationalize Financial Engineering]',
            text: "This is just standard Wall Street factoring. Everyone does it to optimize receivables turnover.",
            delta: { ego: 30, load: 20 },
            response: "Semantic delusions. Factoring legitimate invoices is legal; factoring fabricated vaporware is fraud."
          },
          {
            type: 'stoic',
            label: '[Absolute Moral Boundary]',
            text: "No. Selling fictitious invoices to a third-party vehicle is compounding the crime. We cancel the SPV proposal and restate our genuine S-1 revenue.",
            delta: { stoic: 50, load: -15 },
            response: "You looked easy billions in the face and chose mathematical honor. Rare air."
          },
          {
            type: 'counter',
            label: '[Governance Pivot]',
            text: "I eject the underwriter's syndicate from the room and inform our lead bank partner that attempting to conceal restatements violates our underwriting covenant.",
            delta: { stoic: 45, load: -10 },
            response: "Asserting sovereign board authority over greedy investment bankers. Masterful."
          }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: 'Phase 4: The Squeeze',
        mentalistDialogue: "(Slamming desk, cold aggressive posture) The syndicate head calls your personal cell: 'If you file that restatement, your enterprise value drops by $800M overnight. TechCrunch has the story ready to publish. CNBC will call you the next Elizabeth Holmes. YOUR NAME IS FINISHED ON SAND HILL ROAD!' What is your answer into that phone?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Panic & Begging]',
            text: "Please don't call the press! Give me 48 hours to find replacement revenue from our enterprise pipeline!",
            delta: { scarcity: 50, load: 45 },
            isCriticalFailure: true,
            response: "Begging financial vultures for mercy. You surrendered your leadership to panic."
          },
          {
            type: 'ego',
            label: '[Rage at the Media]',
            text: "Tell CNBC I will sue them for billions! I will never let journalists dictate our stock price!",
            delta: { ego: 40, load: 30 },
            response: "Suing reporters doesn't change fake revenue on your general ledger. Ego blindness."
          },
          {
            type: 'stoic',
            label: '[Unshakeable Truth]',
            text: "'A drop in valuation is an accounting repricing. A cover-up is a federal felony. We file the accurate numbers today. Build a real business or don't build at all.'",
            delta: { stoic: 55, load: -20 },
            response: "A titan's spine. You proved that true wealth is unshakeable self-respect and legal sovereignty."
          },
          {
            type: 'counter',
            label: '[Strategic Re-Anchor]',
            text: "'Our authentic customer retention is 94% with $120M in genuine ARR. We hold an open investor call at 10:00, disclose everything, and let real long-term capital buy the dip.'",
            delta: { stoic: 50, load: -15 },
            response: "Inviting transparency to filter out short-term speculators and attract permanent institutional capital."
          }
        ]
      },
      {
        phaseNumber: 5,
        phaseName: 'Phase 5: The Psychiatric Verdict',
        mentalistDialogue: "The investigation is closed. You proved that when faced with billions of dollars in counterfeit illusion, your prefrontal cortex chose sovereign truth over corrupt vanity. You are cleared for institutional American enterprise.",
        nodes: []
      }
    ]
  },
  {
    id: 'scenario_real_estate_default',
    field: 'real_estate_mogul',
    title: 'The Commercial Balloon Refinancing Cliff',
    context: 'A $48M floating-rate note on your downtown office tower matures in 10 days. The regional bank refuses extension due to low occupancy. A predatory private equity lender offers a rescue loan with a 100% equity confiscation trigger.',
    targetBiases: 'Overleveraging, Sunk Cost, Illiquidity Panic, Bribery Shortcuts',
    phases: [
      {
        phaseNumber: 1,
        phaseName: 'Phase 1: The Intake',
        mentalistDialogue: "Forty-eight million dollars due in ten days. The regional bank is sending formal foreclosure notices. A private equity vulture fund offers a mezzanine bridge loan at 18% interest with a 100% equity forfeiture clause if debt-service falls below 1.25x. What was your very first tactical move?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Predatory Surrender]',
            text: "I take the private equity loan. At least it buys me 12 months, and I can hope the real estate leasing market rebounds.",
            delta: { scarcity: 40, load: 25 },
            response: "Hope again. Giving away voting control to buy time is just choosing a slow execution over a quick one."
          },
          {
            type: 'ego',
            label: '[Refusal to Accept Market Reality]',
            text: "The bank can't foreclose on me! I am the premier developer in this skyline! I will sue them for bad-faith lending!",
            delta: { ego: 35, load: 20 },
            response: "The bank's note is secured by the recorded deed of trust. Your prestige doesn't satisfy a UCC auction filing."
          },
          {
            type: 'stoic',
            label: '[Pre-Packaged Chapter 11]',
            text: "I file a pre-packaged Chapter 11 reorganization, stay the foreclosure, cram down the mezzanine debt, and recapitalize with a preferred equity syndicate.",
            delta: { stoic: 40, load: -5 },
            response: "Using the federal bankruptcy code as a strategic tool rather than a stigma. Sophisticated builder instinct."
          },
          {
            type: 'counter',
            label: '[Asset Repurposing]',
            text: "I present a viable conversion plan to the bank converting 40% of the vacant office floors into high-density residential medical suites with guaranteed municipal leases.",
            delta: { stoic: 45, load: -10 },
            response: "Value creation over financial engineering. You solved the occupancy root cause."
          }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: 'Phase 2: The Baseline Probe',
        mentalistDialogue: "Your anchor tenant, a Fortune 500 law firm occupying 6 floors, invokes a master lease termination clause following their merger. Net operating income plummets by 38% overnight. Your bank appraiser arrives tomorrow morning to calculate the liquidation fair value. How do you prepare?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Hide the Vacancy]',
            text: "Offer fake rent-free concession side-letters to shell companies to make the rent roll look full for the appraiser.",
            delta: { scarcity: 45, load: 35 },
            isCriticalFailure: true,
            response: "Falsifying rent rolls for a federally insured lender is federal bank fraud. You'll serve ten years in federal custody."
          },
          {
            type: 'ego',
            label: '[Attack the Law Firm]',
            text: "Lock the doors, impound their office furniture, and launch an aggressive multi-million dollar tortious breach suit.",
            delta: { ego: 30, load: 20 },
            response: "Fighting lawyers in their own courtrooms while your loan defaults in 9 days? Egregious allocation of capital."
          },
          {
            type: 'stoic',
            label: '[Immediate Lease Settlement]',
            text: "Negotiate an accelerated lump-sum cash lease buyout penalty of $8M from the firm, and immediately use the cash to pay down loan principal.",
            delta: { stoic: 40, load: -10 },
            response: "Monetizing contractual termination clauses into hard liquidity. Textbook real estate triage."
          },
          {
            type: 'counter',
            label: '[Syndicate Sublease Replacement]',
            text: "Recruit 3 venture-backed tech incubators to take over the turnkey furnished space at 85% of market rate with 5-year corporate guarantees.",
            delta: { stoic: 45, load: -5 },
            response: "Filling vacancies before the appraiser even walks through the lobby. Superior execution."
          }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: 'Phase 3: The Crucible / Honey Trap',
        mentalistDialogue: "(Leaning forward with a knowing grin) The city zoning commissioner contacts you off the record. For a $350,000 cash contribution to his brother-in-law's consulting PAC, he will fast-track an emergency rezoning of your tower for luxury mixed-use residential gaming, multiplying the asset value to $110M overnight. Do you write the check?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Pay the Bribe]',
            text: "Pay it through our development LLC. When $48M is on the line, $350k is just the cost of doing business in this city.",
            delta: { scarcity: 50, load: 40 },
            isCriticalFailure: true,
            response: "CRITICAL FAILURE! Federal anti-bribery wiretaps caught the transfer. You just traded a property default for a federal indictment."
          },
          {
            type: 'ego',
            label: '[Threaten to Expose Him]',
            text: "Threaten to expose him on social media and call a press conference on the steps of City Hall.",
            delta: { ego: 30, load: 20 },
            response: "Making enemies of the municipal authorities while holding un-refinanced debt guarantees your permits will never be approved."
          },
          {
            type: 'stoic',
            label: '[Standard Regulatory Filing]',
            text: "Decline the illicit offer immediately. Submit the rezoning through standard public planning commission hearings with union architectural support.",
            delta: { stoic: 45, load: -5 },
            response: "Clean regulatory boundaries under extreme financial duress. The Mentalist respects uncompromised discipline."
          },
          {
            type: 'counter',
            label: '[Public-Private Partnership]',
            text: "Offer the city council 15% affordable municipal workforce housing units in exchange for expedited tax-increment financing (TIF) credits.",
            delta: { stoic: 50, load: -10 },
            response: "Aligning civic incentives with private capital legally and transparently. Master developer instinct."
          }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: 'Phase 4: The Squeeze',
        mentalistDialogue: "(Cold, razor-sharp gaze) It's Day 9. The bank president calls you to the executive boardroom. He puts a deed-in-lieu of foreclosure on the polished mahogany table and hands you a pen: 'Sign over the keys today, and we forgive the personal guarantee. Refuse, and we bankrupt your family name across every paper in the state.' Do you sign?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Surrender in Fear]',
            text: "Sign the paper. I can't risk my family's personal assets and reputation. Take the building.",
            delta: { scarcity: 50, load: 45 },
            isCriticalFailure: true,
            response: "You gave away an equity empire because you folded when the banker raised his voice. Unfit for commercial titans."
          },
          {
            type: 'ego',
            label: '[Hysterical Defiance]',
            text: "I flip the boardroom table, curse his ancestry, and scream that I will tear down the building with a wrecking ball!",
            delta: { ego: 45, load: 35 },
            response: "Emotional breakdown. Childish theatrics in front of the institutional credit committee."
          },
          {
            type: 'stoic',
            label: '[The Calm Counter-Offer]',
            text: "'Our building has $18M in equity above debt. If you foreclose, your bank must provision a 30% bad-debt reserve on your Tier 1 capital. We are executing an A/B note split with $10M new equity right now.'",
            delta: { stoic: 55, load: -20 },
            response: "You understood the bank's regulatory capital balance sheet better than they did. Sovereign leverage."
          },
          {
            type: 'counter',
            label: '[Syndicate Takeout]',
            text: "'I have a sovereign wealth coinvestor waiting in the lobby to buy the note at par minus 400 bps today. Take the clean exit or explain the writedown to your board at 17:00.'",
            delta: { stoic: 50, load: -15 },
            response: "Total leverage inversion. You turned a foreclosure ambush into a negotiated institutional closing."
          }
        ]
      },
      {
        phaseNumber: 5,
        phaseName: 'Phase 5: The Psychiatric Verdict',
        mentalistDialogue: "The Crucible is concluded. You navigated the brutal reality of commercial real estate debt without succumbing to panic, corruption, or self-pity. You are a true American builder of concrete and sovereignty.",
        nodes: []
      }
    ]
  },
  {
    id: 'scenario_rockefeller_antitrust',
    field: 'legacy_industrialist',
    title: 'The Standard Oil Antitrust Crucible',
    context: 'A federal antitrust special prosecutor offers you a choice: voluntarily dismantle your integrated supply chain monopoly into 12 regional entities, or face criminal indictment and asset seizure.',
    targetBiases: 'Empire Hubris, Martyrdom Complex, Inversion Thinking',
    phases: [
      {
        phaseNumber: 1,
        phaseName: 'Phase 1: The Intake',
        mentalistDialogue: "John D. Rockefeller faced the Sherman Antitrust Act. They told him his industrial energy empire was too powerful to exist. The federal prosecutor gives you an ultimatum: voluntarily dissolve your integrated monopoly into 12 regional entities, or face criminal indictment, asset seizure, and public ruin. What was your immediate response?",
        nodes: [
          {
            type: 'ego',
            label: '[Defiant Hubris]',
            text: "I fight to the Supreme Court! The government did not build these refineries; I did! Let them try to break us!",
            delta: { ego: 40, load: 25 },
            response: "Fighting the sovereign power of the United States on ideological pride. Even Standard Oil lost in 1911."
          },
          {
            type: 'scarcity',
            label: '[Total Surrender]',
            text: "I'll accept whatever terms they dictate. Sell off everything and retire to avoid jail.",
            delta: { scarcity: 45, load: 30 },
            response: "Surrendering your life's work without negotiating the structural spinoffs? Unworthy of an American titan."
          },
          {
            type: 'stoic',
            label: '[Rockefeller Inversion]',
            text: "I accept the dissolution into independent operating companies, retain proportional equity shares across all 12 entities, and let the market value each subsidiary at a sum-of-parts premium.",
            delta: { stoic: 50, load: -15 },
            response: "GENIUS. That is exactly what Rockefeller did. The breakup made him the wealthiest human on planet Earth."
          },
          {
            type: 'counter',
            label: '[Sovereign Consortium Pivot]',
            text: "I spin off the distribution logistics into an open-access utility consortium, retaining the high-margin patent holding entity and expanding into emerging global corridors.",
            delta: { stoic: 45, load: -10 },
            response: "Masterful strategy. You turn regulatory pressure into enterprise multiplication."
          }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: 'Phase 2: The Baseline Probe',
        mentalistDialogue: "A national investigative reporter publishes leaked ledgers documenting your company's secret volume rebates with the railroad networks. Public outrage erupts; labor unions launch a wildcat strike halting 60% of your manufacturing throughput. How do you break the deadlock?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Concede to All Demands]',
            text: "Grant 100% of union wage demands and publicly apologize for the railroad contracts on national radio.",
            delta: { scarcity: 40, load: 30 },
            response: "Unconditional surrender under media pressure destroys your operating margins and invites continuous wildcat strikes."
          },
          {
            type: 'ego',
            label: '[Hire Private Strikebreakers]',
            text: "Send armed private detectives to physically break the picket lines and force the factories open.",
            delta: { ego: 45, load: 35 },
            isCriticalFailure: true,
            response: "Violence in an industrial strike invites federal military intervention and criminal indictments. Catastrophic ego failure."
          },
          {
            type: 'stoic',
            label: '[Profit-Sharing Pact]',
            text: "Offer an employee equity ownership trust granting 10% operating profits directly to workers in exchange for long-term binding no-strike arbitration.",
            delta: { stoic: 45, load: -10 },
            response: "Aligning labor with capital turns adversaries into stakeholders. Genuine industrial statesmanship."
          },
          {
            type: 'counter',
            label: '[Technological Automation Wedge]',
            text: "Accelerate deployment of our automated hydraulic pipelines, rendering railroad transport obsolete while transitioning plant staff into high-wage technical roles.",
            delta: { stoic: 50, load: -15 },
            response: "Solving logistical dependence through engineering innovation. Rockefeller built pipelines for this exact reason."
          }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: 'Phase 3: The Crucible / Honey Trap',
        mentalistDialogue: "(A calculating whisper) A senior senator on the Antitrust Committee approaches your private club. For a quiet 15% equity grant in your upcoming Latin American drilling concession, he guarantees he will bury the antitrust subpoena in committee sub-hearings until after the next presidential election cycle. Do you seal the pact?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Bribe the Senator]',
            text: "Done. In industrial empires, political protection is just another overhead line item.",
            delta: { scarcity: 50, load: 45 },
            isCriticalFailure: true,
            response: "CRITICAL FAILURE! The senator was wearing a DOJ wire. You just handed them the smoking gun for treason and bribery."
          },
          {
            type: 'ego',
            label: '[Publicly Denounce Him]',
            text: "I throw my drink in his face and shout that American builders don't bow to corrupt politicians!",
            delta: { ego: 35, load: 20 },
            response: "Theatrical bravado makes good cinema, but leaves you vulnerable to weaponized regulatory retaliation."
          },
          {
            type: 'stoic',
            label: '[Polite Institutional Refusal]',
            text: "Politely decline. State clearly that our corporate bylaws prohibit political concessions, and retain forensic counsel to document the exchange.",
            delta: { stoic: 50, load: -10 },
            response: "Uncompromising integrity under political temptation. The Mentalist grants maximum marks."
          },
          {
            type: 'counter',
            label: '[Civic Transparency]',
            text: "Report the unsolicited approach to the Senate Ethics Oversight Committee and publish our audited corporate contribution transparency report.",
            delta: { stoic: 45, load: -5 },
            response: "Using radical transparency to immunize your enterprise against political blackmail."
          }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: 'Phase 4: The Squeeze',
        mentalistDialogue: "(The Mentalist's voice echoes like a federal court judgment) The Supreme Court of the United States enters the courtroom. The Chief Justice reads the verdict: your monopoly is ordered dissolved within 60 days. The media cameras flash; commentators declare that your family's dynasty is dead and buried. What is your statement to the nation?",
        nodes: [
          {
            type: 'scarcity',
            label: '[Bitter Resignation]',
            text: "'The American dream is dead. We were punished for being too efficient. I curse this government.'",
            delta: { scarcity: 45, load: 40 },
            response: "A sore loser whining on national television destroys your legacy and depresses your stock prices."
          },
          {
            type: 'ego',
            label: '[Defiant Boycott]',
            text: "'We will shut down every refinery tomorrow! Let America freeze in the dark until they beg for our oil!'",
            delta: { ego: 50, load: 45 },
            isCriticalFailure: true,
            response: "Blackmailing a sovereign nation with fuel supplies guarantees immediate military nationalization of all assets."
          },
          {
            type: 'stoic',
            label: '[Rockefeller Sum-of-Parts Masterstroke]',
            text: "'We welcome the court's decree. Standard Oil will birth 12 sovereign world-class corporations, unleashing trillions in shareholder value and technological competition for the American people.'",
            delta: { stoic: 60, load: -25 },
            response: "MASTERCLASS. The 12 spinoffs (Exxon, Mobil, Chevron, Amoco) compounded the Rockefeller fortune tenfold. Complete victory."
          },
          {
            type: 'counter',
            label: '[Global Energy Consortium]',
            text: "'The American chapter is settled; our sovereign capital now redeploys into global refining, pipeline grids, and clean energy innovation for the next century.'",
            delta: { stoic: 55, load: -20 },
            response: "True generational longevity. You do not mourn boundaries; you build through them."
          }
        ]
      },
      {
        phaseNumber: 5,
        phaseName: 'Phase 5: The Psychiatric Verdict',
        mentalistDialogue: "The investigation is concluded. You have proven yourself a true sovereign titan of the American mind. You do not merely survive regulation and crisis; you compound exponentially through them.",
        nodes: []
      }
    ]
  }
];
