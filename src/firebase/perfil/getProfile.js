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

export const getMyProfile = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const list = collection(db, 'users')
    const q = query(list, where('email', '==', `${user.email}`))
    let emailuser = null

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      emailuser = doc.data()
    })

    return emailuser
  } catch (error) {
    console.log(error)
    return 'null'
  }
}
