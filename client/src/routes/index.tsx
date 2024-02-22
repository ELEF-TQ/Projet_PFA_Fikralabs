import { createBrowserRouter } from "react-router-dom";
/*___Authentication_____ */
import LoginPage from '../pages/Auth/login/index'
import SignupPage from '../pages/Auth/signup/index'

/*___Admin_____ */
import Admin from '../pages/Admin/index'
import Pompiste from "../pages/Admin/Pompiste";
import Panel from "../pages/Admin/Panel";


export const routes = createBrowserRouter([
 
    {
      path: "/",
      element :< LoginPage/>,
    },
    {
      path: "/signup",
      element :< SignupPage/>,
    },
    
    /*______Admin Routes_______*/
{
  path: "/admin",
  element: <Admin/>,
  children: [
    { path: "users", element: <Pompiste/> },
    { path: "panel", element: <Panel/>}
   
  ],
},


]);