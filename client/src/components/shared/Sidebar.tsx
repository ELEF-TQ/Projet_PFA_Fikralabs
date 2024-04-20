import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../providers/SidebarProvider";
import { Link, useLocation } from "react-router-dom";
import { retrieveUserSession } from "../../lib/Encryption";
import { AdminItems, ClientItems, PompisteItems } from "../../routes/dash-routes";
interface SidebarItem {
  name: string;
  href: string;
  icon: any; 
}

const Sidebar = () => {
  const location = useLocation();
  const userData = retrieveUserSession();

  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  useEffect(() => {
    if (userData?.role === 'ADMIN') {
      setSidebarItems(AdminItems); 
    } else if (userData?.role === 'POMPISTE') {
      setSidebarItems(PompisteItems);
    } else if (userData?.role === 'CLIENT') {
      setSidebarItems(ClientItems);
    }
  }, []);

  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

 

  return (
    <div className="bg-grayDash-color">

  
   
    <div className="sidebar__wrapper">
      <button className="Navbar__Navigation" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
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
          ))}
        </ul>

        {/* <span className="sidebar__item">
          <button className="sidebar__link" onClick={handleLogout}>
            <span className="sidebar__icon"><CiLogout /></span>
            <span className="sidebar__name">Logout</span>
          </button>
        </span> */}
      </aside>
    </div>
    </div>
  );
};

export default Sidebar;
