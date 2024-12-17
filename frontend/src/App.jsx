import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from "./layout";
import useUserRoutes from './pages/Routes/UserRoutes'
import useAdminRoutes from './pages/Routes/AdminRoutes'
import { NotFound } from './pages';

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {userRoutes}
          {adminRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
