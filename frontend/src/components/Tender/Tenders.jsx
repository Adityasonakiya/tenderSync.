import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/tender/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setTenders(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="tenders page">
      <div className="container">
        <h1>ALL AVAILABLE TENDERS</h1>
        <div className="banner">
          {tenders.tenders &&
            tenders.tenders.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/tender/${element._id}`}>Tender Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Tenders;
