import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Construction and Infrastructure",
      subTitle: "305 Open Tenders",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Agriculture and Food",
      subTitle: "500 Open Tenders",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Consultancy Services",
      subTitle: "200 Open Tenders",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "Education and Training",
      subTitle: "1000+ Open Tenders",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Energy and Power",
      subTitle: "150 Open Tenders",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Transport and Logistics",
      subTitle: "867 Open Tenders",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Healthcare",
      subTitle: "50 Open Tenders",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Information Technology",
      subTitle: "80 Open Tenders",
      icon: <IoGameController />,
    },
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
