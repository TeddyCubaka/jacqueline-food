"use client";
import LoginComponent from "@/components/atoms/login.component";
import { useState } from "react";
import Image from "next/image";
import logo from "@/../public/Logo.jpg";
import { IconType } from "react-icons";
import { FaUsers } from "react-icons/fa6";
import { CiCoffeeCup } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import Link from "next/link";

interface SideBarContent {
  link: string;
  Icon: IconType;
  path: string;
}

const SideBar = () => {
  const menus: SideBarContent[] = [
    {
      Icon: BsFillFileBarGraphFill,
      link: "tableau de bord",
      path: "/dashboard",
    },
    {
      Icon: CiCoffeeCup,
      link: "jus",
      path: "/dashboard/juice",
    },
    {
      Icon: AiFillProduct,
      link: "autres produits",
      path: "/dashboard/other-products",
    },
    {
      Icon: FaUsers,
      link: "utilisateurs",
      path: "/dashboard/users",
    },
  ];

  const pathname = usePathname();
  const NavSection = ({ link, Icon, path }: SideBarContent) => {
    return (
      <Link
        href={path}
        className={
          "px-2.5 py-2 text-nowrap rounded-md flex gap-2 font-light cursor-pointer hover:bg-gray-200 " +
          (path == pathname && "border-x-2 border-green-500 bg-gray-100")
        }
      >
        <Icon size={16} /> {link}
      </Link>
    );
  };
  return (
    <div className="p-2.5 mx-5 text-[#4c5458]">
      <div className="mb-10 flex w-full justify-between items-center">
        <Image src={logo} alt="hello" width={70} height={70} />
        <div className="p-5 border rounded-full h-fit w-fit ">
          <FaRegUserCircle size={20} />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <span className="font-medium">Menu</span>
        <nav className="flex flex-col gap-1.5">
          {menus.map((link, index) => {
            return <NavSection {...link} key={link.path + index} />;
          })}
        </nav>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  if (!isUserConnected)
    return <LoginComponent setIsUserConnected={setIsUserConnected} />;
  return (
    <div className="h-screen flex w-full bg-gray-200">
      <div className="h-full w-1/5 bg-white">
        <SideBar />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
