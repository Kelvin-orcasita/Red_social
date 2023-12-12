import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { AccountPage } from './pages/AccountPage'
import { CreatePost } from './pages/CreatePost'
import { EditProfile } from './pages/EditProfile'
import { useEffect } from 'react'
import { SearchHome } from './pages/components/SearchHome'
import ContentHome from './pages/components/ContentHome'

function App() {
  let location = useLocation()
  let navigate = useNavigate()

  let routestAuth = ['/login', '/register']
  let routesNotAuth = [
    '/account',
    '/editprofile',
    '/createpost',
    '/editprofile',
  ]

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (
      routestAuth.find((p) => p == location.pathname) != null &&
      user !== null &&
      user !== undefined
    ) {
      navigate('/')
    }

    if (
      routesNotAuth.find((p) => p == location.pathname) != null &&
      user == null &&
      user == undefined
    ) {
      navigate('/')
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path='/' element={<ContentHome />} />
      <Route path='/home' element={<ContentHome />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='/editprofile' element={<EditProfile />} />
      <Route path='/createpost' element={<CreatePost />} />
      <Route path='/search' element={<SearchHome />} />
    </Routes>
  )
}

export default App
