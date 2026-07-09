import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { appRoutes } from '../config/site'
import Layout from '../components/Layout'
import CatDetailPage from '../pages/CatDetailPage'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import RegisterCatPage from '../pages/RegisterCatPage'
import RegisterPage from '../pages/RegisterPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appRoutes.home} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={appRoutes.catDetails} element={<CatDetailPage />} />
          <Route path={appRoutes.login} element={<LoginPage />} />
          <Route path={appRoutes.register} element={<RegisterPage />} />
          <Route path={appRoutes.registerCat} element={<RegisterCatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
