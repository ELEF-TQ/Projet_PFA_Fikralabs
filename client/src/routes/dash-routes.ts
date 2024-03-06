import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { TbTransform } from "react-icons/tb";
import { RiCoupon2Fill } from "react-icons/ri";

export const AdminItems = [
    {
      name: "Home",
      href: "/admin",
      icon: AiOutlineHome,
    },
    {
      name: "Conversion",
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
      icon: RiCoupon2Fill  ,
    },
    {
      name: "Clients",
      href: "/admin/clients",
      icon: BsPeople,
    },
 
    {
      name: "Profile",
      href: "/admin/profile",
      icon: IoSettingsOutline ,
    },
  ];



export const PompisteItems = [
  {
    name: "Home",
    href: "/pompiste",
    icon: AiOutlineHome,
  },
  {
    name: "Demandes",
    href: "/pompiste/demandeConvertion",
    icon: FaPeopleGroup ,
  },
  {
    name: "Conversion",
    href: "/pompiste/mesConvertions",
    icon: TbTransform,
  },
  {
    name: "Quiz",
    href: "/pompiste/quiz",
    icon: IoSettingsOutline ,
  },
  {
    name: "Formations",
    href: "/pompiste/formations",
    icon: IoSettingsOutline ,
  },
  {
    name: "Profile",
    href: "/pompiste/profile",
    icon: IoSettingsOutline ,
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
    icon: RiCoupon2Fill  ,
  },
]

