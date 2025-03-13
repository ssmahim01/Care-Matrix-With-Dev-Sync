import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import Router from './routes/Router';
import { Provider } from "react-redux";
import { store } from './redux/store';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Router />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
