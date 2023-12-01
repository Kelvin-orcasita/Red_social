import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import { firebaseConfig } from '../../config.js'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const isFavorite = async (idPublication, emailUser) => {

  try {
    let userRef = collection(db, 'favorities');
    const q = query(userRef, where("emailUser", "==", `${emailUser}`), where("idPublication", "==", `${idPublication}`));
    const result = await getDocs(q);
    if(result.docs.length > 0) {
        return true;
    }else{
        return false;
    }
    
  } catch (error) {
    console.log(error);
    return []
  }
}
