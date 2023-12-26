import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { searchPublication } from '../../firebase/publications/searchPublication'
import { Navbar } from './Navbar.jsx'
import { createFavorite } from '../../firebase/favorities/addFavorite.js'
import { removeFavorite } from '../../firebase/favorities/removeFavorite.js'
import { DropdownsPublication } from './DropdownsPublication.jsx'
import { getPublications } from '../../firebase/publications/getPublication.js'
import ProfileUsersPage from '../ProfileUsers.jsx'

export function SearchHome() {
  const form = useRef(null)
  const [search, setSearch] = useState(null)
  const [publications, setPublications] = useState([])
  const [profile, setProfile] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  async function hangleSearch(event) {
    event.preventDefault()
    const result = await searchPublication({
      search: form.current.search.value,
    })

    if (result !== null) {
      setSearch(result)
      form.current.reset()
    }
  }

  useEffect(() => {
    getPublicationsAll()
  }, [])

  async function getPublicationsAll() {
    const _publications = await getPublications()
    setPublications(_publications)
  }

  function validateFavorite(publication) {
    let pubs = []
    publications.forEach((item) => {
      if (item.id === publication.id) {
        item.isFavorite = !item.isFavorite
        let favorite = {
          idPublication: publication.id,
          emailUser: user.email,
        }
        if (item.isFavorite) {
          createFavorite(favorite)
          handleLike()
        } else {
          removeFavorite(favorite)
        }
      }
      pubs.push(item)
    })
    setPublications(pubs)
  }

  const handleLike = () => {
    setLiked(true)
    setTimeout(() => {
      setLiked(false)
    }, 1000)
  }

  function handleProfileUsers(user) {
    setProfile(user)
  }

  return (
    <>
      <div className='mb-32'>
        <Navbar />
      </div>

      <form ref={form} onSubmit={hangleSearch} className='mt-10'>
        <div className=' mx-6 lg:mx-20 '>
          <div className='flex items-center  bg-gray-50 border border-gray-300 rounded-lg'>
            <img
              className='w-6 ms-4'
              src='/public/svg/searchBlack.svg'
              alt=''
            />
            <input
              type='search'
              name='search'
              id='default-search'
              className='block w-full p-4 ps-10 text-sm text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search by title'
              required
            />
            <button
              type='submit'
              className='text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-e-lg text-sm px-4 py-4 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {search == null || search == '' || search == undefined ? (
        <div className='flex justify-center items-center mt-10'>
          <h1>No data found</h1>
        </div>
      ) : (
        <section>
          <article className='grid grid-cols-1 gap-8 mt-8 lg:mx-10'>
            {profile !== '' && <ProfileUsersPage users={profile} />}
            <div className='lg:flex justify-center items-center'>
              <div className='w-full max-w-2xl '>
                <b className='block text-gray-700 text-2xl text-center font-bold mb-6'>
                  {search == null && ''}
                </b>
                <div className='grid grid-cols-1 gap-8 xl:grid-cols-1'>
                  {search.map((publication) => (
                    <div
                      key={publication.id}
                      className='flex flex-col items-start lg:p-2 group bg-gray-100 rounded-xl'
                    >
                      <div className='flex items-center px-1 pb-1 w-full'>
                        <div className='flex justify-normal items-center w-full'>
                          {user !== null ? (
                            <button
                              onClick={() => {
                                user.email == publication.user
                                  ? navigate('/account')
                                  : handleProfileUsers(publication.fullUser)
                              }}
                            >
                              <img
                                id='fhotoProfile'
                                className='w-10 h-10 rounded-full'
                                src={
                                  publication.fullUser == null ||
                                  publication.fullUser.urlPhoto == null ||
                                  publication.fullUser.urlPhoto == ''
                                    ? `/icons/perfilBlack.png`
                                    : publication.fullUser.urlPhoto
                                }
                              />
                            </button>
                          ) : (
                            <img
                              id='fhotoProfile'
                              className='w-10 h-10 rounded-full'
                              src={
                                publication.fullUser == null ||
                                publication.fullUser.urlPhoto == null ||
                                publication.fullUser.urlPhoto == ''
                                  ? `/icons/perfilBlack.png`
                                  : publication.fullUser.urlPhoto
                              }
                            />
                          )}
                          <label
                            htmlFor='fhotoProfile'
                            className='flex justify-start text-sm px-2'
                          >
                            {publication.fullUser.name == null
                              ? 'Undefined name'
                              : publication.fullUser.name}
                          </label>
                        </div>
                        {user !== null ? (
                          <div className='flex justify-end items-center'>
                            {publication.user == user.email ? (
                              <DropdownsPublication id={publication.id} />
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : (
                          <div className='flex justify-end items-center'>
                            <Link to='/login'>
                              <img
                                className='w-6 h-6 rounded-full'
                                src='/svg/options.svg'
                              />
                            </Link>
                          </div>
                        )}
                      </div>

                      <a
                        className='flex items-center justify-center lg:h-full lg:w-full'
                        onDoubleClick={() => {
                          validateFavorite(publication)
                        }}
                      >
                        <img
                          className='object-cover lg:h-full lg:w-full'
                          src={publication.img}
                          alt={publication.title}
                        />
                        {liked && (
                          <div className='absolute h-full w-full flex items-center justify-center'>
                            <img
                              className='w-28'
                              src='/svg/like-true.svg'
                              alt='like'
                            />
                          </div>
                        )}
                      </a>
                      <div className='flex mt-3 px-2 gap-2'>
                        {user !== null ? (
                          <a
                            onClick={() => {
                              validateFavorite(publication)
                            }}
                            className='mx-2 text-gray-600 dark:text-gray-300'
                          >
                            <img
                              className='w-6 h-6 hover:cursor-pointer'
                              src={
                                publication.isFavorite
                                  ? '/svg/like-true.svg'
                                  : '/svg/like.svg'
                              }
                              alt=''
                            />
                          </a>
                        ) : (
                          <Link
                            to='/login'
                            className='mx-2 text-gray-600 dark:text-gray-300'
                          >
                            <img
                              className='w-6 h-6 hover:cursor-pointer'
                              src='/svg/like.svg'
                              alt=''
                            />
                          </Link>
                        )}
                      </div>
                      <div className='flex flex-col justify-center px-2 w-full'>
                        <h1 className='mt-4 text-left text-xl font-semibold text-gray-700 '>
                          {publication.title}
                        </h1>
                        <p className='mt-2 text-gray-500 px-2 text-left text-sm  text-ellipsis'>
                          {publication.description}
                        </p>
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  )
}
