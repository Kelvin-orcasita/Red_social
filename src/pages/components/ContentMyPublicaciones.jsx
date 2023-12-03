import { useEffect, useState } from 'react'
import { getMePublications } from '../../firebase/publications/getMePublications.js'
import { createFavorite } from '../../firebase/favorities/addFavorite.js'
import { removeFavorite } from '../../firebase/favorities/removeFavorite.js'

export function ContentMyPublicaciones() {
  const [publications, setPublications] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

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
          createFavorite(favorite)
        } else {
          removeFavorite(favorite)
        }
      }
      pubs.push(item)
    })
    setPublications(pubs)
  }

  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='container lg:px-6 mx-auto'>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3'>
            {publications.map((publication) => (
              <div
                key={publication.id}
                className='flex flex-col items-start lg:p-2 group bg-gray-100 rounded-xl'
              >
                <div className='flex items-center gap-2 px-2 pb-1 w-full'>
                  {
                    <img
                      id='fhotoProfile'
                      className='w-10 h-10 rounded-full'
                      src={
                        publication.fullUser == null ||
                        publication.fullUser.urlPhoto == null ||
                        publication.fullUser.urlPhoto == ''
                          ? '/public/icons/perfilBlack.png'
                          : publication.fullUser.urlPhoto
                      }
                    />
                  }
                  <label htmlFor='fhotoProfile' className='text-sm px-2'>
                    {publication.fullUser.name == null
                      ? 'Undefined name'
                      : publication.fullUser.name}
                  </label>
                </div>

                <a
                  className='lg:h-full lg:w-full'
                  onDoubleClick={() => {
                    validateFavorite(publication)
                  }}
                >
                  <img
                    className='object-cover lg:h-full lg:w-full'
                    src={publication.img}
                    alt={publication.title}
                  />
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
                        className='w-6 h-6'
                        src={
                          publication.isFavorite
                            ? '/public/svg/like-true.svg'
                            : '/public/svg/like.svg'
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
                        className='w-6 h-6'
                        src='/public/svg/like.svg'
                        alt=''
                      />
                    </Link>
                  )}
                  {/* <a
                  href='#'
                  className='mx-2 text-gray-600 dark:text-gray-300'
                  
                >
                  <img className="w-6 h-6" src="/public/svg/comment.svg" alt="" />
                </a> */}

                  <a href='#' className='mx-2 text-gray-600 dark:text-gray-300'>
                    <img
                      className='w-6 h-6'
                      src='/public/svg/basic-sent.svg'
                      alt=''
                    />
                  </a>
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
          <br />
        </div>
      </section>
    </>
  )
}

export default ContentMyPublicaciones
