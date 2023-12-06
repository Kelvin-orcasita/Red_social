import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'
import { getUserFromEmail } from './getUserFromEmail.js'
import { isFavorite } from './isFavorite.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getPublications = async () => {
  try {
    let user = JSON.parse(localStorage.getItem('user'))

    let result = await getDocs(collection(db, 'publications'))
    let data = []
    for (let i = 0; i < result.docs.length; i++) {
      let element = result.docs[i].data()
      element.id = result.docs[i].id
      element.fullUser = await getUserFromEmail(element.user)
      if(user!==null){
        element.isFavorite = await isFavorite(element.id, user.email)
      }
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
