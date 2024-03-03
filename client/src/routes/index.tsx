import { createBrowserRouter } from "react-router-dom";
/*___Authentication_____ */
import LoginPage from '../pages/Auth/login/index'
import SignupPage from '../pages/Auth/signup/index'

/*___Admin_____ */
import Admin from '../pages/Admin/index'
import Panel from "../pages/Admin/Panel";
import GestionPompiste from "../pages/Admin/GestPompiste/Pompiste";
import GestionClients from "../pages/Admin/GestClient/Clients";
import GestionConversions from "../pages/Admin/GestConversion/Conversion";
import GestionProfile from "../pages/Admin/Profile";


/*___Pompiste_____ */
import Pompiste from "../pages/Pompiste/index";
import HomePompiste from "../pages/Pompiste/Home";
import Reviews from "../pages/Pompiste/Reviews";
import Converstions from "../pages/Pompiste/mesConvertion";
import DemandeConvertion from "../pages/Pompiste/DemandeConvertion";
import Formations from "../pages/Pompiste/Formations"
import Quiz from "../pages/Pompiste/Quiz";
import Profile from "../pages/Admin/Profile";
import AddReview from "../pages/public/AddReview";

export const routes = createBrowserRouter([

     /*______Auth Routes_______*/
     {
      path: "/evaluation",
      element :<AddReview/>,
    },
   
    /*______Auth Routes_______*/
    {
      path: "/",
      element :<LoginPage/>,
    },
    {
      path: "/signup",
      element :<SignupPage/>,
    },
  
    /*______Admin Routes_______*/
    {
      path: "/admin",
      element: <Admin/>,
      children: [
        { path: "/admin", element: <Panel/>},
        { path: "/admin/clients", element: <GestionClients/> },
        { path: "/admin/pompistes", element: <GestionPompiste/> },
        { path: "/admin/conversions", element: <GestionConversions/> },
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

      /*______Clients Routes_______*/


]);