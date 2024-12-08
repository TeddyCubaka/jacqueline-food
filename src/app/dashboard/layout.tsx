"use client";
import LoginComponent from "@/components/atoms/login.component";
import { useState } from "react";
import Image from "next/image";
import logo from "@/../public/Logo.jpg";
import { IconType } from "react-icons";
import { FaUsers } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import Link from "next/link";
import { IoIosPeople } from "react-icons/io";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";

interface SideBarContent {
  link: string;
  Icon: IconType | null;
  path: string;
  children: SideBarContent[];
  panding?: number;
}

const SideBar = () => {
  const router = useRouter();
  const menus: SideBarContent[] = [
    {
      Icon: BsFillFileBarGraphFill,
      link: "tableau de bord",
      path: "/dashboard",
      children: [],
    },
    {
      Icon: AiFillProduct,
      link: "produits",
      path: "/dashboard/product",
      children: [],
    },
    {
      Icon: RiShoppingBasket2Fill,
      link: "commandes",
      path: "/dashboard/order",
      children: [
        {
          Icon: null,
          link: "en attente",
          path: "/dashboard/order?status=pending",
          children: [],
        },
        {
          Icon: null,
          link: "en cours",
          path: "/dashboard/order?status=in progress",
          children: [],
        },
      ],
    },
    {
      Icon: IoIosPeople,
      link: "clients",
      path: "/dashboard/client",
      children: [],
    },
    {
      Icon: FaUsers,
      link: "utilisateurs",
      path: "/dashboard/user",
      children: [],
    },
  ];

  const pathname = usePathname();
  const NavSection = ({
    link,
    Icon,
    path,
    children,
    panding = 0,
  }: SideBarContent) => {
    const [displayChildrens, setDisplayChildrens] = useState<boolean>(false);
    const ChivronComponent = () => {
      return displayChildrens ? (
        <IoChevronDownOutline />
      ) : (
        <IoChevronForwardOutline />
      );
    };
    return (
      <>
        <div
          onClick={() => {
            if (children.length > 0) setDisplayChildrens(!displayChildrens);
            else router.push(path);
          }}
          className={
            "px-2.5 py-2 text-nowrap rounded-md flex gap-2 font-light cursor-pointer hover:bg-gray-200 " +
            (path == pathname && "border-x-2 border-green-500 bg-gray-100")
          }
          style={{
            marginLeft: `${panding}px`,
          }}
        >
          <span className="flex justify-between w-full">
            <span className="flex gap-2">
              {Icon !== null ? <Icon size={16} /> : false} {link}
            </span>
            {children.length > 0 ? <ChivronComponent /> : false}
          </span>
        </div>
        {displayChildrens && children.length > 0 ? (
          <div>
            {children.map((subMenu) => {
              return (
                <NavSection
                  {...subMenu}
                  key={subMenu.path}
                  panding={panding + 30}
                />
              );
            })}
          </div>
        ) : (
          false
        )}
      </>
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
      <div className="overflow-hidden w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
