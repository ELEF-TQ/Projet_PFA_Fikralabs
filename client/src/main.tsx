import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from './providers/StoreProvider'; 
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes'; 

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={routes}  >
      </RouterProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
