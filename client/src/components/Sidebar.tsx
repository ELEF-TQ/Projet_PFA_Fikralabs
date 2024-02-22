
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useContext } from "react";
import { SidebarContext } from "../providers/SidebarProvider";
import defaultUser from '../assets/images/defaultUser.png'
import { Link, useLocation } from "react-router-dom";


/*__Sidebar Items___*/
import { AdminItems } from "../routes/dash-routes";
import { ClientItems } from "../routes/dash-routes";
import { PompisteItems } from "../routes/dash-routes";
import { retrieveUserSession } from "../lib/Encryption";



const Sidebar = () => {

  const location = useLocation()

 
//  useEffect(()=> {
//   const user = retrieveUserSession()
  
//  })

 const sidebarItems = PompisteItems ;

  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="Navbar__Navigation" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <img
            width={80}
            height={80}
            className="sidebar__logo"
            src={defaultUser}
            alt="logo"
          />
          <p className="sidebar__logo-name">Username</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    location.pathname === href ? "sidebar__link--active" : ""
                  }`}
                  to={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
