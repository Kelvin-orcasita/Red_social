import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const removeFavorite = async (favorite) => {

  try {
      console.log({favorite: favorite})
      return ''
    
  } catch (error) {
    console.log(error);
    return ''
  }
}
