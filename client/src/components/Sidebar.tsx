
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../providers/SidebarProvider";
import defaultUser from '../assets/images/defaultUser.png'
import { Link, useLocation } from "react-router-dom";


/*__Sidebar Items___*/
import { AdminItems, PompisteItems ,ClientItems} from "../routes/dash-routes";
import { CiLogout } from "react-icons/ci";
import { retrieveUserSession } from "../lib/Encryption";

interface SidebarItem {
  name: string;
  href: string;
  icon: any; 
}
const Sidebar = () => {

  const location = useLocation()

  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  useEffect(() => {
    const userData = retrieveUserSession(); 
    if (userData?.user.role == 'ADMIN') {
      setSidebarItems(AdminItems); 
    } else if (userData?.user.role == 'POMPISTE') {
      setSidebarItems(PompisteItems)
    } else if (userData?.user.role == 'CLIENT') {
      setSidebarItems(ClientItems)
    }
  }, []);

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

        <span className="sidebar__item"  >
           <button className="sidebar__link">
           <span className="sidebar__icon"><CiLogout /></span>
                  <span className="sidebar__name">Logout</span>
           </button>
        </span>

        
      </aside>
    </div>
  );
};

export default Sidebar;
