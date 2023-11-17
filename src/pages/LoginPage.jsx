import { LoginUser, auth  } from "../firebase/login.js";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

export function LoginPage() {

    const form = useRef(null)
    const [messageError, serMessageError] = useState('')
    const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    if(!form.current) return
    if(!form.current.username.value) return serMessageError('Username is required') 
    if(!form.current.password.value) return serMessageError('Password is required') 
    LoginUser(form.current.username.value, form.current.password.value)
    if (auth.currentUser) {
      return navigate('/home')
    }
    form.current.reset()
    serMessageError('')
    return
    
  }

  function handleGoggle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
    return (
      <>
        <section>
        <article>
          <div className="flex justify-center h-screen items-center bg-slate-200">
            <div className="w-full max-w-xs">
              
              <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4" ref={form} onSubmit={handleSubmit}>
              <b className="block text-gray-700 text-2xl text-center font-bold mb-6">Log in</b>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="username"
                    type="email"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password" 
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    placeholder="******************" autoComplete="off"
                  />
                  <hr />
                  <p className="text-red-500 text-xs italic mb-2">
                    {messageError}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  > 
                    Login
                  </button>
                  
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"
                    onClick={handleGoggle}
                  >
                    <img title="Inicia sesión. Utiliza tu cuenta de Google" className="w-6" src="/public/icons/google.png" alt="Google" />
                  </a>
                  
                  <Link title="Inicia sesión."
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    to="/register"
                  >Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </article>
      </section>
      </>
    );
  }
  
  export default LoginPage;