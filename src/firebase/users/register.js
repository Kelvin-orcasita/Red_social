import { initializeApp } from "firebase/app";
import {  getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../../config.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const registerUser = async (user) => {
  try {
    let result = await addDoc(collection(db, 'users'), user);
    console.log({result: result})
    return "Register success";
}catch(error){
  console.log({error:error});
  return "An error occurred while registering the user"
}
};


