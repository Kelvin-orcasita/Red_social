import { useRef, useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { useNavigate, Link } from "react-router-dom";

export function CreatePost() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [file, setFile] = useState(null);

    function handleSubmit() {
        console.log("editar");
    }

    return (
        <>
            <Navbar />
            {
                <section>
                    <article>
                        <div className='lg:flex justify-center h-screen items-center bg-slate-200'>
                            <div className='w-full max-w-2xl'>

                                <form className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
                                    <b className='block text-gray-700 text-2xl text-center font-bold mb-6'>Create Post</b>
                                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center Lg:w-full lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="hidden lg:inline-block absolute flex-col items-center justify-center pt-5 pb-6">
                                                    {
                                                        file==null &&
                                                        <>
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG(MAX. 800x400px)</p>
                                                        </>
                                                        
                                                    }
                                                </div>
                                                { file ? <img className="h-full w-full" src={URL.createObjectURL(file)} /> : null }
                                                <input id="dropzone-file" name="myImg" type="file" accept="image/png,image/jpeg,image/jpg" className="lg:hidden w-auto" />

                                                <input id="dropzone-file" name="myImg" type="file" accept="image/png,image/jpeg,image/jpg" className="hidden lg:inline-block relative h-full w-full" onChange={(e) => setFile(e.target.files[0])} />
                                            </label>
                                        </div>

                                        <div className="flex flex-col justify-center">
                                            <div className='mb-4'>
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="username"
                                                >Qualification
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    name="username"
                                                    type="text"
                                                    placeholder="Titulo"
                                                    disabled={!file && true}
                                                    
                                                />
                                            </div>

                                            <div className="flex flex-col mb-6">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={!file && true} placeholder="Write your information here..."></textarea>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex items-center justify-end mt-6">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
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