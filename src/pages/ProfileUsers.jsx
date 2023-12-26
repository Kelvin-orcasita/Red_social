import { useEffect, useState } from 'react'

export default function ProfileUsersPage({ users }) {
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    setShowModal(true)
  }, [users])

  return (
    <>
      {showModal && (
        <div
          className={`justify-center items-center bg flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
        >
          <div className='relative w-auto  mx-auto max-w-3xl'>
            {/*content*/}
            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              {/*header*/}
              <div className='flex items-start justify-center pe-4 border-b border-solid border-blueGray-200 rounded-t'>
                <button
                  className='p-1 ml-auto  border-0 text-red-500  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setShowModal(false)}
                >
                  x
                </button>
              </div>
              {/*body*/}
              <div className='relative p-6 flex-col justify-center items-center flex'>
                <img
                  className='w-28 rounded-full'
                  src={users == null ? '' : users.urlPhoto}
                  alt='User'
                />
                <b className='py-2 text-black text-xl'>
                  {users == null ? '' : users.name}
                </b>
                <p className='my-2 text-blueGray-500 text-lg leading-relaxed'>
                  {users == null ? '' : users.info}
                </p>
              </div>
              {/*footer*/}
              <div className='flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b'>
                <button
                  className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
