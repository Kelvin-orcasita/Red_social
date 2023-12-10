import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getFavoriteUser = async () => {
  try {
    let userRef = collection(db, 'publications')
    let data = []
    for (let i = 0; i < userRef.docs.length; i++) {
      let element = userRef.docs[i].data()
      element.id = userRef.docs[i].id
      data.push(element)
    }
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
