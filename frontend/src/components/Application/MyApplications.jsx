import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LicenseModal from "./LicenseModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Tender Manager") {
        axios
          .get("http://localhost:4000/api/v1/application/tendermanager/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/bidder/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setLicenseImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Bidder" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <BidderCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Bidders</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <TenderManagerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <LicenseModal imageUrl={licenseImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const BidderCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="bidder_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Amount:</span> {element.amount}
          </p>
          <p>
            <span>Bid Time:</span> {new Date(element.createdAt).toLocaleString()}
          </p>
          <p>
            <span>Late Bid:</span> {element.isLateBid ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const TenderManagerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="bid-table">
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Bid Time</th>
            <th>Bid Cost</th>
            <th>Late Bid</th>
          </tr>
        </thead>
        <tbody id="bid-rows">
            <tr>
            <td data-label="Company Name">{element.name}</td>
            <td data-label="Bid Time">{new Date(element.createdAt).toLocaleString()}</td>
            <td data-label="Bid Cost">{element.amount}</td>
            <td data-label="Late Bid">{element.isLateBid ? 'Yes' : 'No'}</td>
            </tr>
        </tbody>
      </table>
      </div>
    </>
  );
};
