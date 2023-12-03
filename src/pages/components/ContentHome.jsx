import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getPublications } from '../../firebase/publications/getPublication'
import { createFavorite } from '../../firebase/favorities/addFavorite'
import { removeFavorite } from '../../firebase/favorities/removeFavorite'
import { DropdownsPublication } from './DropdownsPublication'

export function ContentHome() {
  const [publications, setPublications] = useState([])
  let user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

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
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2'>
            {publications.map((publication) => (
              <div
                key={publication.id}
                className='flex flex-col items-start lg:p-2 group bg-gray-100 rounded-xl'
              >
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
                            ? '/public/icons/perfilBlack.png'
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
                    <div className='flex justify-end gap-10 items-center'>
                      {publication.user == user.email ? (
                        <DropdownsPublication id={publication.id} />
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <div className='flex justify-end gap-10 items-center'>
                      <Link to='/login'>
                        <DropdownsPublication />
                      </Link>
                    </div>
                  )}
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
                        className='w-6 h-6 hover:cursor-pointer'
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
                        className='w-6 h-6 hover:cursor-pointer'
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

export default ContentHome
