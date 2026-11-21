/**
 * THE MENTALIST — INTERROGATION ENGINE
 * 5-Phase Surgical Progression, Dynamic Dialogue Wheel, and Live Biometric Telemetry
 */

import { PsychologicalStateMachine } from './stateMachine.js';
import { EscalationEngine } from './escalation.js';
import { MASTER_SCENARIOS, BUILDER_ARCHETYPES } from './scenarios.js';
import { storage } from './storage.js';
import { audio } from './audio.js';
import { bonds } from './bonds.js';

class InterrogationEngine {
  constructor() {
    this.activeScenario = null;
    this.currentPhaseIndex = 0;
    this.stateMachine = null;
    this.escalation = null;
    this.dialogueHistory = [];
    this.isTyping = false;
  }

  startSession(scenarioId = 'scenario_sunk_cost', archetypeId = null) {
    const scenario = MASTER_SCENARIOS.find(s => s.id === scenarioId) || MASTER_SCENARIOS[0];
    const profile = storage.getState().profile;
    const archId = archetypeId || profile.archetype || 'tech_disruptor';
    const archetype = BUILDER_ARCHETYPES.find(a => a.id === archId) || BUILDER_ARCHETYPES[0];

    // Persist active archetype if changed
    if (archetypeId && profile.archetype !== archetypeId) {
      storage.update(state => {
        state.profile.archetype = archetypeId;
      });
    }

    this.activeScenario = scenario;
    this.currentPhaseIndex = 0;
    this.dialogueHistory = [];

    // Clear dialogue viewport cleanly
    const viewport = document.getElementById('dialogueViewport');
    if (viewport) viewport.innerHTML = '';

    // Initialize State Machine with archetype starting parameters
    this.stateMachine = new PsychologicalStateMachine(archetype.startingMetrics);

    // Initialize Escalation Engine with interruption callbacks
    this.escalation = new EscalationEngine(
      this.stateMachine,
      (interruptText) => this.handleMentalistInterrupt(interruptText),
      (blackSwan) => this.handleBlackSwanOverride(blackSwan)
    );

    // Audio setup
    audio.ensureContext();
    audio.updateCognitiveLoadBpm(this.stateMachine.cognitiveLoad);

    // Dispatch UI init event
    window.dispatchEvent(new CustomEvent('mentalist:session_started', {
      detail: { scenario, archetype, metrics: this.stateMachine.getMetrics() }
    }));

    // Start Phase 1
    this.renderCurrentPhase();
  }

  getCurrentPhase() {
    if (!this.activeScenario) return null;
    return this.activeScenario.phases[this.currentPhaseIndex];
  }

  renderCurrentPhase() {
    const phase = this.getCurrentPhase();
    if (!phase) {
      this.concludeSession(true);
      return;
    }

    // Check Black Swan injection for high-performing players
    if (this.escalation.evaluateBlackSwan(phase.phaseNumber)) {
      return;
    }

    // Type Mentalist Dialogue
    this.typeMentalistDialogue(phase.mentalistDialogue, () => {
      // Start hesitation timer once Mentalist finishes speaking
      if (phase.nodes && phase.nodes.length > 0) {
        this.escalation.startHesitationTracker(phase.phaseNumber);

        // Check if Charlie Munger Inversion Lens is equipped
        const equipped = storage.getState()?.empire?.equippedSkills || [];
        const hasInversionLens = equipped.includes('inversion_lens');
        const processedNodes = phase.nodes.map(n => ({
          ...n,
          isInversionFlagged: hasInversionLens && (n.isCriticalFailure || (n.type === 'scarcity' && n.delta?.scarcity >= 35))
        }));

        window.dispatchEvent(new CustomEvent('mentalist:render_dialogue_wheel', {
          detail: { nodes: processedNodes, phaseNumber: phase.phaseNumber }
        }));
      } else {
        // Final verdict phase with no response nodes
        this.concludeSession(true);
      }
    });

    this.updateHUD();
  }

