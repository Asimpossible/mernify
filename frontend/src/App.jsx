import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from "./layout";
import { Details, Home, Login } from './pages';

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Details />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
