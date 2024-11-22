import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from "./layout";
import { Cart, ConfirmOrder, Details, ForgotPassword, Home, Login, PaymentMethod, Profile, Register, ResetPassword, Shipping, UpdatePassword, UpdateProfile, UploadAvatar } from './pages';
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

          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
          <Route path='/confirm_order' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
          <Route path='/payment_method' element={
            <ProtectedRoute>
              <PaymentMethod />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
