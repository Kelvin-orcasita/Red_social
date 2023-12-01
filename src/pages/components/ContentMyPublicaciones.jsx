import { useEffect, useState } from "react"
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from "../../firebase/publications/createPublication.js"
import { getMePublications } from "../../firebase/publications/getMePublications.js";

export function ContentMyPublicaciones() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [mysPublicacion, setPublicacion] = useState([]);

  useEffect(() => {
      getMysPublication()
  }, [])
  
  const getMysPublication = async () => {
    const result = await getMePublications()
    setPublicacion(result)
  }
  

  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='container lg:px-6 mx-auto'>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3'>
          {mysPublicacion.map((publication) => (
            <div key={publication.id} className='flex flex-col items-start lg:p-2 group bg-gray-100 rounded-xl'>
              <div className='flex items-center gap-2 px-2 pb-1 w-full'>
                {
                  <img id="fhotoProfile"
                    className='w-10 h-10 rounded-full'
                    src={
                      user == null
                        ? '/public/icons/perfilBlack.png'
                        : user.photoURL
                    }
                  />
                }
                <label htmlFor="fhotoProfile" className="text-sm px-2">{user == null ? 'Usuario no definido' : user.displayName}</label>
              </div>
              <img
                className='object-cover h-full w-full'
                src={publication.img}
              />
              <div className='flex mt-3 px-2 gap-2'>
                <a
                  href='#'
                  className='mx-2 text-gray-600 dark:text-gray-300'
                  aria-label='Reddit'
                >
                  <img className="w-6 h-6" src="/public/svg/like.svg" alt="" />
                </a>

                <a
                  href='#'
                  className='mx-2 text-gray-600 dark:text-gray-300'
                  aria-label='Github'
                >
                  <img className="w-6 h-6" src="/public/svg/comment.svg" alt="" />
                </a>

                <a
                  href='#'
                  className='mx-2 text-gray-600 dark:text-gray-300'
                  aria-label='Github'
                >
                  <img className="w-6 h-6" src="/public/svg/basic-sent.svg" alt="" />
                </a>
              </div>
              <div className="flex flex-col justify-center px-2 w-full border">
                <h1 className='mt-4 text-center text-xl font-semibold text-gray-700 '>
                  {publication.title}
                </h1>
                <p className='mt-2 text-gray-500 px-2 text-left text-sm  text-ellipsis'>{publication.description}</p>
              </div>  
              <br />
            </div>

          ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ContentMyPublicaciones
