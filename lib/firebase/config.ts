
// ============================================
// ARCHIVO: config.ts
// ============================================
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDMf_2jURSJEyUu-pAbAPrKzF9KyX_WzFo",
  authDomain: "veterinaria-1f5f1.firebaseapp.com",
  projectId: "veterinaria-1f5f1",
  storageBucket: "veterinaria-1f5f1.firebasestorage.app",
  messagingSenderId: "984208748318",
  appId: "1:984208748318:web:3dc7a9dc9bbb46c7cd630f",
  measurementId: "G-WEL2XK104X",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app