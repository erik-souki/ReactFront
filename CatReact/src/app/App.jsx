import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gatos/:id" element={<CatDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cadastro" element={<RegisterPage />} />
          <Route path="cadastrar-gato" element={<RegisterCatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
