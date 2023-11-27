import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getAll = async () => {
  try {
    const list = await getDocs(collection(db, 'users'))
    return list
  } catch (error) {
    return []
  }
}

export const getByEmail = async (email) => {
  try {
    const list = await getDocs(collection(db, 'users'))
    let search = list.find((p) => p.email === email)
    return search
  } catch (error) {
    return null
  }
}
