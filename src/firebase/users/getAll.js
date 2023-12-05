import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getByEmail = async (email) => {
  try {
    const list = collection(db, 'users')
    const q = query(list, where('email', '==', `${email}`))
    let emailuser = null

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      emailuser = doc.data()
    })
    return emailuser.email, emailuser
  } catch (error) {
    return null
  }
}
