import React from 'react';
import ReactDOM from 'react-dom/client';
import StoreProvider from './providers/StoreProvider'; 
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes'; 
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={routes}  >
      </RouterProvider>
    </StoreProvider>
  </React.StrictMode>
);