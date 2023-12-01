import { getAuth, signOut } from 'firebase/auth'
import { auth } from '../../firebase/google/register.js'
import { Link, useNavigate } from 'react-router-dom'

export function Dropdowns() {
  const user = JSON.parse(localStorage.getItem('user'))
  let navigate = useNavigate()

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        navigate('/')
        localStorage.removeItem('user')
        window.location.reload(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className='bg-white flex flex-col justify-center'>
        <div className='flex items-center justify-center '>
          <div className='inline-block text-left  dropdown'>
            <button
              className='inline-flex bg-slate-950 justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150'
              type='button'
              aria-haspopup='true'
              aria-expanded='true'
              aria-controls='headlessui-menu-items-117'
            >
              <img
                className='w-10 h-10 rounded-full'
                src={
                  user.photoURL == null
                    ? '/public/icons/perfil.png'
                    : user.photoURL
                }
              />
            </button>
            <div className='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
              <div
                className='absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
                aria-labelledby='headlessui-menu-button-1'
                id='headlessui-menu-items-117'
                role='menu'
              >
                <div className='px-4 py-3'>
                  {user.displayName !== null ? (
                    <p className='text-sm leading-5'>{user.displayName} </p>
                  ) : (
                    <p className='text-sm leading-5'>Undefined name</p>
                  )}
                  <p className='text-sm font-medium leading-5 text-gray-900  truncate'>
                    {user.email}
                  </p>
                </div>
                <div className='py-1'>
                  <Link
                    to='/account'
                    tabIndex='0'
                    className='text-gray-700 hover:text-blue-600 flex gap-2 w-full px-4 py-2 text-sm leading-5 text-left'
                    role='menuitem'
                  >
                    <img className='w-4' src='/public/svg/account.svg' alt='' />
                    Account
                  </Link>
                  <a
                    href='#'
                    tabIndex='1'
                    className='text-gray-700 hover:text-blue-600 flex gap-2 w-full px-4 py-2 text-sm leading-5 text-left'
                    role='menuitem'
                  >
                    <img className='w-4' src='/public/svg/bell.svg' alt='' />
                    Notifications
                  </a>
                  <hr />
                  <button
                    onClick={() => {
                      handleLogout()
                    }}
                    tabIndex='3'
                    className='text-gray-700 hover:text-blue-600 flex gap-2 w-full px-4 py-2 text-sm leading-5 text-left'
                    role='menuitem'
                  >
                    <img className='w-4' src='/public/svg/exit.svg' alt='' />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
