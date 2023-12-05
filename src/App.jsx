import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { AccountPage } from './pages/AccountPage'
import { CreatePost } from './pages/CreatePost'
import { EditProfile } from './pages/EditProfile'

import { useEffect } from 'react'
import { SearchHome } from './pages/components/SearchHome'

function App() {
  let location = useLocation()
  let navigate = useNavigate()

  let routesNotAuth = ['/login', '/register']
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (
      routesNotAuth.find((p) => p == location.pathname) != null &&
      user !== null &&
      user !== undefined
    ) {
      navigate('/')
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/home' element={<HomePage />} />
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
