/**
 * THE MENTALIST — FLUTTERWAVE PAYMENT GATEWAY & CAPITAL ALLOCATION BRIDGE
 */

import { FLUTTERWAVE_CONFIG } from '../config/flutterwave.config.js';
import { economy } from './economy.js';

class PaymentGateway {
  constructor() {
    this.scriptLoaded = false;
    this.simulationMode = false; // Toggleable for sandbox testing without card charge
    this.loadFlutterwaveScript();
  }

  loadFlutterwaveScript() {
    if (window.FlutterwaveCheckout) {
      this.scriptLoaded = true;
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    script.onload = () => {
      this.scriptLoaded = true;
      console.log('[Flutterwave] Checkout SDK v3 loaded successfully');
    };
    script.onerror = () => {
      console.warn('[Flutterwave] SDK script failed to load. Will fallback to simulator if needed.');
    };
    document.head.appendChild(script);
  }

  setSimulationMode(enabled) {
    this.simulationMode = enabled;
  }

  isSimulationMode() {
    return this.simulationMode;
  }

  /**
   * Allocate Capital / Fund Digital Coins via Flutterwave
   */
  allocatePackage(packageId, userEmail = 'builder@mentalist.io', userName = 'American Builder') {
    const pkg = FLUTTERWAVE_CONFIG.PACKAGES.find(p => p.id === packageId);
    if (!pkg) {
      alert('Selected capital allocation tier not found.');
      return;
    }

    const txRef = 'MENTALIST-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    // If simulation mode or Flutterwave unavailable, execute mock allocation
    if (this.simulationMode || !window.FlutterwaveCheckout) {
      this.completeTransaction({
        tx_ref: txRef,
        amount: pkg.amountUSD,
        currency: FLUTTERWAVE_CONFIG.CURRENCY,
        status: 'successful',
        customer: { email: userEmail, name: userName },
        package: pkg,
        isSimulated: true
      });
      return;
    }

    // Live Flutterwave Inline Checkout
    try {
      window.FlutterwaveCheckout({
        public_key: FLUTTERWAVE_CONFIG.PUBLIC_KEY,
        tx_ref: txRef,
        amount: pkg.amountUSD,
        currency: FLUTTERWAVE_CONFIG.CURRENCY,
        payment_options: 'card, mobilemoney, ussd, banktransfer',
        customer: {
          email: userEmail,
          name: userName
        },
        customizations: {
          title: FLUTTERWAVE_CONFIG.MERCHANT_TITLE,
          description: `${pkg.tier}: ${pkg.coins} Cognitive Credits (${pkg.bonus})`,
          logo: FLUTTERWAVE_CONFIG.MERCHANT_LOGO
        },
        callback: (data) => {
          console.log('[Flutterwave] Payment callback received:', data);
          if (data.status === 'successful' || data.status === 'completed') {
            this.completeTransaction({
              tx_ref: data.tx_ref || txRef,
              amount: pkg.amountUSD,
              currency: data.currency || FLUTTERWAVE_CONFIG.CURRENCY,
              status: 'successful',
              customer: { email: userEmail, name: userName },
              package: pkg,
              isSimulated: false
            });
          } else {
            alert('Payment was not completed. Status: ' + (data.status || 'aborted'));
          }
        },
        onclose: () => {
          console.log('[Flutterwave] Checkout modal closed by user');
        }
      });
    } catch (e) {
      console.error('[Flutterwave] Checkout invocation error:', e);
      alert('Unable to open Flutterwave modal. Switching to local simulator mode.');
      this.simulationMode = true;
      this.allocatePackage(packageId, userEmail, userName);
    }
  }

  completeTransaction(details) {
    const pkg = details.package;
    // Credit Sovereign balance
    economy.addCredits(
      pkg.coins,
      pkg.amountUSD,
      `Capital Inflow: ${pkg.tier} (${details.isSimulated ? 'Simulation' : 'Flutterwave Live'})`,
      details.tx_ref
    );

    // Render High-Status Receipt
    this.displayReceiptModal(details);
  }

  displayReceiptModal(details) {
    const pkg = details.package;
    const modal = document.getElementById('receiptModal');
    if (!modal) return;

    const body = document.getElementById('receiptModalBody');
    if (body) {
      body.innerHTML = `
        <div class="receipt-box">
          <div class="receipt-stamp">★ CAPITAL ALLOCATION CONFIRMED ★</div>
          <div class="receipt-line">
            <span class="text-muted">TRANSACTION ID:</span>
            <span class="font-mono text-cyan">${details.tx_ref}</span>
          </div>
          <div class="receipt-line">
            <span class="text-muted">TIER ACQUIRED:</span>
            <span class="font-mono text-gold">${pkg.tier}</span>
          </div>
          <div class="receipt-line">
            <span class="text-muted">CAPITAL COMMITTED:</span>
            <span class="font-mono">$${pkg.amountUSD.toFixed(2)} ${details.currency}</span>
          </div>
          <div class="receipt-line">
            <span class="text-muted">COINS ISSUED:</span>
            <span class="font-mono text-success">+${pkg.coins} Cognitive Credits</span>
          </div>
          <div class="receipt-line">
            <span class="text-muted">ROI / YIELD TARGET:</span>
            <span class="font-mono text-cyan">${pkg.roiTag}</span>
          </div>
          <div class="receipt-quote">
            "Capital Allocated Successfully. Your cognitive infrastructure has been upgraded. The Mentalist will notice."
          </div>
          ${details.isSimulated ? '<div class="badge badge-cyan" style="align-self: center;">SIMULATION TEST MODE</div>' : '<div class="badge badge-gold" style="align-self: center;">FLUTTERWAVE LIVE SETTLED</div>'}
        </div>
      `;
    }

    modal.classList.add('open');
  }
}

export const payment = new PaymentGateway();
