/**
 * THE MENTALIST - MONETARY GATEWAY CONFIGURATION
 * 
 * Instructions:
 * Enter your Flutterwave API credentials below or configure them
 * directly via the in-game "Executive Config Terminal" in Settings.
 * 
 * SECURITY NOTICE:
 * - In client-side execution, only the `FLUTTERWAVE_PUBLIC_KEY` is exposed to the browser.
 * - The `FLUTTERWAVE_SECRET_KEY` and `FLUTTERWAVE_ENCRYPTION_KEY` should only be used
 *   on secure server endpoints for webhook validation and transaction verification.
 */

export const FLUTTERWAVE_CONFIG = {
  // Replace with your Flutterwave Public Key (e.g., 'FLWPUBK_TEST-xxxxxxxxxxxx-X' or 'FLWPUBK-xxxxxxxxxxxx-X')
  PUBLIC_KEY: "FLWPUBK-46c4b24db685a7900404ebee753800d9-X",

  // Optional server-side credentials for verification/webhooks
  SECRET_KEY: "FLWSECK-aa73d735a078cf794c05ad2e35fa2399-19efc740661vt-X",
  ENCRYPTION_KEY: "aa73d735a078902a178f83dc",

  // Environment mode: 'sandbox' (testing) or 'live' (production)
  ENVIRONMENT: "live",

  // Default currency for transactions (e.g., 'USD', 'NGN', 'GBP', 'EUR', 'KES', 'GHS')
  CURRENCY: "USD",

  // Merchant Branding
  MERCHANT_NAME: "The Mentalist: Cognitive Simulator",
  MERCHANT_TITLE: "Allocate Mind Capital",
  MERCHANT_DESCRIPTION: "Fund Cognitive Infrastructure & Sovereign Coins",
  MERCHANT_LOGO: "assets/icons/logo-shield.png",

  // Digital Money Economy (Coins & Balance System)
  COIN_NAME: "Cognitive Credits (CC)",
  COIN_SYMBOL: "₡",

  // Digital Capital Packages (Fund Balance -> Receive Sovereign Coins)
  PACKAGES: [
    {
      id: "seed_capital",
      tier: "Seed Allocation",
      amountUSD: 4.99,
      coins: 500,
      bonus: "0% bonus",
      description: "Basic psychological calibration. Unlocks standard interrogations & basic Mind Graph.",
      roiTag: "+15% Focus"
    },
    {
      id: "growth_capital",
      tier: "Growth Allocation (Popular)",
      amountUSD: 9.99,
      coins: 1200,
      bonus: "+20% Bonus Coins",
      description: "Accelerated training. Unlocks Advanced Scenarios, CBT Cognitive Gym & Detailed Profiling.",
      roiTag: "+35% Stress Inoculation",
      featured: true
    },
    {
      id: "institutional_capital",
      tier: "Institutional Allocation",
      amountUSD: 24.99,
      coins: 3500,
      bonus: "+40% Bonus Coins",
      description: "Full War Room Archive, Charlie Munger Mental Models Pack & Unlimited Jail Rehabilitation.",
      roiTag: "+70% Decision Precision"
    },
    {
      id: "sovereign_capital",
      tier: "Sovereign Mind Allocation",
      amountUSD: 49.99,
      coins: 8000,
      bonus: "+60% Bonus Coins",
      description: "Elite cognitive status. Full Empire building licenses, Stoic Shields, and Deep Post-Mortems.",
      roiTag: "+120% Resilience Yield"
    }
  ],

  // "Skin in the Game" Discipline Bond tiers (Locked for 30-day challenges)
  DISCIPLINE_BONDS: [
    {
      id: "bond_novice",
      name: "Iron Will Novice Bond",
      stakeUSD: 10.00,
      coinsStake: 1000,
      durationDays: 30,
      requiredDailyDossiers: 25,
      requiredPassedInterrogations: 10,
      rewardYieldMultiplier: 1.25, // Returns 125% value on completion + Iron Mind Badge
      lossAversionTag: "100% Forfeited to Financial Literacy Charity upon failure"
    },
    {
      id: "bond_master",
      name: "Sovereign Resilience Bond",
      stakeUSD: 25.00,
      coinsStake: 2500,
      durationDays: 30,
      requiredDailyDossiers: 30,
      requiredPassedInterrogations: 20,
      rewardYieldMultiplier: 1.50, // Returns 150% value on completion + Golden Mind Aura
      lossAversionTag: "Zero Tolerance. High Stakes Accountability."
    }
  ]
};
