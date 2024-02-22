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
      name: "Clients",
      href: "/admin/clients",
      icon: BsPeople,
    },
    {
      name: "Pompistes",
      href: "/admin/pompistes",
      icon: FaPeopleGroup ,
    },
    {
      name: "Conversion",
      href: "/admin/convertions",
      icon: TbTransform,
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
    name: "Évaluations",
    href: "/pompiste/evaluation",
    icon: BsPeople,
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



export const ClientItems = []

