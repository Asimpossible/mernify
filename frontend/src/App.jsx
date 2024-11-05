import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from "./layout";
import { Details, Home, Login, Profile, Register, UpdateProfile } from './pages';

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Details />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/me/profile' element={<Profile />} />
          <Route path='/me/update_profile' element={<UpdateProfile />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
