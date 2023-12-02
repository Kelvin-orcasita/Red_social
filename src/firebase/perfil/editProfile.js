import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  doc,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const editprofileUser = async (user) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem('user'))
    const list = collection(db, 'users')
    const q = query(list, where('email', '==', `${userLocal.email}`))
    let idUser = null

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      idUser = doc.id
    })

    await updateDoc(doc(db, 'users', idUser), user)

    return 'Updated registration'
  } catch (error) {
    console.log({ error: error })
    return 'Error updating record'
  }
}
