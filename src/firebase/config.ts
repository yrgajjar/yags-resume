import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

// ---------------------------------------------------------------------------
// Firebase initialisation.
//
// All values come from Vite env vars (see .env.example). They are PUBLIC client
// config — security is enforced by Firestore Security Rules + Auth, not by
// hiding these keys.
//
// If the env vars are missing, `isFirebaseConfigured` is false and the app
// runs in "read-only / seed data" mode: the public resume still renders using
// the bundled defaults, and the admin panel is gracefully disabled.
// ---------------------------------------------------------------------------

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
} else {
  // Helpful, non-fatal hint during local development.
  console.info(
    '[yags-resume] Firebase is not configured. Running with bundled seed data; ' +
      'the admin panel is disabled. Add your keys to .env to enable it.',
  )
}

export { app, auth, db }
