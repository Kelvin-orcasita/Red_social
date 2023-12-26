import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar.jsx'
import { Link } from 'react-router-dom'
import ContentMyPublications from './components/ContentMyPublications.jsx'
import { getMyProfile } from '../firebase/perfil/getProfile.js'
import { Loading } from './components/Loading.jsx'

export function AccountPage() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')),
  )
  const [profile, setProfile] = useState([])
  const [publications, setPublications] = useState(false)
  const [favorities, setFavorities] = useState('hidden')

  useEffect(() => {
    getMyProfileSesion()
  }, [])

  async function getMyProfileSesion() {
    const _profile = await getMyProfile()
    setProfile(_profile)
  }

  return (
    <>
      <div className='mb-20'>
        <Navbar />
      </div>
      {profile == '' ? (
        <div className='mt-48 flex items-center justify-center'>
          <Loading />
        </div>
      ) : (
        <section>
          <article>
            <div className='flex flex-col justify-center items-center py-14'>
              <img
                className='w-28 rounded-full'
                src={
                  profile.urlPhoto == null
                    ? '/icons/perfilBlack.png'
                    : profile.urlPhoto
                }
                alt='User'
              />

              <b className='py-2 text-xl'>
                {profile.name == 'Undefined name'
                  ? 'Undefined name'
                  : profile.name}
              </b>

              <p className='px-8'>{profile.info}</p>

              <div className='mt-10'>
                <Link
                  className='py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200'
                  to='/editprofile'
                >
                  Edit profile
                </Link>
              </div>

              <div className='flex gap-2 mt-8'>
                <button
                  className={`${
                    publications && 'bg-slate-800 text-white'
                  } py-2 px-6 border-b-2  hover:bg-slate-800 text-sm text-gray-700 font-bold rounded-xl transition duration-200`}
                  type='button'
                  onClick={() => {
                    setPublications(!publications)
                    setFavorities('hidden')
                  }}
                >
                  Publications
                </button>
              </div>

              {publications == true ? (
                <div>
                  <ContentMyPublications />
                </div>
              ) : (
                <div className='hidden'>
                  <ContentMyPublications />
                </div>
              )}
            </div>
          </article>
        </section>
      )}
    </>
  )
}
