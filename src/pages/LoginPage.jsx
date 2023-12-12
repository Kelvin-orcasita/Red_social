import { LoginUser } from '../firebase/google/login.js'
import { useRef, useState, useEffect } from 'react'
import { auth } from '../firebase/google/register.js'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  reload,
} from 'firebase/auth'
import { getByEmail } from '../firebase/users/getAll.js'
import { registerUser } from '../firebase/users/register.js'
const provider = new GoogleAuthProvider()

export function LoginPage() {
  const form = useRef(null)
  const [messageError, setMessageError] = useState('')
  const navigate = useNavigate()
  const authLogin = getAuth()

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.current) return
    if (!form.current.username.value)
      return setMessageError('Username is required')
    if (!form.current.password.value)
      return setMessageError('Password is required')
    const result = await LoginUser(
      form.current.username.value,
      form.current.password.value,
    )
    if (result == null) {
      return setMessageError('Credentials are not valid')
    }

    localStorage.setItem('user', JSON.stringify(result.user))
    navigate('/')
    return
  }

  function handleGoggle() {
    signInWithPopup(authLogin, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        const email = user.email
        const existInDb = await getByEmail(email)
        if (existInDb == null) {
          await registerUser({
            email: email,
            info: '',
            name: user.displayName,
            urlPhoto: user.photoURL,
          })
        }
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        setMessageError(errorCode)
        const errorMessage = error.message
        setMessageError(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email
        setMessageError(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }
  return (
    <>
      <Navbar />

      <section>
        <article>
          <div className='flex justify-center h-screen items-center bg-slate-200'>
            <div className='w-full max-w-xs'>
              <form
                className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'
                ref={form}
                onSubmit={handleSubmit}
              >
                <b className='block text-gray-700 text-2xl text-center font-bold mb-6'>
                  Log in
                </b>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='username'
                  >
                    Email
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    name='username'
                    type='email'
                    placeholder='Username'
                  />
                </div>
                <div>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='text'
                  >
                    Password
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='password'
                    type='password'
                    placeholder='******************'
                    autoComplete='off'
                  />
                  <hr />
                  <p className='text-red-500 text-xs italic mb-2'>
                    {messageError}
                  </p>
                </div>

                <div className='flex items-center justify-between'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Login
                  </button>

                  <Link
                    title='go register.'
                    className='inline-block align-baseline text-sm text-blue-500 hover:text-blue-800'
                    to='/register'
                  >
                    Register
                  </Link>
                </div>

                <div className='mt-6'>
                  <a
                    className='flex justify-center items-center border py-2 px-4 gap-4 hover:bg-blue-600  text-sm text-black hover:text-white rounded-xl transition duration-200 shadow-[0_4px_6px_-4px_#3b71ca]'
                    href='#'
                    onClick={handleGoggle}
                  >
                    <img
                      title='Log in. Use your Google account'
                      className='w-6 '
                      src='/icons/google.png'
                      alt='Google'
                    />
                    <p className=''>Sign in with Google</p>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default LoginPage
