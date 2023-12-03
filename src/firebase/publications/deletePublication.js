import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'
import { reload } from 'firebase/auth'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const deletePublication = async (publication) => {
  try {
    await deleteDoc(doc(db, 'publications', `${publication.id}`))
    location.reload()
    return ''
  } catch (error) {
    console.log(error)
    return ''
  }
}
