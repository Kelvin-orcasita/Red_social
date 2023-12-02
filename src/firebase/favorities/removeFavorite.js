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

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const removeFavorite = async (favorite) => {
  try {
    let userRef = collection(db, 'favorities')
    const q = query(
      userRef,
      where('emailUser', '==', `${favorite.emailUser}`),
      where('idPublication', '==', `${favorite.idPublication}`),
    )
    let idFavorite = null

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      idFavorite = doc.id
    })
    await deleteDoc(doc(db, 'favorities', `${idFavorite}`))
    return ''
  } catch (error) {
    console.log(error)
    return ''
  }
}
