import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { TbTransform } from "react-icons/tb";


export const AdminItems = [
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


export const ClientItems = []


export const PompisteItems = []