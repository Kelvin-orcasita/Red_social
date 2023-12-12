import { Navbar } from './components/Navbar.jsx'
import { ContentHome } from './components/ContentHome.jsx'

export function HomePage() {
  return (
    <>
      <section>
        <article>
          <Navbar />
        </article>
      </section>

      <section className='mt-36'>
        <article>
          <ContentHome />
        </article>
      </section>
    </>
  )
}