  selectNode(nodeIndex) {
    if (this.isTyping) return;
    const phase = this.getCurrentPhase();
    if (!phase || !phase.nodes[nodeIndex]) return;

    const chosenNode = phase.nodes[nodeIndex];
    this.escalation.stopHesitationTracker();

    // Hide dialogue wheel nodes while mentalist evaluates
    const wheelContainer = document.getElementById('wheelNodesContainer');
    if (wheelContainer) wheelContainer.innerHTML = '';

    // Check for scarcity keywords in player's statement
    this.escalation.checkKeywords(chosenNode.text);

    // Record Player Dialogue Bubble
    this.recordPlayerResponse(chosenNode.text, chosenNode.label);

    // Apply Psychological Metric Deltas with equipped skill modifiers
    let delta = { ...(chosenNode.delta || {}) };
    const equipped = storage.getState()?.empire?.equippedSkills || [];
    
    // Loss Aversion Shield: Dampen scarcity and load penalties by 20%
    if (equipped.includes('loss_shield')) {
      if (delta.scarcity && delta.scarcity > 0) delta.scarcity = Math.round(delta.scarcity * 0.8);
      if (delta.load && delta.load > 0) delta.load = Math.round(delta.load * 0.8);
    }

    // Sovereign Presence: Dampen ego spikes by 35% and boost stoic gains by 15%
    if (equipped.includes('sovereign_presence')) {
      if (delta.ego && delta.ego > 0) delta.ego = Math.round(delta.ego * 0.65);
      if (delta.stoic && delta.stoic > 0) delta.stoic = Math.round(delta.stoic * 1.15);
    }

    const newMetrics = this.stateMachine.applyDelta(delta);
    audio.updateCognitiveLoadBpm(newMetrics.cognitiveLoad);

    // Check Panic Threshold (Cognitive Load >= 100%)
    if (this.stateMachine.isPanicked()) {
      audio.playAlarmSpike();
      this.triggerYardRemand("Psychological overload. Cognitive load breached 100%. Panic reaction confirmed.");
      return;
    }

    // Check Critical Trap Failure
    if (chosenNode.isCriticalFailure) {
      audio.playAlarmSpike();
      this.typeMentalistDialogue(chosenNode.response, () => {
        this.triggerYardRemand(`Critical cognitive failure: Fallen for ${chosenNode.label} under duress.`);
      });
      return;
    }

    // Mentalist Reaction
    this.typeMentalistDialogue(chosenNode.response, () => {
      // Advance to Next Phase after short delay
      setTimeout(() => {
        this.currentPhaseIndex += 1;
        this.renderCurrentPhase();
      }, 1000);
    });

    this.updateHUD();
  }

  recordPlayerResponse(text, label) {
    const entry = { speaker: 'player', text, tag: label, timestamp: new Date().toLocaleTimeString() };
    this.dialogueHistory.push(entry);

    const viewport = document.getElementById('dialogueViewport');
    if (viewport) {
      const bubble = document.createElement('div');
      bubble.className = 'dialogue-bubble bubble-player';

      const tagEl = document.createElement('div');
      tagEl.className = 'bubble-speaker-label';
      tagEl.textContent = `AMERICAN BUILDER // ${label}`;

      const content = document.createElement('div');
      content.textContent = text;

      bubble.appendChild(tagEl);
      bubble.appendChild(content);
      viewport.appendChild(bubble);
      viewport.scrollTop = viewport.scrollHeight;
    }
  }

  handleMentalistInterrupt(interruptText) {
    const entry = { speaker: 'mentalist', text: interruptText, tag: '[INTERRUPT / PENALTY]', timestamp: new Date().toLocaleTimeString() };
    this.dialogueHistory.push(entry);

    const viewport = document.getElementById('dialogueViewport');
    if (viewport) {
      const bubble = document.createElement('div');
      bubble.className = 'dialogue-bubble bubble-mentalist hostile';

      const label = document.createElement('div');
      label.className = 'bubble-speaker-label text-danger';
      label.textContent = 'THE MENTALIST [INTERRUPT / TIME EXPIRED]';

      const content = document.createElement('div');
      content.textContent = interruptText;

      bubble.appendChild(label);
      bubble.appendChild(content);
      viewport.appendChild(bubble);
      viewport.scrollTop = viewport.scrollHeight;
    }

    this.updateHUD();
  }

  handleBlackSwanOverride(blackSwan) {
    const banner = document.getElementById('blackSwanBanner');
    if (banner) {
      banner.classList.add('active');
      banner.textContent = `⚠ ${blackSwan.title}: ${blackSwan.text}`;
    }

    const entry = { speaker: 'mentalist', text: blackSwan.text, tag: '[BLACK SWAN CRISIS]', timestamp: new Date().toLocaleTimeString() };
    this.dialogueHistory.push(entry);

    const viewport = document.getElementById('dialogueViewport');
    if (viewport) {
      const bubble = document.createElement('div');
      bubble.className = 'dialogue-bubble bubble-mentalist hostile';

      const label = document.createElement('div');
      label.className = 'bubble-speaker-label text-danger';
      label.textContent = `THE MENTALIST // ⚠ ${blackSwan.title}`;

      const content = document.createElement('div');
      content.textContent = blackSwan.text;

      bubble.appendChild(label);
      bubble.appendChild(content);
      viewport.appendChild(bubble);
      viewport.scrollTop = viewport.scrollHeight;
    }

    this.updateHUD();
  }

