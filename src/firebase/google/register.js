import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const registerUserGoogle = async (emailUser, passwordUser) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailUser,
      passwordUser,
    )

    const email = userCredential.user.email
    const existInDb = getByEmail(email)
    if (existInDb == null) {
      registerUser({
        email: userCredential.user.email,
        info: '',
        password: userCredential.user.email,
        name: userCredential.user.displayName,
        urlPhoto: userCredential.user.photoURL,
      })
    }
    alert('Account Created successfully')
  } catch (error) {
    const errorCode = error.code

    if (errorCode === 'auth/email-already-in-use') {
      alert('Corrreo electronico ya en uso')
    }
    if (errorCode === 'auth/invalid-email') {
      alert('Correo inválido')
    }
    if (errorCode === 'auth/weak-password') {
      alert('Contraseña débil')
    }
  }
}
