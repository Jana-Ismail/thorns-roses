import { Route, Routes } from 'react-router-dom'
import { ApplicationViews } from '../views/ApplicationViews'
import './App.css'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { Authorized } from '../views/Authorized'

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } />
    </Routes>
  )
}
