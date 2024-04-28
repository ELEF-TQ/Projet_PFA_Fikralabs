import { AiOutlineHome } from "react-icons/ai";
import { BsPeople, BsTicketPerforated } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbMessageStar, TbTransform } from "react-icons/tb";
import {  MdOutlineAdminPanelSettings, MdOutlineHomeRepairService } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { retrieveUserSession } from "../utils/Encryption";
import { hasPermission } from "../utils/hasPermission";

const user = retrieveUserSession() ;
export const AdminItems = [
    {
      name: "Home",
      href: "/admin",
      icon: AiOutlineHome,
    },
    {
      name: "Conversions",
      href: "/admin/conversions",
      icon: TbTransform,
    },
    {
      name: "Pompistes",
      href: "/admin/pompistes",
      icon: FaPeopleGroup ,
    },
    {
      name: "Coupons",
      href: "/admin/coupons",
      icon: BsTicketPerforated,
    },
    {
      name: "Clients",
      href: "/admin/clients",
      icon: BsPeople,
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: MdOutlineHomeRepairService,
    },
    {
      name: "Reservations",
      href: "/admin/reservations",
      icon: SlCalender,

    },
    {
      name: "Admins",
      href: "/admin/admins",
      icon: RiAdminLine,
    },
    {
      name: "Roles",
      href: "/admin/roles",
      icon: RiAdminFill,
    },
    {
      name: "Permissions",
      href: "/admin/permissions",
      icon: MdOutlineAdminPanelSettings,
    },
    {
      name: "Profile",
      href: "/admin/profile",
      icon: CgProfile ,
    },
 
  ]
  .filter(item => {
    if (item.name === "Home" || item.name === "Profile" || item.name === "reservations" || item.name === "Permissions" || item.name === "Reservations") {
      return true;
    }
    const hasPermissionForItem = hasPermission(user, item.name.toUpperCase());
    return hasPermissionForItem;
  });




export const PompisteItems = [
  {
    name: "Home",
    href: "/pompiste",
    icon: AiOutlineHome,
  },
  {
    name: "Conversion ",
    href: "/pompiste/demandeConvertion",
    icon: TbTransform ,
  },
  {
    name: "Demandes",
    href: "/pompiste/mesConvertions",
    icon: GiSandsOfTime,
  },
  {
    name: "Profile",
    href: "/pompiste/profile",
    icon: CgProfile ,
  },
];



export const ClientItems = [
  {
    name: "Home",
    href: "/client",
    icon: AiOutlineHome,
  },
  {
    name: "Mes Coupons",
    href: "/client/coupons",
    icon: BsTicketPerforated  ,
  },
  {
    name: "Evaluations",
    href: "/client/evaluations",
    icon: TbMessageStar ,
  },
  {
    name: "Services",
    href: "/client/services",
    icon: MdOutlineHomeRepairService ,
  },
  {
    name: "Mes Reservations",
    href: "/client/mesReservations",
    icon: SlCalender ,
  },
  {
    name: "Profile",
    href: "/client/profile",
    icon: CgProfile ,
  }
]

