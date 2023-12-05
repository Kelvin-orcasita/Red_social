import { Navbar } from './components/Navbar.jsx'
import { ContentHome } from './components/ContentHome.jsx'

export function HomePage() {
  return (
    <>
      <section>
        <article className='mb-36'>
          <Navbar />
        </article>
      </section>

      <section className='my-10'>
        <article>
          <ContentHome />
        </article>
      </section>
    </>
  )
}
