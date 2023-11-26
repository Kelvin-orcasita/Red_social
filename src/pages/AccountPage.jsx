import { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import ContentHome from "./components/ContentHome.jsx";

export function AccountPage() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [btn, setBtn] = useState("hidden")

    return (
        <>
            <Navbar/>
            {
                <section>
                <article>
                    <div className="flex flex-col justify-center items-center py-20">                       
                       <img className="w-25 h-25 rounded-full" src={currentUser.photoURL==null?"/public/icons/perfilBlack.png": currentUser.photoURL} alt="User" />

                        {
                            currentUser.displayName==null ? 
                            <>
                                <b className="py-2 text-xl">User{currentUser.createdAt}</b>
                                <p>{currentUser.email}</p>
                            </>
                            : 
                            <>
                                <b className="py-2 text-xl">{currentUser.displayName}</b>
                                <p>{currentUser.email}</p>
                            </>
                            
                        }

                        <div className="my-10">
                            <Link className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"  to='/editprofile'>Edit profile</Link>
                        </div>

                        <div className="flex gap-2 mt-10">
                            <button className="py-2 px-6 bg-slate-500 hover:bg-slate-800 text-sm text-white font-bold rounded-xl transition duration-200" type="button" onChange={() => setBtn('')}>Publications</button>
                        </div>

                        <div className={`${btn}`}>
                            <ContentHome/>
                        </div>


                    </div>
                </article>
            </section>
            }
        </>
    )
}