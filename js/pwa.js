/**
 * THE MENTALIST — PWA LIFECYCLE & INSTALLATION MANAGER
 */

class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.installBanner = null;
  }

  init() {
    this.registerServiceWorker();
    this.listenForInstallPrompt();
    this.monitorNetworkStatus();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
            reg.update();
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  }

  listenForInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent browser default mini-infobar
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('[PWA] App install prompt captured');

      const installBar = document.getElementById('pwaInstallBar');
      if (installBar) {
        installBar.classList.add('visible');
      }
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      console.log('[PWA] The Mentalist was installed successfully as an application');
      const installBar = document.getElementById('pwaInstallBar');
      if (installBar) {
        installBar.classList.remove('visible');
      }
    });
  }

  async triggerInstall() {
    if (!this.deferredPrompt) {
      alert('The Mentalist is already running as an installed application or browser does not require a prompt.');
      return;
    }
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    console.log(`[PWA] User response to installation: ${outcome}`);
    this.deferredPrompt = null;
    const installBar = document.getElementById('pwaInstallBar');
    if (installBar) {
      installBar.classList.remove('visible');
    }
  }

  monitorNetworkStatus() {
    const updateStatus = () => {
      const isOnline = navigator.onLine;
      const netIndicator = document.getElementById('telemetryNetworkStatus');
      if (netIndicator) {
        netIndicator.textContent = isOnline ? 'LINKED' : 'OFFLINE CACHE';
        netIndicator.className = isOnline ? 'telemetry-value text-cyan' : 'telemetry-value text-danger';
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
  }
}

export const pwa = new PWAManager();
