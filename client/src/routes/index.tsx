import {  createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../lib/RoleGuards";
/*_____Public___*/
import Home from "../pages/public/Home";
import AddReview from "../pages/public/AddReview";
import NotFound from "../pages/Error/NotFound";

/*___Authentication_____ */
import LoginPage from '../pages/Auth/login/index';
import SignupPage from '../pages/Auth/signup/index';
import RestPasswordPage from '../pages/Auth/resetPassword/index';

/*___Admin_____ */
import Admin from '../pages/Admin/index';
import Panel from "../pages/Admin/Panel";
import GestionPompiste from "../pages/Admin/GestPompiste/Pompiste";
import GestionClients from "../pages/Admin/GestClient/Clients";
import GestionConversions from "../pages/Admin/GestConversion/Conversion";
import GestionProfile from "../pages/Admin/Profile";
import GestCoupons from '../pages/Admin/GestCoupon/Coupon';

/*___Pompiste_____ */
import Pompiste from "../pages/Pompiste/index";
import HomePompiste from "../pages/Pompiste/Home";
import Converstions from "../pages/Pompiste/mesConvertion";
import DemandeConvertion from "../pages/Pompiste/DemandeConvertion";
import Formations from "../pages/Pompiste/Formations";
import Quiz from "../pages/Pompiste/Quiz";
import Profile from "../pages/Pompiste/Profile";

/*___Clients_____ */
import Client from '../pages/Client/index';
import HomeClient from "../pages/Client/Home";
import Coupons from "../pages/Client/mesCoupons";
import MesReviews from "../pages/Client/Reviews";
import MesServices from '../pages/Client/Services';





export const routes = createBrowserRouter([
  /*______Public Routes_______*/
  { path: "/evaluation", element: <AddReview /> },
  { path: "/", element: <Home /> },
  
  /*______Auth Routes_______*/
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/reset", element: <RestPasswordPage /> },

  /*______Admin Routes_______*/
  { 
    path: "/admin",
    element: <ProtectedRoute element={<Admin />} allowedRole="ADMIN" />,   
    children: [
      { path: "", element: <Panel /> }, 
      { path: "clients", element: <GestionClients /> },
      { path: "pompistes", element: <GestionPompiste /> },
      { path: "conversions", element: <GestionConversions /> },
      { path: "profile", element: <GestionProfile /> },
      { path: "coupons", element: <GestCoupons /> },
    ],
  },

  /*______Pompiste Routes_______*/
  { 
    path: "/pompiste",
    element: <ProtectedRoute element={<Pompiste /> }   allowedRole="POMPISTE"/>,
    children: [
      { path: "", element: <HomePompiste /> },
      { path: "demandeConvertion", element: <DemandeConvertion /> },
      { path: "mesConvertions", element: <Converstions /> },
      { path: "quiz", element: <Quiz /> },
      { path: "formations", element: <Formations /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  /*______Clients Routes_______*/
  { 
    path: "/client",
    element: <ProtectedRoute element={<Client />}  allowedRole="CLIENT" />,
    children: [
      { path: "", element: <HomeClient /> }, 
      { path: "coupons", element: <Coupons /> },
      { path: "evaluations", element: <MesReviews />},
      { path: "services", element: <MesServices />},
    ],
  },

  // Wildcard route for "not found" page
  { path: "*", element: <NotFound /> },
]);

