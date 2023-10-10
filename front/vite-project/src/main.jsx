import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useParams} from "react-router-dom";
import './index.css'
import Contador from './components/contador.jsx';
import Formulario from './components/formulario.jsx';




const router = createBrowserRouter([
  {
    path: "/home",
    element: <Contador/>
  },
  {
    path: "/",
    element: <Formulario/>
  },

  

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router} />
  </React.StrictMode>,
)