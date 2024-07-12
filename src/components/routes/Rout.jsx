
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../../pages/home/Home'
import Admin from '../../pages/admin/Admin'
import User from '../../pages/user/User'

const Rout = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/user' element={<User />} />
    </Routes>

    </BrowserRouter>
  )
}

export default Rout
