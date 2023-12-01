import { useState } from 'react'
import { Navbar } from './components/Navbar.jsx'
import { Link } from 'react-router-dom'
import ContentHome from './components/ContentHome.jsx'
import ContentFavorities from './components/ContentFavorities.jsx'
import ContentMyPublicaciones from './components/ContentMyPublicaciones.jsx'

export function AccountPage() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')),
  )
  const [publications, setPublications] = useState('hidden')
  const [favorities, setFavorities] = useState('hidden')

  return (
    <>
      <Navbar />
      {
        <section>
          <article>
            <div className='flex flex-col justify-center items-center py-20'>
              <img
                className='w-25 h-25 rounded-full'
                src={
                  currentUser.photoURL == null
                    ? '/public/icons/perfilBlack.png'
                    : currentUser.photoURL
                }
                alt='User'
              />

              {currentUser.displayName == null ? (
                <>
                  <b className='py-2 text-xl'>Undefined name</b>
                  <p>{currentUser.email}</p>
                </>
              ) : (
                <>
                  <b className='py-2 text-xl'>{currentUser.displayName}</b>
                  <p>{currentUser.email}</p>
                </>
              )}

              <div className='my-10'>
                <Link
                  className='py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200'
                  to='/editprofile'
                >
                  Edit profile
                </Link>
              </div>

              <div className='flex gap-2 mt-10'>
                <button
                  className='py-2 px-6 bg-slate-500 hover:bg-slate-800 text-sm text-white font-bold rounded-xl transition duration-200'
                  type='button'
                  onClick={() => {
                    setPublications('')
                    setFavorities('hidden')
                  }}
                >
                  Publications
                </button>

                <button
                  className='py-2 px-6 bg-slate-500 hover:bg-slate-800 text-sm text-white font-bold rounded-xl transition duration-200'
                  type='button'
                  onClick={() => {
                    setFavorities('')
                    setPublications('hidden')
                  }}
                >
                  Favorities
                </button>
              </div>

              <div className={`${publications}`}>
                <b className='block text-gray-700 text-2xl text-center font-bold my-6'>
                  Publications
                </b>
                <ContentMyPublicaciones />
              </div>

              <div className={`${favorities}`}>
                <b className='block text-gray-700 text-2xl text-center font-bold my-6'>
                  Favorities
                </b>
                <ContentFavorities />
              </div>
            </div>
          </article>
        </section>
      }
    </>
  )
}
