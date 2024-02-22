import { createBrowserRouter } from "react-router-dom";
import LoginPage from '../pages/Auth/login/index'

export const routes = createBrowserRouter([
 
    {
        path: "/",
        element :< LoginPage/>,

      },
    

]);