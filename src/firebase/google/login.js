import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../../config.js'
import { getAll, getByEmail } from '../users/getAll.js'
import { registerUser } from '../users/register.js'

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const LoginUser = async (emailUser, passwordUser) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      emailUser,
      passwordUser,
    )
    const email = userCredential.user.email
    const existInDb = await getByEmail(email)
    if (existInDb == null) {
      await registerUser({
        email: userCredential.user.email,
        info: '',
        name: 'Usuario no definido',
        urlPhoto: userCredential.user.photoURL,
      })
    }
    return userCredential
  } catch (error) {
    const errorCode = error.code

    if (errorCode === 'auth/invalid-login-credentials') {
      return null
    }
  }
}
