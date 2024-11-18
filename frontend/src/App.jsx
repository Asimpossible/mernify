import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from "./layout";
import { Details, ForgotPassword, Home, Login, Profile, Register, ResetPassword, UpdatePassword, UpdateProfile, UploadAvatar } from './pages';
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
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />

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

          <Route path='/me/upload_avatar' element={
            <ProtectedRoute>
              <UploadAvatar />
            </ProtectedRoute>
          } />

          <Route path='/me/update_password' element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
