/**
 * THE MENTALIST — CLINICAL MIND GRAPH RADAR ENGINE
 * High-precision HTML5 Canvas 2D 6-axis Radar Chart and Clearance Dossier Generator.
 */

import { storage } from './storage.js';

export class MindGraphRadar {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.axes = [
      { key: 'locusOfControl', label: 'LOCUS OF CONTROL' },
      { key: 'resilienceGrit', label: 'RESILIENCE & GRIT' },
      { key: 'financialEQ', label: 'FINANCIAL EQ (FEQ)' },
      { key: 'riskTolerance', label: 'RISK TOLERANCE' },
      { key: 'stoicRegulation', label: 'STOIC REGULATION' },
      { key: 'strategicIntegrity', label: 'STRATEGIC INTEGRITY' }
    ];
  }

  render() {
    if (!this.canvas) {
      this.canvas = document.getElementById('mindGraphCanvas');
      if (this.canvas) this.ctx = this.canvas.getContext('2d');
    }
    if (!this.ctx) return;

    const width = this.canvas.width = 540;
    const height = this.canvas.height = 420;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 95;

    const metrics = storage.getState().mindGraph;
    const ctx = this.ctx;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw Concentric Background Rings
    const rings = 5;
    for (let r = 1; r <= rings; r++) {
      const ringRadius = (radius / rings) * r;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const x = centerX + ringRadius * Math.cos(angle);
        const y = centerY + ringRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = r === rings ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = r === rings ? 1.5 : 1;
      ctx.stroke();
    }

    // Draw Spokes
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw Axis Label with smart alignments
      const labelDist = radius + 15;
      const labelX = centerX + labelDist * Math.cos(angle);
      const labelY = centerY + labelDist * Math.sin(angle);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '700 8.5px "JetBrains Mono", monospace';
      
      // Smart alignment to avoid clipping
      if (Math.abs(Math.cos(angle)) < 0.2) {
        ctx.textAlign = 'center';
      } else if (Math.cos(angle) > 0) {
        ctx.textAlign = 'left';
      } else {
        ctx.textAlign = 'right';
      }
      ctx.textBaseline = 'middle';
      ctx.fillText(this.axes[i].label, labelX, labelY);
    }

    // Draw Mind Graph Data Polygon
    ctx.beginPath();
    this.axes.forEach((axis, i) => {
      const value = Math.max(10, Math.min(100, metrics[axis.key] || 50));
      const normalizedRadius = (value / 100) * radius;
      const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
      const x = centerX + normalizedRadius * Math.cos(angle);
      const y = centerY + normalizedRadius * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    // Fill with glowing gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0.25)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Outline
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // Draw Data Point Nodes
    this.axes.forEach((axis, i) => {
      const value = Math.max(10, Math.min(100, metrics[axis.key] || 50));
      const normalizedRadius = (value / 100) * radius;
      const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
      const x = centerX + normalizedRadius * Math.cos(angle);
      const y = centerY + normalizedRadius * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd700';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  getWIQScore() {
    const m = storage.getState().mindGraph;
    const sum = m.locusOfControl + m.resilienceGrit + m.financialEQ + m.riskTolerance + m.stoicRegulation + m.strategicIntegrity;
    return Math.round((sum / 600) * 100);
  }

  exportClearanceCard() {
    // Generate a high-resolution 800x1000 Classified Dossier Card for sharing
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 800;
    cardCanvas.height = 1000;
    const c = cardCanvas.getContext('2d');
    const state = storage.getState();
    const metrics = state.mindGraph;
    const wiq = this.getWIQScore();

    // 1. Background
    c.fillStyle = '#070a0e';
    c.fillRect(0, 0, 800, 1000);

    // Subtle grid pattern
    c.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    c.lineWidth = 1;
    for (let x = 0; x < 800; x += 40) {
      c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1000); c.stroke();
    }
    for (let y = 0; y < 1000; y += 40) {
      c.beginPath(); c.moveTo(0, y); c.lineTo(800, y); c.stroke();
    }

    // Outer double border
    c.strokeStyle = '#d4af37';
    c.lineWidth = 2;
    c.strokeRect(24, 24, 752, 952);
    c.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    c.lineWidth = 1;
    c.strokeRect(32, 32, 736, 936);

    // 2. Header
    c.fillStyle = '#00e5ff';
    c.font = 'bold 12px "JetBrains Mono", monospace';
    c.textAlign = 'center';
    c.fillText('OFFICIAL PSYCHOMETRIC CLEARANCE DOSSIER // DEPT. OF PSYCHOLOGICAL INTEGRITY', 400, 68);

    c.fillStyle = '#ffffff';
    c.font = '900 28px "Cinzel", "Space Mono", serif';
    c.fillText('THE MENTALIST', 400, 104);

    c.fillStyle = '#d4af37';
    c.font = 'bold 14px "JetBrains Mono", monospace';
    c.fillText('★ AMERICAN BUILDER WEALTH INTELLIGENCE CERTIFICATE ★', 400, 130);

    // Divider
    c.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    c.beginPath(); c.moveTo(60, 150); c.lineTo(740, 150); c.stroke();

    // 3. Subject Metadata
    c.textAlign = 'left';
    c.fillStyle = '#94a3b8';
    c.font = '12px "JetBrains Mono", monospace';
    c.fillText('SUBJECT ARCHETYPE:', 60, 180);
    c.fillText('CERTIFICATION DATE:', 60, 204);
    c.fillText('CLEARANCE STATUS:', 460, 180);
    c.fillText('SECURITY HASH:', 460, 204);

    c.fillStyle = '#ffffff';
    c.font = 'bold 12px "JetBrains Mono", monospace';
    c.fillText(state.profile.archetype.toUpperCase().replace('_', ' '), 200, 180);
    c.fillText(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(), 200, 204);

    c.fillStyle = '#00e5ff';
    c.fillText(state.profile.clearanceStatus, 590, 180);
    c.fillStyle = '#94a3b8';
    c.fillText('US-MNT-' + Math.random().toString(36).substr(2, 8).toUpperCase(), 590, 204);

    // 4. Draw Center Radar Chart
    if (this.canvas) {
      c.drawImage(this.canvas, 130, 230, 540, 420);
    }

    // 5. WIQ Score Hero Box
    c.fillStyle = 'rgba(15, 23, 42, 0.8)';
    c.fillRect(60, 670, 680, 100);
    c.strokeStyle = '#d4af37';
    c.lineWidth = 1.5;
    c.strokeRect(60, 670, 680, 100);

    c.fillStyle = '#94a3b8';
    c.font = '11px "JetBrains Mono", monospace';
    c.textAlign = 'center';
    c.fillText('AGGREGATE WEALTH INTELLIGENCE QUOTIENT (WIQ)', 400, 698);

    c.fillStyle = '#ffd700';
    c.font = 'bold 44px "JetBrains Mono", monospace';
    c.fillText(`${wiq} / 100`, 400, 746);

    // 6. Metrics Summary Table
    const tableY = 795;
    const rowH = 26;
    c.font = '12px "JetBrains Mono", monospace';
    this.axes.forEach((axis, idx) => {
      const col = idx < 3 ? 0 : 1;
      const row = idx % 3;
      const x = col === 0 ? 80 : 440;
      const y = tableY + row * rowH;
      const val = metrics[axis.key] || 50;

      c.textAlign = 'left';
      c.fillStyle = '#94a3b8';
      c.fillText(axis.label + ':', x, y);

      c.textAlign = 'right';
      c.fillStyle = val >= 70 ? '#00e5ff' : '#ffffff';
      c.fillText(`${val}%`, x + 260, y);
    });

    // 7. Official Seal & Stamp
    c.save();
    c.translate(650, 910);
    c.rotate(-0.15);
    c.strokeStyle = '#ff3366';
    c.lineWidth = 3;
    c.strokeRect(-80, -22, 160, 44);
    c.fillStyle = '#ff3366';
    c.font = 'bold 12px "JetBrains Mono", monospace';
    c.textAlign = 'center';
    c.fillText('CLEARED BUILDER', 0, -4);
    c.font = '9px "JetBrains Mono", monospace';
    c.fillText('MENTALIST SURGICAL PASS', 0, 12);
    c.restore();

    // Footer
    c.fillStyle = '#64748b';
    c.font = '10px "JetBrains Mono", monospace';
    c.textAlign = 'center';
    c.fillText('VERIFIED AUTHENTIC VIA ZERO-THIRD-PARTY PSYCHOLOGICAL ENGINE // THE MENTALIST', 400, 945);

    return cardCanvas.toDataURL('image/png');
  }
}

export const radarChart = new MindGraphRadar('mindGraphCanvas');
