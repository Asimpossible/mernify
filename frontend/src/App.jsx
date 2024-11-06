import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from "./layout";
import { Details, Home, Login, Profile, Register, UpdateProfile } from './pages';
import { ProtectedRoute } from './component';

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

          <Route path='/me/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path='/me/update_profile' element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
