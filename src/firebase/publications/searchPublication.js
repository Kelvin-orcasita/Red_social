import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'
import { getUserFromEmail } from './getUserFromEmail.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const searchPublication = async (search) => {
  try {
    let searchInput = search.search.trim()
    if (searchInput !== '') {
      const ref = collection(db, 'publications')
      const q = query(ref, where('title', '==', `${searchInput}`))
      let result = await getDocs(q)
      let data = []
      for (let i = 0; i < result.docs.length; i++) {
        let element = result.docs[i].data()
        element.id = result.docs[i].id
        element.fullUser = await getUserFromEmail(element.user)
        data.push(element)
      }
      data.sort(function (x, y) {
        return y.date - x.date
      })

      return data
    }
    return null
  } catch (error) {
    console.log(error)
  }
}
