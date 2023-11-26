import { Navbar } from "./components/Navbar.jsx";
import { ContentHome } from "./components/ContentHome.jsx";
import { SearchHome } from "./components/SearchHome.jsx";

export function HomePage() {

  return (
    <>
      <section>
        <article>
          <Navbar />
        </article>
      </section>

      <section className="mt-44">
          <article>
            <SearchHome/>
          </article>
          
          <article>
            <ContentHome/>
          </article>
        </section>
    </>
  )
}
