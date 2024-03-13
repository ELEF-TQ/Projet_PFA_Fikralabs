import { createBrowserRouter } from "react-router-dom";
/*_____Public___*/
import Home from "../pages/public/Home";
import AddReview from "../pages/public/AddReview";

/*___Authentication_____ */
import LoginPage from '../pages/Auth/login/index'
import SignupPage from '../pages/Auth/signup/index'
import RestPasswordPage from '../pages/Auth/resetPassword/index'
/*___Admin_____ */
import Admin from '../pages/Admin/index'
import Panel from "../pages/Admin/Panel";
import GestionPompiste from "../pages/Admin/GestPompiste/Pompiste";
import GestionClients from "../pages/Admin/GestClient/Clients";
import GestionConversions from "../pages/Admin/GestConversion/Conversion";
import GestionProfile from "../pages/Admin/Profile";
import GestCoupons from '../pages/Admin/GestCoupon/Coupon'

/*___Pompiste_____ */
import Pompiste from "../pages/Pompiste/index";
import HomePompiste from "../pages/Pompiste/Home";
import Converstions from "../pages/Pompiste/mesConvertion";
import DemandeConvertion from "../pages/Pompiste/DemandeConvertion";
import Formations from "../pages/Pompiste/Formations"
import Quiz from "../pages/Pompiste/Quiz";
import Profile from "../pages/Pompiste/Profile";

/*___Clients_____ */
import Client from '../pages/Client/index'
import HomeClient from "../pages/Client/Home";
import Coupons from "../pages/Client/mesCoupons";

export const routes = createBrowserRouter([

     /*______Public Routes_______*/
    {
      path: "/evaluation",
      element :<AddReview/>,
    },
    {
      path: "/",
      element :<Home/>,
    },
   
    /*______Auth Routes_______*/
    {
      path: "/login",
      element :<LoginPage/>,
    },
    {
      path: "/signup",
      element :<SignupPage/>,
    },
    {
      path: "/reset",
      element :<RestPasswordPage/>,
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
        { path: "/admin/coupons", element: <GestCoupons/> },
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
        { path: "/pompiste/quiz", element: <Quiz/> },
        { path: "/pompiste/formations", element: <Formations/> },
        { path: "/pompiste/profile", element: <Profile/> },
      ],
    },

      /*______Clients Routes_______*/
      {
        path: "/client",
        element: <Client/>,
        children: [
          { path: "/client", element: <HomeClient/>},
          { path: "/client/coupons", element: <Coupons/>},
        ],
      },


]);