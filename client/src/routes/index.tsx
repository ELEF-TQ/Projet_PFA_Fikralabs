import { createBrowserRouter } from "react-router-dom";
/*___Authentication_____ */
import LoginPage from '../pages/Auth/login/index'
import SignupPage from '../pages/Auth/signup/index'

/*___Admin_____ */
import Admin from '../pages/Admin/index'
import Panel from "../pages/Admin/Panel";
import GestionPompiste from "../pages/Admin/Pompiste";
import GestionClients from "../pages/Admin/Clients";
import GestionConverstions from "../pages/Admin/Convertion";
import GestionProfile from "../pages/Admin/Profile";


/*___Pompiste_____ */
import Pompiste from "../pages/Pompiste/index";
import HomePompiste from "../pages/Pompiste/Home";
import Reviews from "../pages/Pompiste/Reviews";
import Converstions from "../pages/Admin/Convertion";
import DemandeConvertion from "../pages/Pompiste/DemandeConvertion";
import Formations from "../pages/Pompiste/Formations"
import Quiz from "../pages/Pompiste/Quiz";
import Profile from "../pages/Admin/Profile";

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
        { path: "/admin", element: <Panel/>},
        { path: "/admin/clients", element: <GestionClients/> },
        { path: "/admin/pompistes", element: <GestionPompiste/> },
        { path: "/admin/convertions", element: <GestionConverstions/> },
        { path: "/admin/profile", element: <GestionProfile/> },
      ],
    },

     /*______Pompiste Routes_______*/
     {
      path: "/pompiste",
      element: <Pompiste/>,
      children: [
        { path: "/pompiste", element: <HomePompiste/>},
        { path: "/pompiste/demandeConvertion", element: <DemandeConvertion/> },
        { path: "/pompiste/mesConvertions", element: <Converstions/> },
        { path: "/pompiste/evaluation", element: <Reviews/> },
        { path: "/pompiste/quiz", element: <Quiz/> },
        { path: "/pompiste/formations", element: <Formations/> },
        { path: "/pompiste/profile", element: <Profile/> },


      ],
    },


]);