import { useEffect, useRef, useState } from 'react'
import { Navbar } from './components/Navbar.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { editprofileUser } from '../firebase/perfil/editProfile.js'
import { getMyProfile } from '../firebase/perfil/getProfile.js'

export function EditProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [file, setFile] = useState(null)
  const [profile, setProfile] = useState([])
  const [imgProfile, setImgProfile] = useState(null)
  const form = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    getMyProfileSesion()
  }, [])

  async function getMyProfileSesion() {
    const _profile = await getMyProfile()
    setProfile(_profile)
    setImgProfile(_profile.urlPhoto)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    let img = imgProfile
    if (file !== null) {
      let base64 = await toBase64(file)
      img = base64
      setImgProfile(base64)
    }
    const result = await editprofileUser({
      name: form.current.username.value,
      info: form.current.info.value,
      urlPhoto: img,
    })
    if (result == null) {
      return alert('Error in edit profile.')
    } else {
      navigate('/account')
    }
  }

  // console.log({profile:profile});

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
    })

  return (
    <>
      <div className='mb-20'>
        <Navbar />
      </div>
      {
        <section>
          <article>
            <div className='flex justify-center h-screen items-center bg-slate-200'>
              <div className='w-full sm:max-w-sm lg:max-w-md'>
                <form
                  className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'
                  ref={form}
                  onSubmit={handleSubmit}
                >
                  <b className='block text-gray-700 text-2xl text-center font-bold mb-6'>
                    Edit Profile
                  </b>
                  <p className='block text-gray-700 text-sm text-left mb-6'>
                    Keep your personal data private. Any user who can view your
                    profile can see the information you add here.
                  </p>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Fhoto
                  </label>

                  <div className='mb-4 flex gap-2'>
                    {file ? (
                      <img
                        className='w-10 h-10 rounded-full'
                        src={URL.createObjectURL(file)}
                      />
                    ) : (
                      <img
                        className='w-10 h-10 rounded-full'
                        src={
                          profile.urlPhoto == null
                            ? '/public/icons/perfilBlack.png'
                            : profile.urlPhoto
                        }
                      />
                    )}

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type='file'
                      accept='image/png,image/jpeg,image/jpg'
                      onChange={(event) => setFile(event.target.files[0])}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='username'
                    >
                      Full name
                    </label>
                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      name='username'
                      type='text'
                      defaultValue={
                        profile.name !== 'Undefined name'
                          ? profile.name
                          : 'Undefined name'
                      }
                      placeholder='Username'
                    />
                  </div>

                  <div className='mb-6'>
                    <label
                      htmlFor='message'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Info
                    </label>
                    <textarea
                      id='message'
                      rows='4'
                      name='info'
                      defaultValue={profile.info}
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Write your thoughts here...'
                    ></textarea>
                  </div>
                  <div className='flex items-center justify-between'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      type='submit'
                    >
                      Update profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </article>
        </section>
      }
    </>
  )
}
