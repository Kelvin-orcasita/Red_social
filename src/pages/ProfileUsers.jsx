import { useEffect, useState } from 'react'

export default function ProfileUsersPage(users) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [showModal, setShowModal] = useState(true)
  const [profile, setProfile] = useState(users.users)

  console.log(showModal)

  if (users !== null || users !== '') {
    setShowModal(true)
  }

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <button
                    className='p-1 ml-auto  border-0 text-red-500  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-col justify-center items-center flex'>
                  {/* <img
                      className='w-28 rounded-full'
                      src={users==null ? '' : users.users.fullUser.urlPhoto}
                      alt='User'
                    /> */}
                  <b className='py-2 text-black text-xl'>
                    {/* {users.user==null ? '' : users.user} */}
                  </b>
                  <p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nostrum, facilis. Aperiam dignissimos ratione harum
                    molestias quod itaque sed consectetur sunt.
                  </p>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
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
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}

      {/* <section>
          <article>
            <div className='flex flex-col justify-center items-center py-20'>
              <img
                className='w-28 rounded-full'
                src={
                  users.fullUser.img == null
                    ? '/icons/perfilBlack.png'
                    : users.fullUser.img
                }
                alt='User'
              />

              <b className='py-2 text-xl'>
                {users.fullUser.name == 'Undefined name'
                  ? 'Undefined name'
                  : users.fullUser.name}
              </b>

              <p className='px-8'>{users.info}</p>
            </div>
          </article>
        </section> */}
    </>
  )
}
