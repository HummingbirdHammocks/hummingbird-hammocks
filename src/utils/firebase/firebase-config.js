import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import { getRemoteConfig } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID
};

let app;

// Gatsby specific version for SSR
export function getFirebase() {
  if (typeof window == 'undefined') return null;

  if (app) return app;
  // Use this to initialize the firebase App
  app = initializeApp(firebaseConfig);
  /* console.log(app); */
  return app;
}

export function analytics() {
  if (!app) return null;
  return getAnalytics(app);
}

export function logAnalyticsEvent(name, event) {
  if (!app) return null;
  return logEvent(analytics(), name, event);
}

export function perf() {
  if (!app) return null;
  return getPerformance(app);
}

export function db() {
  if (!app) return null;
  return getFirestore(app);
}

export function remoteConfig() {
  if (!app) return null;

  const remoteConfig = getRemoteConfig(app);

  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
  /* remoteConfig.settings.minimumFetchIntervalMillis = 43200000; */

  remoteConfig.defaultConfig = {
    top_banner: '{"description":"FREE SHIPPING for all USA orders over $25!"}'
  };

  return remoteConfig;
}
