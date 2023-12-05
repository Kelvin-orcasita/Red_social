import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const createPublication = async (post) => {
  try {
    console.log(post)
    if (post.img == '' || post.img == undefined) {
      return alert('You must post an image')
    } else if (post.title.trim() == '') {
      return
    } else {
      let result = await addDoc(collection(db, 'publications'), post)
      return 'successfully published'
    }
  } catch (error) {
    console.log(error)
    return alert('Error in publication')
  }
}
