import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const createFavorite = async (favorite) => {
  try {
    let result = await addDoc(collection(db, 'favorities'), favorite)
    return ''
  } catch (error) {
    console.log(error)
    return ''
  }
}
