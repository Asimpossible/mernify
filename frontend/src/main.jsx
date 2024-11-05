import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <Router>
    <Toaster position='top-center' />

    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
