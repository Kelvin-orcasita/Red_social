import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const LoginUser = async (emailUser, passwordUser) => {
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth,emailUser,passwordUser);      
    return userCredential
      
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-login-credentials") {
        return null 
      }
  }

};
