import { auth, db } from "./config"
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"

// Función para crear o actualizar usuario en Firestore
const createOrUpdateUser = async (user: User) => {
  console.log("🔍 Intentando crear/actualizar usuario:", user.email)
  console.log("🔍 DB existe?:", !!db)
  
  try {
    const userRef = doc(db, "usuarios", user.uid)
    console.log("📄 Referencia creada para UID:", user.uid)
    
    const userSnap = await getDoc(userRef)
    console.log("📄 Usuario existe?:", userSnap.exists())

    if (!userSnap.exists()) {
      console.log("✅ Creando nuevo usuario en Firestore...")
      // Usuario no existe, lo creamos
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: true, // Por defecto, todos los usuarios son admin (ajustar según necesidades)
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      })
      console.log("✅ Usuario creado exitosamente!")
    } else {
      console.log("🔄 Actualizando último login...")
      // Usuario existe, actualizamos último login
      await setDoc(
        userRef,
        {
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      )
      console.log("✅ Login actualizado!")
    }
  } catch (error) {
    console.error("❌ Error al crear/actualizar usuario:", error)
  }
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  
  // Crear o actualizar usuario en Firestore
  await createOrUpdateUser(result.user)
  
  return result
}

export const signOut = async () => {
  return await firebaseSignOut(auth)
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

// Función para verificar si un usuario es admin
export const checkIfUserIsAdmin = async (uid: string): Promise<boolean> => {
  try {
    const userRef = doc(db, "usuarios", uid)
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      return userSnap.data().isAdmin || false
    }
    return false
  } catch (error) {
    console.error("Error al verificar admin:", error)
    return false
  }
}

export { onAuthStateChanged }