import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaBuysellads, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved.</div>
      <div>
        <Link to={"https://adityasonakiya.github.io/portfolio_web/"} target="_blank">
          <FaBuysellads />
        </Link>
        <Link to={"https://www.linkedin.com/in/aditya-sonakiya-4433b8184/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/aditya_sonakiya_/"} target="_blank">
          <RiInstagramFill />
        </Link>
        <Link to={"https://x.com/AdityaSonakiya4"} target="_blank">
          <FaXTwitter />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
