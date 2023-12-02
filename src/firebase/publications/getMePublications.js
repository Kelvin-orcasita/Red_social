import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'
import { getUserFromEmail } from './getUserFromEmail.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getMePublications = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const ref = collection(db, 'publications')
    const q = query(ref, where('user', '==', `${user.email}`))
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
  } catch (error) {
    console.log(error)
    return []
  }
}
