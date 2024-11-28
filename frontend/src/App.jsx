import './App.css';
import { Routes } from 'react-router-dom';
import { Footer, Header } from "./layout";
import useUserRoutes from './pages/Routes/UserRoutes'
import useAdminRoutes from './pages/Routes/AdminRoutes'

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
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
