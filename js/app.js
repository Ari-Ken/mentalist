/**
 * THE MENTALIST — MASTER APPLICATION COORDINATOR
 * Ties all 6 layers, PWA lifecycle, Flutterwave gateway, and psychological state machine together.
 */

import { audio } from './audio.js';
import { storage } from './storage.js';
import { pwa } from './pwa.js';
import { economy } from './economy.js';
import { payment } from './payment.js';
import { bonds } from './bonds.js';
import { interrogationEngine } from './interrogationEngine.js';
import { yard, REHAB_MODULES } from './yard.js';
import { cbtGym } from './cbtGym.js';
import { probabilityGym } from './probabilityGym.js';
import { radarChart } from './radarChart.js';
import { empire, EMPIRE_BUILDINGS, SKILL_TREE } from './empire.js';
import { dossiers } from './dossiers.js';
import { MASTER_SCENARIOS, BUILDER_ARCHETYPES } from './scenarios.js';
import { FLUTTERWAVE_CONFIG } from '../config/flutterwave.config.js';

class MentalistApp {
  constructor() {
    this.currentTab = 'crucible';
  }

  init() {
    console.log('[The Mentalist] Initializing Surgical Mind Simulator...');

    // 1. Initialize PWA
    pwa.init();

    // 2. Setup Event Listeners
    this.setupNavigation();
    this.setupHeaderActions();
    this.setupInterrogationListeners();
    this.setupWalletView();
    this.setupGymView();
    this.setupYardView();
    this.setupRehabModal();
    this.setupEmpireView();
    this.setupRadarView();
    this.setupCaseModal();
    this.setupSettingsModal();

    // 3. Update Global Balances & Telemetry
    this.updateGlobalHeader();

    // 4. Start initial Interrogation session
    interrogationEngine.startSession('scenario_sunk_cost');

    // 5. Initial render of other tabs
    this.renderWalletPackages();
    this.renderBonds();
    this.renderLedger();
    this.renderEmpireBuildings();
    this.renderSkillTree();
    this.renderDailyDossier();
    this.renderYardModules();
    this.renderRadarMetrics();

    // Listen to storage state updates
    window.addEventListener('mentalist:state_updated', () => {
      this.updateGlobalHeader();
    });

    console.log('[The Mentalist] Ready.');
  }

  setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.dataset.tab;
        this.switchTab(target);
      });
    });

    // Hash change routing support
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (['crucible', 'gym', 'yard', 'radar', 'empire', 'wallet'].includes(hash)) {
        this.switchTab(hash);
      }
    });

    // Check initial hash
    const initialHash = window.location.hash.replace('#', '');
    if (['crucible', 'gym', 'yard', 'radar', 'empire', 'wallet'].includes(initialHash)) {
      this.switchTab(initialHash);
    }

    // PWA Install Trigger
    const btnInstall = document.getElementById('btnTriggerPwaInstall');
    if (btnInstall) {
      btnInstall.addEventListener('click', () => pwa.triggerInstall());
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'instant' });

    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabId);
    });

    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(`view-${tabId}`);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    // Specific on-view triggers
    if (tabId === 'radar') {
      setTimeout(() => radarChart.render(), 60);
    } else if (tabId === 'yard') {
      this.renderYardDetails();
    } else if (tabId === 'wallet') {
      this.renderLedger();
    }
  }

  setupHeaderActions() {
    // Audio toggle
    const btnAudio = document.getElementById('btnAudioToggle');
    const audioText = document.getElementById('audioStatusText');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        audio.ensureContext();
        const muted = audio.toggleMute();
        audioText.textContent = muted ? '🔇 SFX MUTED' : '🔊 SFX ON';
      });
    }

    // Wallet pill click jumps to wallet tab
    const walletPill = document.getElementById('headerWalletPill');
    if (walletPill) {
      walletPill.addEventListener('click', () => this.switchTab('wallet'));
    }

    // Quick fund button
    const btnQuickFund = document.getElementById('btnQuickFund');
    if (btnQuickFund) {
      btnQuickFund.addEventListener('click', () => {
        // Scroll to packages
        const el = document.getElementById('packagesGrid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Settings Modal Open
    const btnSettings = document.getElementById('btnOpenSettings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => {
        const modal = document.getElementById('settingsModal');
        if (modal) {
          // Pre-populate
          document.getElementById('inputFlwPublicKey').value = FLUTTERWAVE_CONFIG.PUBLIC_KEY;
          document.getElementById('inputFlwSecretKey').value = FLUTTERWAVE_CONFIG.SECRET_KEY || '';
          document.getElementById('inputFlwCurrency').value = FLUTTERWAVE_CONFIG.CURRENCY;
          document.getElementById('selectFlwEnv').value = FLUTTERWAVE_CONFIG.ENVIRONMENT;
          document.getElementById('checkDevSimulation').checked = payment.isSimulationMode();
          modal.classList.add('open');
        }
      });
    }

    // Close Receipt Modal
    const btnCloseReceipt = document.getElementById('btnCloseReceiptModal');
    const btnAckReceipt = document.getElementById('btnReceiptAcknowledge');
    const receiptModal = document.getElementById('receiptModal');
    [btnCloseReceipt, btnAckReceipt].forEach(btn => {
      if (btn) btn.addEventListener('click', () => receiptModal.classList.remove('open'));
    });
  }

  updateGlobalHeader() {
    const s = storage.getState();
    const bal = s.wallet.cognitiveCredits;

    const elHeaderAmount = document.getElementById('headerWalletAmount');
    if (elHeaderAmount) elHeaderAmount.textContent = `${bal.toLocaleString()} CC`;

    const elHeroBalance = document.getElementById('heroBalanceNumber');
    if (elHeroBalance) elHeroBalance.textContent = bal.toLocaleString();

    const elEmpireWallet = document.getElementById('empireWalletBalance');
    if (elEmpireWallet) elEmpireWallet.textContent = `${bal.toLocaleString()} CC`;

    // Yard indicator
    const yardBadge = document.getElementById('yardBadge');
    if (yardBadge) {
      yardBadge.style.display = s.yardState.isJailed ? 'inline-block' : 'none';
    }
  }

  setupInterrogationListeners() {
    // Session Started
    window.addEventListener('mentalist:session_started', (e) => {
      const { scenario, archetype } = e.detail;
      document.getElementById('scenarioTitleText').textContent = scenario.title;
      document.getElementById('scenarioFieldBadge').textContent = `${archetype.name.toUpperCase()} CRUCIBLE`;
      document.getElementById('mentalistArchetypeLabel').textContent = archetype.name.toUpperCase();
      document.getElementById('blackSwanBanner').classList.remove('active');
    });


    // Render Dialogue Wheel Nodes
    window.addEventListener('mentalist:render_dialogue_wheel', (e) => {
      const container = document.getElementById('wheelNodesContainer');
      if (!container) return;
      container.innerHTML = '';

      e.detail.nodes.forEach((node, index) => {
        const card = document.createElement('div');
        card.className = `wheel-node-card ${node.isInversionFlagged ? 'inversion-warning' : ''}`;

        let typeClass = 'node-type-stoic';
        if (node.type === 'ego') typeClass = 'node-type-ego';
        if (node.type === 'scarcity') typeClass = 'node-type-scarcity';
        if (node.type === 'counter') typeClass = 'node-type-counter';

        card.innerHTML = `
          <div class="wheel-node-type ${typeClass}">
            <span>${node.label}</span>
            ${node.isInversionFlagged ? '<span class="badge badge-danger font-mono" style="font-size: 8px; margin-left: auto;">🔍 INVERSION: TRAP</span>' : ''}
          </div>
          <div class="wheel-node-text">${node.text}</div>
        `;

        card.addEventListener('click', () => {
          interrogationEngine.selectNode(index);
        });

        container.appendChild(card);
      });

      // Update Phase Stepper
      const phaseNum = e.detail.phaseNumber;
      for (let i = 1; i <= 5; i++) {
        const step = document.getElementById(`step${i}`);
        if (step) {
          step.className = `phase-step ${i === phaseNum ? 'active' : (i < phaseNum ? 'passed' : '')}`;
        }
      }
    });

    // Real-Time Metrics & Biometrics Updated
    window.addEventListener('mentalist:metrics_updated', (e) => {
      const m = e.detail;
      
      // Update gauges
      document.getElementById('labelLoadPercent').textContent = `${m.cognitiveLoad}%`;
      document.getElementById('fillCognitiveLoad').style.width = `${m.cognitiveLoad}%`;

      document.getElementById('labelEgoPercent').textContent = `${m.egoDefensiveness}%`;
      document.getElementById('fillEgo').style.width = `${m.egoDefensiveness}%`;

      document.getElementById('labelScarcityPercent').textContent = `${m.scarcityFear}%`;
      document.getElementById('fillScarcity').style.width = `${m.scarcityFear}%`;

      document.getElementById('labelStoicPercent').textContent = `${m.stoicWealth}%`;
      document.getElementById('fillStoic').style.width = `${m.stoicWealth}%`;

      // Telemetry Header
      document.getElementById('telemetryCognitiveLoad').textContent = `${m.cognitiveLoad}%`;
      const bpm = Math.round(62 + (m.cognitiveLoad / 100) * 70);
      document.getElementById('telemetryBpm').textContent = `${bpm} BPM`;

      // Mode Badge & HUD class
      const hud = document.getElementById('mentalistHud');
      const modeLabel = document.getElementById('mentalistModeLabel');
      hud.className = `mentalist-hud mode-${m.mode.replace('_', '-')}`;
      modeLabel.textContent = `MODE: ${m.mode.toUpperCase().replace('_', ' ')}`;
    });

    // Hesitation Tick (Countdown progress bar)
    window.addEventListener('mentalist:hesitation_tick', (e) => {
      const sec = e.detail.seconds;
      const hasPause = e.detail.hasStoicPause;
      const maxSec = hasPause ? 18 : 15;
      const timerLabel = document.getElementById('hesitationTimerLabel');
      if (timerLabel) {
        timerLabel.textContent = `RESPONSE CLOCK: ${sec.toFixed(1)}s ${hasPause ? '(+3s STOIC PAUSE)' : ''}`;
      }

      const bar = document.getElementById('hesitationBarFill');
      if (bar) {
        const pct = Math.max(0, 100 - (sec / maxSec) * 100);
        bar.style.width = `${pct}%`;
        if (sec >= (hasPause ? 15 : 12)) {
          bar.className = 'hesitation-bar-fill critical';
        } else if (sec >= (hasPause ? 10 : 7)) {
          bar.className = 'hesitation-bar-fill warning';
        } else {
          bar.className = 'hesitation-bar-fill';
        }
      }
    });

    // Jailed / Remanded to The Yard
    window.addEventListener('mentalist:jailed', (e) => {
      this.switchTab('yard');
    });

    // Session Cleared
    window.addEventListener('mentalist:session_cleared', (e) => {
      alert("★ CONGRATULATIONS! You survived the Crucible. The Mentalist has granted your official Clearance Certificate. Check the Mind Graph tab to inspect your psychological fingerprint.");
      this.switchTab('radar');
    });

    // Restart Scenario Button
    const btnRestart = document.getElementById('btnRestartScenario');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        const activeScenarioId = interrogationEngine.activeScenario ? interrogationEngine.activeScenario.id : 'scenario_sunk_cost';
        interrogationEngine.startSession(activeScenarioId);
      });
    }

    // Switch Scenario Button (Opens Classified Dossier Selection Modal)
    const btnSwitch = document.getElementById('btnSwitchScenario');
    if (btnSwitch) {
      btnSwitch.addEventListener('click', () => {
        this.openCaseSelectionModal();
      });
    }
  }

  setupWalletView() {
    // Mode badge
    const modeBadge = document.getElementById('paymentModeBadge');
    if (modeBadge) {
      modeBadge.textContent = payment.isSimulationMode() ? 'SIMULATION TEST' : 'FLUTTERWAVE LIVE';
    }
  }

  renderWalletPackages() {
    const container = document.getElementById('packagesGrid');
    if (!container) return;
    container.innerHTML = '';

    FLUTTERWAVE_CONFIG.PACKAGES.forEach(pkg => {
      const card = document.createElement('div');
      card.className = `package-card ${pkg.featured ? 'featured' : ''}`;
      card.innerHTML = `
        ${pkg.featured ? '<div class="package-featured-badge">MOST POPULAR</div>' : ''}
        <div class="package-header">
          <div class="package-tier-title">${pkg.tier}</div>
          <div class="package-coins-amount">
            <span class="text-gold">₡</span> ${pkg.coins.toLocaleString()}
            <span class="package-bonus-chip">${pkg.bonus}</span>
          </div>
        </div>
        <div class="package-desc">${pkg.description}</div>
        <div class="package-roi font-mono">TARGET ROI: ${pkg.roiTag}</div>
        <button class="btn-terminal btn-gold btn-allocate-pkg" data-pkg-id="${pkg.id}" style="width: 100%; margin-top: 10px;">
          ALLOCATE $${pkg.amountUSD.toFixed(2)} USD
        </button>
      `;

      card.querySelector('.btn-allocate-pkg').addEventListener('click', () => {
        payment.allocatePackage(pkg.id);
      });

      container.appendChild(card);
    });
  }

  renderBonds() {
    const container = document.getElementById('bondsGrid');
    if (!container) return;
    container.innerHTML = '';

    const activeBonds = bonds.getActiveBonds();

    FLUTTERWAVE_CONFIG.DISCIPLINE_BONDS.forEach(bondDef => {
      const activeInstance = activeBonds.find(b => b.bondId === bondDef.id && b.status === 'ACTIVE');
      const card = document.createElement('div');
      card.className = `bond-card ${activeInstance ? 'active-bond' : ''}`;

      if (activeInstance) {
        const dossierPct = Math.min(100, Math.round((activeInstance.completedDossiers / activeInstance.requiredDossiers) * 100));
        const trialPct = Math.min(100, Math.round((activeInstance.passedInterrogations / activeInstance.requiredInterrogations) * 100));
        const payout = Math.round(activeInstance.stakeCoins * activeInstance.yieldMultiplier);

        card.innerHTML = `
          <div class="bond-title">
            <span>${bondDef.name}</span>
            <span class="badge badge-success font-mono">ESCROW ACTIVE</span>
          </div>
          <div class="bond-details-list">
            <div style="color: #fff; font-weight: 700;">★ Principal Escrow Locked: ${activeInstance.stakeCoins} ₡ ($${activeInstance.stakeUSD.toFixed(2)})</div>
            <div>• Target Maturation Payout: <strong class="text-gold">${payout} ₡ (+${payout - activeInstance.stakeCoins} ₡ Yield)</strong></div>
            <div style="margin-top: 6px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                <span>Daily Dossiers: ${activeInstance.completedDossiers} / ${activeInstance.requiredDossiers}</span>
                <span>${dossierPct}%</span>
              </div>
              <div class="gauge-track"><div class="gauge-fill gauge-fill-stoic" style="width: ${dossierPct}%;"></div></div>
            </div>
            <div style="margin-top: 6px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                <span>Interrogations Passed: ${activeInstance.passedInterrogations} / ${activeInstance.requiredInterrogations}</span>
                <span>${trialPct}%</span>
              </div>
              <div class="gauge-track"><div class="gauge-fill gauge-fill-load" style="width: ${trialPct}%;"></div></div>
            </div>
          </div>
          <div class="bond-forfeit-warning" style="color: var(--cyan-primary); border-color: rgba(0, 229, 255, 0.2);">
            ★ High-Stakes Discipline Contract Active. Maintain your momentum.
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="bond-title">
            <span>${bondDef.name}</span>
            <span class="badge badge-gold font-mono">${bondDef.coinsStake} ₡ STAKE</span>
          </div>
          <div class="bond-details-list">
            <div>• Duration: <strong>${bondDef.durationDays} Days</strong> commitment contract</div>
            <div>• Target Requirement: <strong>${bondDef.requiredDailyDossiers} Daily Dossiers</strong> &amp; <strong>${bondDef.requiredPassedInterrogations} Passed Trials</strong></div>
            <div>• Maturation Yield: <strong>${Math.round(bondDef.rewardYieldMultiplier * 100)}% Return of Capital</strong> + Exclusive Badge</div>
          </div>
          <div class="bond-forfeit-warning">
            ⚠ ${bondDef.lossAversionTag}
          </div>
          <button class="btn-terminal btn-danger btn-stake-bond" data-bond-id="${bondDef.id}" style="width: 100%;">
            LOCK ${bondDef.coinsStake} ₡ IN ESCROW
          </button>
        `;

        card.querySelector('.btn-stake-bond').addEventListener('click', () => {
          const res = bonds.stakeBond(bondDef.id);
          if (res.success) {
            alert(`★ CONTRACT STAKED: ${bondDef.name} is now locked in escrow. Complete your daily dossiers and trials to unlock 125% - 150% return!`);
            this.renderBonds();
            this.renderLedger();
            this.updateGlobalHeader();
          } else {
            alert(res.message);
          }
        });
      }

      container.appendChild(card);
    });
  }

  renderLedger() {
    const tbody = document.getElementById('ledgerTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const txs = economy.getTransactions();
    txs.forEach(tx => {
      const tr = document.createElement('tr');
      const isPositive = tx.credits > 0;
      tr.innerHTML = `
        <td class="text-cyan font-mono">${tx.id}</td>
        <td>${new Date(tx.date).toLocaleDateString()} ${new Date(tx.date).toLocaleTimeString()}</td>
        <td>${tx.description}</td>
        <td>${tx.amountUSD > 0 ? `$${tx.amountUSD.toFixed(2)}` : '—'}</td>
        <td class="${isPositive ? 'text-success' : 'text-danger'} font-mono">${isPositive ? '+' : ''}${tx.credits} ₡</td>
        <td><span class="badge ${tx.status === 'CONFIRMED' ? 'badge-success' : 'badge-cyan'}">${tx.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  setupGymView() {
    const btnCbt = document.getElementById('btnTabCBT');
    const btnProb = document.getElementById('btnTabProbability');
    const cbtBox = document.getElementById('cbtDrillBox');
    const probBox = document.getElementById('probabilityBox');

    btnCbt.addEventListener('click', () => {
      btnCbt.classList.add('active');
      btnProb.classList.remove('active');
      cbtBox.style.display = 'flex';
      probBox.style.display = 'none';
    });

    btnProb.addEventListener('click', () => {
      btnProb.classList.add('active');
      btnCbt.classList.remove('active');
      cbtBox.style.display = 'none';
      probBox.style.display = 'flex';
      this.renderProbabilityCase();
    });

    // Start CBT Drill
    const btnStart = document.getElementById('btnStartCbtDrill');
    btnStart.addEventListener('click', () => {
      cbtGym.startDrill();
      btnStart.style.display = 'none';
    });

    window.addEventListener('mentalist:cbt_tick', (e) => {
      document.getElementById('cbtTimerDisplay').textContent = `${e.detail.timeLeft}s`;
    });

    window.addEventListener('mentalist:cbt_render_question', (e) => {
      const { question, score } = e.detail;
      document.getElementById('cbtScoreDisplay').textContent = score;
      document.getElementById('cbtDistortionType').textContent = `DISTORTION: ${question.distortionType.toUpperCase()}`;
      document.getElementById('cbtDistortionPrompt').textContent = `"${question.mentalistTrap}"`;

      const grid = document.getElementById('cbtOptionsGrid');
      grid.innerHTML = '';
      question.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'cbt-option-btn font-mono';
        btn.textContent = `${idx + 1}. ${opt.text}`;
        btn.addEventListener('click', () => {
          if (opt.isCorrect) {
            btn.style.background = 'rgba(0, 229, 255, 0.25)';
            btn.style.borderColor = 'var(--cyan-primary)';
          } else {
            btn.style.background = 'rgba(255, 51, 102, 0.25)';
            btn.style.borderColor = 'var(--crimson-danger)';
          }
          setTimeout(() => cbtGym.answer(idx), 280);
        });
        grid.appendChild(btn);
      });
    });

    window.addEventListener('mentalist:cbt_completed', (e) => {
      alert(`★ DRILL COMPLETE! Final Score: ${e.detail.score} pts. You earned +${e.detail.earnedCredits} ₡ Cognitive Credits!`);
      document.getElementById('btnStartCbtDrill').style.display = 'inline-block';
    });

    // Probability choices
    document.getElementById('btnProbGuaranteed').addEventListener('click', () => {
      const res = probabilityGym.evaluateDecision('guaranteed');
      document.getElementById('probFeedbackBox').textContent = res.isCorrect ? "CORRECT: " + res.lesson : "SUBOPTIMAL: " + res.lesson;
      setTimeout(() => this.renderProbabilityCase(), 2000);
    });

    document.getElementById('btnProbRisk').addEventListener('click', () => {
      const res = probabilityGym.evaluateDecision('risk');
      document.getElementById('probFeedbackBox').textContent = res.isCorrect ? "CORRECT: " + res.lesson : "SUBOPTIMAL: " + res.lesson;
      setTimeout(() => this.renderProbabilityCase(), 2000);
    });
  }

  renderProbabilityCase() {
    const c = probabilityGym.getCurrentCase();
    document.getElementById('probCaseTitle').textContent = c.title;
    document.getElementById('probCaseScenario').textContent = c.scenario;
    document.getElementById('probFeedbackBox').textContent = '';
  }

  setupYardView() {
    const btnRehab = document.getElementById('btnCompleteRehab');
    if (btnRehab) {
      btnRehab.addEventListener('click', () => {
        yard.completeRehabilitation();
        alert("★ REHABILITATION COMPLETE! You have examined the cognitive bias that caused your failure. Clearance restored to UNCERTIFIED. You may re-enter The Crucible.");
        this.switchTab('crucible');
      });
    }
  }

  renderYardDetails() {
    const details = yard.getDetentionDetails();
    const reasonText = document.getElementById('yardReasonText');
    if (reasonText && details.reason) {
      reasonText.textContent = `"${details.reason}"`;
    }
  }

  renderYardModules() {
    const container = document.getElementById('rehabModulesGrid');
    if (!container) return;
    container.innerHTML = '';

    REHAB_MODULES.forEach(mod => {
      const card = document.createElement('div');
      card.className = 'rehab-card';
      card.innerHTML = `
        <div>
          <div class="badge badge-cyan">${mod.framework}</div>
          <div class="rehab-title" style="margin-top: 6px;">${mod.title}</div>
          <div class="rehab-desc" style="margin-top: 8px;">${mod.description}</div>
        </div>
        <button class="btn-terminal btn-gold btn-start-rehab" style="width: 100%;">
          STUDY REHAB MODULE
        </button>
      `;

      card.querySelector('.btn-start-rehab').addEventListener('click', () => {
        this.openRehabModal(mod);
      });

      container.appendChild(card);
    });
  }

  setupEmpireView() {
    window.addEventListener('mentalist:empire_updated', () => {
      this.renderEmpireBuildings();
      this.renderSkillTree();
      this.updateGlobalHeader();
    });
  }

  renderEmpireBuildings() {
    const container = document.getElementById('empireBuildingsGrid');
    if (!container) return;
    container.innerHTML = '';

    const state = empire.getEmpireState();

    EMPIRE_BUILDINGS.forEach(b => {
      const isUnlocked = state.unlockedBuildings.includes(b.id);
      const card = document.createElement('div');
      card.className = `empire-building-card ${isUnlocked ? 'unlocked' : ''}`;
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="building-icon-wrap">${b.icon}</div>
          <div>
            <div class="badge ${isUnlocked ? 'badge-success' : 'badge-cyan'}">${isUnlocked ? 'OPERATIONAL' : b.category}</div>
            <div class="building-name" style="margin-top: 4px;">${b.name}</div>
          </div>
        </div>
        <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">${b.benefit}</div>
        ${isUnlocked ? 
          '<div class="badge badge-success" style="align-self: flex-start;">FACILITY ACTIVE</div>' : 
          `<button class="btn-terminal btn-gold btn-buy-building" data-id="${b.id}" style="width: 100%;">CONSTRUCT FOR ${b.costCredits} ₡</button>`
        }
      `;

      const btnBuy = card.querySelector('.btn-buy-building');
      if (btnBuy) {
        btnBuy.addEventListener('click', () => {
          const res = empire.unlockBuilding(b.id);
          if (!res.success) alert(res.message);
        });
      }

      container.appendChild(card);
    });
  }

  renderSkillTree() {
    const container = document.getElementById('skillTreeGrid');
    if (!container) return;
    container.innerHTML = '';

    const state = empire.getEmpireState();

    SKILL_TREE.forEach(s => {
      const isUnlocked = state.unlockedSkills.includes(s.id);
      const isEquipped = state.equippedSkills.includes(s.id);

      const card = document.createElement('div');
      card.className = `skill-card ${isEquipped ? 'equipped' : ''}`;
      card.innerHTML = `
        <div class="skill-header">
          <div class="skill-name">${s.name}</div>
          <span class="badge ${isEquipped ? 'badge-gold' : (isUnlocked ? 'badge-cyan' : 'badge-danger')}">
            ${isEquipped ? 'EQUIPPED' : (isUnlocked ? 'UNLOCKED' : 'LOCKED')}
          </span>
        </div>
        <div class="skill-desc">${s.description}</div>
        ${!isUnlocked ? 
          `<button class="btn-terminal btn-gold btn-unlock-skill" data-id="${s.id}">ACQUIRE SHIELD (${s.costCredits} ₡)</button>` :
          `<button class="btn-terminal ${isEquipped ? 'btn-danger' : 'btn-gold'} btn-toggle-skill" data-id="${s.id}">${isEquipped ? 'UNEQUIP SHIELD' : 'EQUIP SHIELD'}</button>`
        }
      `;

      const btnUnlock = card.querySelector('.btn-unlock-skill');
      if (btnUnlock) {
        btnUnlock.addEventListener('click', () => {
          const res = empire.unlockSkill(s.id);
          if (!res.success) alert(res.message);
        });
      }

      const btnToggle = card.querySelector('.btn-toggle-skill');
      if (btnToggle) {
        btnToggle.addEventListener('click', () => {
          empire.toggleEquipSkill(s.id);
        });
      }

      container.appendChild(card);
    });
  }

  renderDailyDossier() {
    const d = dossiers.getTodayDossier();
    document.getElementById('dossierDayTitle').textContent = d.dayTitle;
    document.getElementById('dossierScenarioText').textContent = d.scenario;
    document.getElementById('dossierChallengeText').textContent = `★ ${d.realWorldChallenge}`;

    const container = document.getElementById('dossierOptionsContainer');
    container.innerHTML = '';

    d.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn-terminal font-mono';
      btn.style.textAlign = 'left';
      btn.textContent = `${idx + 1}. ${opt.text}`;
      btn.addEventListener('click', () => {
        const res = dossiers.submitDossierAnswer(idx);
        alert(res.message);
        const streakBadge = document.getElementById('dossierStreakBadge');
        if (streakBadge) {
          streakBadge.textContent = `🔥 ${storage.getState().dossiers.currentStreak} DAYS`;
        }
      });
      container.appendChild(btn);
    });
  }

  setupRadarView() {
    const btnExport = document.getElementById('btnExportDossierCard');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const dataUrl = radarChart.exportClearanceCard();
        if (dataUrl) {
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `TheMentalist_Psychological_Clearance_${Date.now()}.png`;
          a.click();
        }
      });
    }
  }

  renderRadarMetrics() {
    const m = storage.getState().mindGraph;
    const container = document.getElementById('radarMetricsGrid');
    if (!container) return;
    container.innerHTML = '';

    const list = [
      { key: 'locusOfControl', label: 'Locus of Control', val: m.locusOfControl, desc: 'Measures belief in personal agency vs blaming external villains.' },
      { key: 'resilienceGrit', label: 'Resilience & Grit', val: m.resilienceGrit, desc: 'Velocity of cognitive recovery after being ambushed by traps.' },
      { key: 'financialEQ', label: 'Financial EQ (FEQ)', val: m.financialEQ, desc: 'Immunity to behavioral economic traps (sunk cost, loss aversion).' },
      { key: 'riskTolerance', label: 'Risk & Volatility', val: m.riskTolerance, desc: 'Calculated mathematical risk-taking under emotional duress.' },
      { key: 'stoicRegulation', label: 'Stoic Regulation', val: m.stoicRegulation, desc: 'Emotional composure and detachment when attacked or flattered.' },
      { key: 'strategicIntegrity', label: 'Strategic Integrity', val: m.strategicIntegrity, desc: 'Refusal to accept illegal or predatory honey-traps.' }
    ];

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'metric-dossier-card';
      card.innerHTML = `
        <div class="metric-card-label">${item.label}</div>
        <div class="metric-card-score">
          <span>${item.val}%</span>
          <span class="badge ${item.val >= 70 ? 'badge-success' : 'badge-cyan'}">${item.val >= 70 ? 'SUPERIOR' : 'STABLE'}</span>
        </div>
        <div class="metric-card-desc">${item.desc}</div>
      `;
      container.appendChild(card);
    });

    const wiq = radarChart.getWIQScore();
    const wiqEl = document.getElementById('wiqScoreDisplay');
    if (wiqEl) wiqEl.textContent = `${wiq} / 100`;
  }

  setupSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const btnCancel = document.getElementById('btnCancelSettings');
    const btnClose = document.getElementById('btnCloseSettingsModal');
    const btnSave = document.getElementById('btnSaveSettings');

    [btnCancel, btnClose].forEach(btn => {
      if (btn) btn.addEventListener('click', () => modal.classList.remove('open'));
    });

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const pubKey = document.getElementById('inputFlwPublicKey').value.trim();
        const secKey = document.getElementById('inputFlwSecretKey').value.trim();
        const cur = document.getElementById('inputFlwCurrency').value.trim();
        const env = document.getElementById('selectFlwEnv').value;
        const sim = document.getElementById('checkDevSimulation').checked;

        if (pubKey) FLUTTERWAVE_CONFIG.PUBLIC_KEY = pubKey;
        if (secKey) FLUTTERWAVE_CONFIG.SECRET_KEY = secKey;
        if (cur) FLUTTERWAVE_CONFIG.CURRENCY = cur;
        FLUTTERWAVE_CONFIG.ENVIRONMENT = env;
        payment.setSimulationMode(sim);

        const modeBadge = document.getElementById('paymentModeBadge');
        if (modeBadge) {
          modeBadge.textContent = sim ? 'SIMULATION TEST' : (env === 'live' ? 'FLUTTERWAVE LIVE' : 'FLUTTERWAVE SANDBOX');
        }

        modal.classList.remove('open');
        alert("★ CONFIGURATION UPDATED: Flutterwave credentials and environment mode saved successfully.");
      });
    }
  }

  setupCaseModal() {
    this.selectedArchetypeId = storage.getState().profile.archetype || 'tech_disruptor';
    this.selectedScenarioId = 'scenario_sunk_cost';

    const modal = document.getElementById('caseSelectionModal');
    const btnClose = document.getElementById('btnCloseCaseModal');
    const btnCancel = document.getElementById('btnCancelCaseModal');
    const btnLaunch = document.getElementById('btnLaunchSelectedCase');

    [btnClose, btnCancel].forEach(b => {
      if (b) b.addEventListener('click', () => modal.classList.remove('open'));
    });

    if (btnLaunch) {
      btnLaunch.addEventListener('click', () => {
        interrogationEngine.startSession(this.selectedScenarioId, this.selectedArchetypeId);
        modal.classList.remove('open');
        this.switchTab('crucible');
      });
    }
  }

  openCaseSelectionModal() {
    const modal = document.getElementById('caseSelectionModal');
    if (!modal) return;

    this.selectedArchetypeId = storage.getState().profile.archetype || 'tech_disruptor';
    this.selectedScenarioId = interrogationEngine.activeScenario ? interrogationEngine.activeScenario.id : 'scenario_sunk_cost';

    // Render Archetypes
    const archContainer = document.getElementById('archetypeSelectGrid');
    if (archContainer) {
      archContainer.innerHTML = '';
      BUILDER_ARCHETYPES.forEach(arch => {
        const card = document.createElement('div');
        const isSel = arch.id === this.selectedArchetypeId;
        card.className = `archetype-select-card ${isSel ? 'selected' : ''}`;
        card.innerHTML = `
          <div class="badge badge-cyan" style="font-size: 9px;">${arch.badge}</div>
          <div style="font-family: var(--font-mono); font-weight: 800; font-size: 13px; color: #fff;">${arch.name}</div>
          <div style="font-size: 11px; color: var(--text-secondary); line-height: 1.3;">${arch.intro}</div>
          <div style="font-size: 10px; color: #ff99aa; margin-top: 4px;">⚠ Traps: ${arch.vulnerabilities}</div>
        `;
        card.addEventListener('click', () => {
          this.selectedArchetypeId = arch.id;
          archContainer.querySelectorAll('.archetype-select-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
        });
        archContainer.appendChild(card);
      });
    }

    // Render Scenarios
    const scenContainer = document.getElementById('scenarioSelectGrid');
    if (scenContainer) {
      scenContainer.innerHTML = '';
      MASTER_SCENARIOS.forEach(scen => {
        const card = document.createElement('div');
        const isSel = scen.id === this.selectedScenarioId;
        card.className = `scenario-select-card ${isSel ? 'selected' : ''}`;
        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: var(--font-mono); font-weight: 800; font-size: 14px; color: #fff;">${scen.title}</div>
            <div class="badge badge-gold font-mono">${scen.phases.length} PHASES</div>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">${scen.context}</div>
          <div style="font-size: 11px; font-family: var(--font-mono); color: var(--cyan-primary);">TARGET BIASES: ${scen.targetBiases}</div>
        `;
        card.addEventListener('click', () => {
          this.selectedScenarioId = scen.id;
          scenContainer.querySelectorAll('.scenario-select-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
        });
        scenContainer.appendChild(card);
      });
    }

    modal.classList.add('open');
  }

  setupRehabModal() {
    const modal = document.getElementById('rehabModal');
    const btnClose = document.getElementById('btnCloseRehabModal');
    const btnDismiss = document.getElementById('btnDismissRehabModal');

    [btnClose, btnDismiss].forEach(b => {
      if (b) b.addEventListener('click', () => modal.classList.remove('open'));
    });
  }

  openRehabModal(mod) {
    const modal = document.getElementById('rehabModal');
    if (!modal) return;

    this.currentRehabMod = mod;
    this.currentRehabQIdx = 0;
    this.renderRehabQuestion();
    modal.classList.add('open');
  }

  renderRehabQuestion() {
    const mod = this.currentRehabMod;
    if (!mod) return;
    const q = mod.questions[this.currentRehabQIdx];
    if (!q) return;

    document.getElementById('rehabFrameworkBadge').textContent = `${mod.framework.toUpperCase()} (EXERCISE ${this.currentRehabQIdx + 1}/${mod.questions.length})`;
    document.getElementById('rehabModalTitle').textContent = mod.title;
    document.getElementById('rehabModalDesc').textContent = mod.description;
    document.getElementById('rehabQuestionPrompt').textContent = `"${q.prompt}"`;

    const feedback = document.getElementById('rehabFeedbackBox');
    const btnRelease = document.getElementById('btnCompleteRehabAndRelease');
    feedback.style.display = 'none';
    btnRelease.style.display = 'none';

    const container = document.getElementById('rehabChoicesContainer');
    container.innerHTML = '';

    q.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn-terminal font-mono';
      btn.style.textAlign = 'left';
      btn.textContent = `${idx + 1}. ${choice.text}`;

      btn.addEventListener('click', () => {
        feedback.style.display = 'block';
        if (choice.isCorrect) {
          audio.playCoinChime();
          feedback.style.background = 'rgba(0, 229, 255, 0.1)';
          feedback.style.border = '1px solid var(--cyan-primary)';
          feedback.style.color = 'var(--cyan-light)';
          feedback.innerHTML = `<strong>✔ CLINICAL MASTERY:</strong> ${q.explanation}`;

          btnRelease.style.display = 'inline-block';
          if (this.currentRehabQIdx < mod.questions.length - 1) {
            btnRelease.textContent = 'NEXT REHAB DRILL →';
            btnRelease.onclick = () => {
              this.currentRehabQIdx++;
              this.renderRehabQuestion();
            };
          } else {
            btnRelease.textContent = 'RESTORE CLEARANCE & RETURN TO CRUCIBLE';
            btnRelease.onclick = () => {
              yard.completeRehabilitation();
              document.getElementById('rehabModal').classList.remove('open');
              this.updateGlobalHeader();
              alert("★ REHABILITATION CERTIFIED: Cognitive restructuring verified. Clearance restored to UNCERTIFIED. You may re-enter The Crucible.");
              this.switchTab('crucible');
            };
          }
        } else {
          audio.playAlarmSpike();
          feedback.style.background = 'rgba(255, 51, 102, 0.1)';
          feedback.style.border = '1px solid var(--crimson-danger)';
          feedback.style.color = '#ff99aa';
          feedback.innerHTML = `<strong>✖ COGNITIVE SURRENDER:</strong> ${q.explanation}`;
          btnRelease.style.display = 'none';
        }
      });

      container.appendChild(btn);
    });
  }
}

// Bootstrap on DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  const app = new MentalistApp();
  app.init();
  window.__mentalistApp = app;
});
