/**
 * THE MENTALIST — NATIVE WEB AUDIO SFX & SYNTHESIZER ENGINE
 * Zero external audio files. 100% synthesized via Web Audio API.
 * Heartbeat monitor, analog clock ticking, 40Hz room drone, biometric alarms, gold coin chimes.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.heartbeatInterval = null;
    this.droneGain = null;
    this.currentBpm = 68;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
      this.startAmbientDrone();
    } catch (e) {
      console.warn('[AudioEngine] Web Audio API not supported or blocked:', e);
    }
  }

  ensureContext() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.droneGain) {
      this.droneGain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  /**
   * 40Hz Low-Frequency Interrogation Room Drone
   */
  startAmbientDrone() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(42, this.ctx.currentTime); // Deep binaural drone

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
      this.droneGain = gain;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
    } catch (e) {
      console.warn('Drone start error', e);
    }
  }

  /**
   * Physiological Heartbeat: "lub-dub" double-pulse
   */
  playHeartbeatThump(intensity = 0.5) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    // First thump (lub)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(65, t);
    osc1.frequency.exponentialRampToValueAtTime(35, t + 0.12);
    gain1.gain.setValueAtTime(0.15 * intensity, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.15);

    // Second thump (dub) - 140ms later
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(52, t + 0.14);
    osc2.frequency.exponentialRampToValueAtTime(28, t + 0.26);
    gain2.gain.setValueAtTime(0.2 * intensity, t + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t + 0.14);
    osc2.stop(t + 0.3);
  }

  /**
   * Adaptive Heartbeat Loop according to Cognitive Load (0-100%)
   */
  updateCognitiveLoadBpm(cognitiveLoad) {
    // Map 0-100% load to 60-135 BPM
    const targetBpm = Math.round(62 + (cognitiveLoad / 100) * 70);
    this.currentBpm = targetBpm;

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    const intervalMs = (60 / targetBpm) * 1000;
    const intensity = Math.min(1.0, 0.4 + (cognitiveLoad / 100) * 0.6);

    this.heartbeatInterval = setInterval(() => {
      this.playHeartbeatThump(intensity);
    }, intervalMs);

    return targetBpm;
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /**
   * Analog Clock Tick (Hesitation countdown)
   */
  playClockTick() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.04);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  /**
   * Biometric Trap / Danger Alarm Spike
   */
  playAlarmSpike() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(330, t + 0.35);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  /**
   * Sovereign Gold Coin / Capital Allocation Chime
   */
  playCoinChime() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    [987.77, 1318.51, 1975.53].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = t + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  }

  /**
   * Interrogation Speech Typewriter Blip
   */
  playSpeechBlip() {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180 + Math.random() * 40, t);

    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.03);
  }
}

export const audio = new AudioEngine();
