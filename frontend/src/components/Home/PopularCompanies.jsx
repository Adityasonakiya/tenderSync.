import React from "react";
import { FaMicrosoft } from "react-icons/fa";
import { SiTesla,SiInfosys } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10, USA",
      openTenders: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Downtown , CA",
      openTenders: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Infosys",
      location: "CP, Delhi",
      openTenders: 20,
      icon: <SiInfosys />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Tenders {element.openTenders}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
