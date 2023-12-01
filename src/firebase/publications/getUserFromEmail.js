import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getUserFromEmail = async (email) => {

  try {
    let userRef = collection(db, 'users');
    const q = query(userRef, where("email", "==", `${email}`));
    let user = null

    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        user=doc.data()
      });

    return user;
    
  } catch (error) {
    console.log(error);
    return []
  }
}
