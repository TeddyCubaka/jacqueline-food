import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { IconType } from "react-icons";
import { AiFillTikTok } from "react-icons/ai";

type LinkType = { url: string; Icon: IconType; name: string };

const SocialMediaCard: React.FC<LinkType> = (props) => (
  <Link href={props.url} className="w-full">
    <props.Icon size={40} />
  </Link>
);

const CompanyList: React.FC = () => {
  const links: LinkType[] = [
    {
      url: "https://www.facebook.com/profile.php?id=100063920445868&mibextid=kFxxJD",
      Icon: FaFacebook,
      name: "facebook",
    },
    {
      Icon: FaInstagram,
      url: "https://www.instagram.com/maison.jacqueline/profilecard/?igsh=MTl4eGxoeWw5M3U2Nw==",
      name: "instagram",
    },
    // {
    //   url: "",
    //   Icon: FaLinkedin,
    //   name: "linkedin",
    // },
    {
      url: "https://www.tiktok.com/@maisonjacqueline?_t=8r3fiP57vi1&_r=1",
      Icon: AiFillTikTok,
      name: "tiktok",
    }
  ];
  return (
    <div className="flex justify-center items-center max-md:grid-cols-1 gap-10">
      {links.map((link) => (
        <SocialMediaCard {...link} key={link.name} />
      ))}
    </div>
  );
};

export default CompanyList;
