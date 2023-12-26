import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const userProfileAccont = async (idUser) => {
  try {
    let result = await getDocs(collection(db, 'users'))
    let data = []
    for (let i = 0; i < result.docs.length; i++) {
      let element = result.docs[i].data()
      element.id = result.docs[i].id

      console.log(element.id, '----', idUser.id)

      //   data.push(result.docs[i].id)
    }

    return console.log(data)

    const q = query(data, where('id', '==', `${id.id}`))

    let emailuser = null

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      emailuser = doc.data()
    })

    return emailuser
  } catch (error) {
    console.log(error)
    return 'null'
  }
}