  typeMentalistDialogue(text, onComplete) {
    this.isTyping = true;
    const viewport = document.getElementById('dialogueViewport');
    if (!viewport) {
      this.isTyping = false;
      if (onComplete) onComplete();
      return;
    }

    const mode = this.stateMachine ? this.stateMachine.mode : 'observer';
    let modeClass = '';
    let modeLabel = 'THE MENTALIST [LEAD INVESTIGATOR]';

    if (mode === 'provocateur') {
      modeClass = 'warning';
      modeLabel = 'THE MENTALIST [PROVOCATEUR]';
    } else if (mode === 'interrogator') {
      modeClass = 'hostile';
      modeLabel = 'THE MENTALIST [HOSTILE INTERROGATOR]';
    } else if (mode === 'trap_setter') {
      modeClass = 'deceptive';
      modeLabel = 'THE MENTALIST [CONNY STRATEGY]';
    }

    const bubble = document.createElement('div');
    bubble.className = `dialogue-bubble bubble-mentalist ${modeClass}`;

    const label = document.createElement('div');
    label.className = 'bubble-speaker-label';
    label.textContent = modeLabel;

    const content = document.createElement('div');
    const textSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'stream-cursor font-mono';
    cursorSpan.style.color = 'var(--cyan-primary)';
    cursorSpan.textContent = ' ▌';

    content.appendChild(textSpan);
    content.appendChild(cursorSpan);
    bubble.appendChild(label);
    bubble.appendChild(content);
    viewport.appendChild(bubble);
    viewport.scrollTop = viewport.scrollHeight;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < text.length) {
        textSpan.textContent += text[idx];
        if (idx % 3 === 0) audio.playSpeechBlip();
        viewport.scrollTop = viewport.scrollHeight;
        idx++;
      } else {
        clearInterval(interval);
        cursorSpan.remove();
        this.isTyping = false;
        this.dialogueHistory.push({
          speaker: 'mentalist',
          text,
          tag: modeLabel,
          timestamp: new Date().toLocaleTimeString()
        });
        if (onComplete) onComplete();
      }
    }, 14);
  }

  updateHUD() {
    if (!this.stateMachine) return;
    const metrics = this.stateMachine.getMetrics();
    window.dispatchEvent(new CustomEvent('mentalist:metrics_updated', { detail: metrics }));
  }

  triggerYardRemand(reason) {
    this.escalation.stopHesitationTracker();
    audio.stopHeartbeat();

    storage.update((state) => {
      state.profile.failedSessions += 1;
      state.profile.clearanceStatus = 'REMANDED_TO_YARD';
      state.yardState = {
        isJailed: true,
        reason: reason,
        assignedModule: 'loss_aversion_cbt'
      };
    });

    window.dispatchEvent(new CustomEvent('mentalist:jailed', { detail: { reason } }));
  }

  concludeSession(cleared = true) {
    this.escalation.stopHesitationTracker();
    audio.stopHeartbeat();

    if (cleared) {
      // Calculate Mind Graph impact
      const m = this.stateMachine.getMetrics();
      storage.update((state) => {
        state.profile.totalSessions += 1;
        state.profile.passedSessions += 1;
        state.profile.clearanceStatus = 'CLEARED_BUILDER';
        state.yardState.isJailed = false;

        // Upgrade Mind Graph Scores based on performance
        state.mindGraph.stoicRegulation = Math.min(100, state.mindGraph.stoicRegulation + Math.round(m.stoicWealth / 10));
        state.mindGraph.resilienceGrit = Math.min(100, state.mindGraph.resilienceGrit + 6);
        state.mindGraph.locusOfControl = Math.min(100, state.mindGraph.locusOfControl + (100 - m.scarcityFear) / 15);
        state.mindGraph.financialEQ = Math.min(100, state.mindGraph.financialEQ + 8);
      });

      // Record bond success
      bonds.recordInterrogationSuccess();

      window.dispatchEvent(new CustomEvent('mentalist:session_cleared', {
        detail: { scenario: this.activeScenario, metrics: this.stateMachine.getMetrics() }
      }));
    }
  }
}

export const interrogationEngine = new InterrogationEngine();
