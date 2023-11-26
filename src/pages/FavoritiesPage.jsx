import { Navbar } from "./components/Navbar.jsx";
import ContentHome from "./components/ContentHome.jsx";

export function FavoritiesPage() {
    
  return (
        <>
            <Navbar/>
            <div className="flex flex-col justify-center items-center pt-20">
            <b className='block text-gray-700 text-2xl text-center font-bold'>Favorities</b>
            </div>
            <section>
                <article>
                    <ContentHome/>
                </article>
         </section>
        </>
    )
}