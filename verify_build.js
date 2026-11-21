import fs from 'fs';
import path from 'path';

const CORE_ASSETS = [
  './index.html',
  './manifest.json',
  './config/flutterwave.config.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/logo-shield.png',
  './assets/images/mentalist_avatar.jpg',
  './css/theme.css',
  './css/layout.css',
  './css/interrogation.css',
  './css/wallet.css',
  './css/gym.css',
  './css/radar.css',
  './css/empire.css',
  './js/app.js',
  './js/audio.js',
  './js/storage.js',
  './js/pwa.js',
  './js/economy.js',
  './js/payment.js',
  './js/bonds.js',
  './js/stateMachine.js',
  './js/escalation.js',
  './js/scenarios.js',
  './js/interrogationEngine.js',
  './js/yard.js',
  './js/cbtGym.js',
  './js/probabilityGym.js',
  './js/radarChart.js',
  './js/empire.js',
  './js/dossiers.js'
];

let missing = 0;
for (const file of CORE_ASSETS) {
  if (!fs.existsSync(file)) {
    console.error('MISSING ASSET:', file);
    missing++;
  }
}

if (missing === 0) {
  console.log('ALL', CORE_ASSETS.length, 'CORE ASSETS VERIFIED ON DISK.');
} else {
  console.error('TOTAL MISSING ASSETS:', missing);
  process.exit(1);
}
