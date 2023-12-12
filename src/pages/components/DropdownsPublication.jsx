import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyProfile } from '../../firebase/perfil/getProfile'
import { deletePublication } from '../../firebase/publications/deletePublication'
import { getPublications } from '../../firebase/publications/getPublication'

export function DropdownsPublication(idPublication) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [publications, setPublications] = useState([])


  useEffect(() => {
    getMyPublications()
  }, [])

  async function getMyPublications() {
    const _publications = await getPublications()
    setPublications(_publications)
  }

  function handleDeletePublication(id) {
    publications.forEach((item) => {
      if (item.id === id) {
        const confirmar = confirm('The post will be deleted')
        if (!confirmar) {
          return
        }
        deletePublication({
          id: id,
          email: item.user,
        })
      }
    })
  }

  return (
    <>
      <div className='flex items-center justify-center '>
        <div className='inline-block text-left  dropdown'>
          <button
            className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150'
            type='button'
            aria-haspopup='true'
            aria-expanded='true'
            aria-controls='headlessui-menu-items-117'
          >
            <img
              className='w-6 h-6 rounded-full'
              src={`/svg/options.svg`}
            />
          </button>

          <div className='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
            <div
              className='absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
              aria-labelledby='headlessui-menu-button-1'
              id='headlessui-menu-items-117'
              role='menu'
            >
              <div className='py-1'>
                <button
                  onClick={() => handleDeletePublication(idPublication.id)}
                  tabIndex='0'
                  className='text-gray-700 hover:text-red-700 flex gap-2 w-full px-4 py-2 text-sm leading-5 text-left'
                  role='menuitem'
                >
                  <img
                    className='w-4'
                    src={`/svg/close.svg`}
                    alt='close'
                  />
                  Delete publication
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
