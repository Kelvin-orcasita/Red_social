import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'
import { getUserFromEmail } from '../publications/getUserFromEmail.js'
import { isFavorite } from '../publications/isFavorite.js'
import { getFavoriteUser } from '../publications/getFavoriteUser.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getMeFavorities = async () => {
  try {
    let user = JSON.parse(localStorage.getItem('user'))
    let result = await getDocs(collection(db, 'favorities'))
    let data = []
    for (let i = 0; i < result.docs.length; i++) {
      let element = result.docs[i].data()
      element.id = result.docs[i].id
      //   element.fullPublication = await getFavoriteUser()
      //   element.isFavorite = await isFavorite(element.id, user.email)

      console.log({ data: element })
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
