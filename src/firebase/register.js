import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const registerUser = async (emailUser, passwordUser) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailUser,
      passwordUser,
    );
    alert('Account Created successfully');
    
  } catch (error) {
    const errorCode = error.code;

    if (errorCode === "auth/email-already-in-use") {
      alert('Corrreo electronico ya en uso');
    }
    if (errorCode === 'auth/invalid-email') {
      alert("Correo inválido");
    }
    if (errorCode === 'auth/weak-password') {
      alert('Contraseña débil');
    }
  }
};


