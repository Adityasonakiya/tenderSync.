import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const TenderDetails = () => {
  const { id } = useParams();
  const [tender, setTender] = useState({});
  const [lowestBid, setLowestBid] = useState(null);
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/tender/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTender(res.data.tender);
        setLowestBid(res.data.lowest);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
  };

  return (
    <section className="tenderDetail page">
      <div className="container">
        <h3>Tender Details</h3>
        <div className="banner">
          <p>
            Title: <span> {tender.title}</span>
          </p>
          <p>
            Category: <span>{tender.category}</span>
          </p>
          <p>
            Country: <span>{tender.country}</span>
          </p>
          <p>
            City: <span>{tender.city}</span>
          </p>
          <p>
            Location: <span>{tender.location}</span>
          </p>
          <p>
            Description: <span>{tender.description}</span>
          </p>
          <p>
            Tender Posted On: <span>{formatDate(tender.tenderPostedOn)}</span>
          </p>
          <p>
            Start Time: {new Date(tender.startTime).toLocaleString()}
          </p>
          <p>
            End Time: {new Date(tender.endTime).toLocaleString()}
          </p>
          <p>
            Buffer Time: {tender.bufferTime} minutes
          </p>
          {lowestBid!=null ? (
            <p>Lowest Bid: {lowestBid}</p>
          ): <p>Lowest Bid: null</p>}
          {user && user.role === "Tender Manager" ? (
            <></>
          ) : (
            <Link to={`/application/${tender._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TenderDetails;
