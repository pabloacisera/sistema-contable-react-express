
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DashboardUser from './pages/dashboard-user/Dashboard-user'
import DashboardAdmin from './pages/dashboard-admin/Dashboard-admin'

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />
      <Route path='/dash-user-page' element={<DashboardUser />} />
      <Route path='/dash-admin-page' element={<DashboardAdmin />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
