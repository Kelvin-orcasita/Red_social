import { useRef, useState } from 'react'
import { Navbar } from './components/Navbar.jsx'
import { createPublication } from '../firebase/publications/createPublication.js'
import { useNavigate, Link } from 'react-router-dom'

export function CreatePost() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const form = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()
    if(file.name ==null){
    return setError('You must post an image')}
    if(file.size < 1048487){
      let base64 = await toBase64(file)
      const result = await createPublication({
        user: user.email,
        img:base64,
        title: form.current.title.value,
        description: form.current.description.value,
        date: new Date()
      })
        if (result==null) {
          return setError('Error in publication')
        }else{
          navigate('/')
        }
    }else{
      return setError('The image must not exceed 1048487 bytes.')
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  return (
    <>
      <Navbar />
      {
        <section>
          <article>
            <div className='lg:flex justify-center h-screen items-center bg-slate-200'>
              <div className='w-full max-w-2xl'>
                <form className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4' ref={form}
                onSubmit={handleSubmit}>
                  <b className='block text-gray-700 text-2xl text-center font-bold mb-6'>
                    Create Post
                  </b>
                  <div className='grid grid-cols-1 gap-8 xl:grid-cols-2'>
                    <div className='flex items-center justify-center w-full'>
                      <label
                        htmlFor='dropzone-file'
                        className='flex flex-col items-center justify-center Lg:w-full lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                      >
                        <div className='hidden lg:inline-block absolute flex-col items-center justify-center pt-5 pb-6'>
                          {file == null && (
                            <>
                              <svg
                                className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 16'
                              >
                                <path
                                  stroke='currentColor'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                />
                              </svg>
                              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                <span className='font-semibold'>
                                  Click to upload
                                </span>{' '}
                                or drag and drop
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-400'>
                                PNG, JPG or JPEG(MAX. 800x400px)
                              </p>
                            </>
                          )}
                        </div>
                        {file ? (
                          <img
                            className='h-full w-full'
                            src={URL.createObjectURL(file)}
                          />
                        ) : null}
                        <input
                          id='dropzone-file'
                          name='myImg'
                          type='file'
                          accept='image/png,image/jpeg,image/jpg'
                          className='lg:hidden w-auto'
                        />

                        <input
                          id='dropzone-file'
                          name='myImg'
                          type='file'
                          accept='image/png,image/jpeg,image/jpg'
                          className='hidden lg:inline-block relative h-full w-full'
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </label>
                    </div>

                    <div className='flex flex-col justify-center'>
                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='username'
                        >
                          Title
                        </label>
                        <input
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          name='title'
                          type='text'
                          placeholder='Titulo'
                          disabled={!file && true}
                        />
                      </div>

                      <div className='flex flex-col mb-6'>
                        <label
                          htmlFor='message'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Description
                        </label>
                        <textarea
                          id='message'
                          rows='4'
                          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          name='description'
                          disabled={!file && true}
                          placeholder='Write your information here...'
                        ></textarea>
                      </div>
                      {
                        error!=='' &&
                      
                      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong class="font-bold">Alert! </strong>
                      <span class="block sm:inline">{error}</span>
                      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                      </span>
                    </div>
}
                    </div>
                    
                  </div>
                  <div className='flex items-center justify-end mt-6'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      type='submit'
                      disabled={!file && true}
                      onClick={handleSubmit}
                    >
                      Post
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
