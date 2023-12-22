import { useEffect, useState } from 'react'
import { getMePublications } from '../../firebase/publications/getMePublications.js'
import { createFavorite } from '../../firebase/favorities/addFavorite.js'
import { removeFavorite } from '../../firebase/favorities/removeFavorite.js'
import { DropdownsPublication } from './DropdownsPublication.jsx'

export function ContentMyPublicaciones() {
  const [publications, setPublications] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    getMysPublication()
  }, [])

  async function getMysPublication() {
    const result = await getMePublications()
    setPublications(result)
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
          handleLike()
          createFavorite(favorite)
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

  return (
    <>
      <section>
        <div className='container lg:px-6 mx-auto'>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2'>
            {publications.map((publication) => (
              <div
                key={publication.id}
                className='flex flex-col items-start lg:p-2 group'
              >
                <div className='bg-gray-100 rounded-xl md:p-2'>
                  <div className='flex items-center px-1 pb-1 w-full'>
                    <div className='flex justify-normal items-center w-full'>
                      {
                        <img
                          id='fhotoProfile'
                          className='w-10 h-10 rounded-full'
                          src={
                            publication.fullUser == null ||
                            publication.fullUser.urlPhoto == null ||
                            publication.fullUser.urlPhoto == ''
                              ? '/icons/perfilBlack.png'
                              : publication.fullUser.urlPhoto
                          }
                        />
                      }
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
                          <DropdownsPublication />
                        </Link>
                      </div>
                    )}
                  </div>

                  <a
                    className='flex items-center justify-center'
                    onDoubleClick={() => {
                      validateFavorite(publication)
                    }}
                  >
                    <img
                      className='object-cover'
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
                          alt='like'
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
              </div>
            ))}
          </div>
          <br />
        </div>
      </section>
    </>
  )
}

export default ContentMyPublicaciones
