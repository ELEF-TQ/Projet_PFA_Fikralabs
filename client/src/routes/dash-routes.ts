import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbTransform } from "react-icons/tb";
import { RiCoupon2Fill } from "react-icons/ri";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { MdHomeRepairService } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

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
      icon: CgProfile ,
    },
  ];



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
    icon: RiCoupon2Fill  ,
  },
  {
    name: "Evaluations",
    href: "/client/evaluations",
    icon:BiSolidMessageSquareDots ,
  },
  {
    name: "Services",
    href: "/client/services",
    icon:MdHomeRepairService ,
  },
  {
    name: "Profile",
    href: "/client/profile",
    icon: CgProfile ,
  }
]

