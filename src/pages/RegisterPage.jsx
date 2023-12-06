import { registerUserGoogle } from '../firebase/google/register.js'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { registerUser } from '../firebase/users/register.js'

export function RegisterPage() {
  const [messageError, serMessageError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const form = useRef(null)
  const navigate = useNavigate()

 async function handleSubmit(event) {
    event.preventDefault()
    if (!form.current) return
    if (form.current.password.value === form.current.repeatPassword.value) {
      if (!form.current.username.value)
        return serMessageError('Username is required')
      if (!form.current.password.value)
        return serMessageError('Password is required')
      if (form.current.password.value.length < 6)
        return serMessageError('Password must be at last 6 characters')

      registerUserGoogle(
        form.current.username.value,
        form.current.password.value,
      )
      const result = await registerUser()
      if (result) {
        alert('User registration')
        navigate('/login')
      }
      return
    }
    return serMessageError('password do not match')
  }

  return (
    <>
      <section>
        <article>
          <Navbar />
        </article>
      </section>

      <section>
        <article>
          <div className='flex justify-center h-screen items-center bg-slate-200'>
            <div className='w-full max-w-xs'>
              <form
                className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'
                ref={form}
              >
                <b className='block text-gray-700 text-2xl text-center font-bold mb-6'>
                  Create an account
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
                    htmlFor='password'
                  >
                    Password
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='password'
                    type='text'
                    placeholder='******************'
                    autoComplete='off'
                  />
                </div>
                <div className='mb-6'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='password'
                  >
                    Repeat password
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    name='repeatPassword'
                    type='text'
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
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                  <Link
                    title='Inicia sesión.'
                    className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                    to='/login'
                  >
                    Sing in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
