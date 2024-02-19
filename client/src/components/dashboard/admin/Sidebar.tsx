'use client'
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { TbTransform } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { retrieveUserSession } from "@/lib/Encryption";
import { usePathname } from 'next/navigation';
import cookie from 'js-cookie'
import defaultUser from '../../../../public/images/defaultUser.png'
const sidebarItems = [
  {
    name: "Home",
    href: "/admin",
    icon: AiOutlineHome,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: BsPeople,
  },
  {
    name: "Pompistes",
    href: "/admin/pompistes",
    icon: FaPeopleGroup ,
  },
  {
    name: "Conversion",
    href: "/admin/conversion",
    icon: TbTransform,
  },
  {
    name: "Profile",
    href: "/admin/profile",
    icon: IoSettingsOutline ,
  },
];


const Sidebar = () => {

    const pathname = usePathname();

    //!! HAD LCODE MAKHDAMCH
   let userLocal :any ; 
   let user :any ;
    useEffect(()=> {
         userLocal = cookie.get('user')
         user = JSON.parse(userLocal); 
         console.log(user.username);
        //  console.log(userLocal.username);
    },[])

    // let userUptoDate :any;
    // useEffect(()=> {
    //     userUptoDate = getCurrentUser(userLocal.user.role ,userLocal.user._id)
    //     console.log(userUptoDate)
    // },[])



  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Image
            width={80}
            height={80}
            className="sidebar__logo"
            src={defaultUser}
            alt="logo"
          />
          <p className="sidebar__logo-name">{user?.username} Admin</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
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
