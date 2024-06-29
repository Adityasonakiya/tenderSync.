import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyTenders = () => {
  const [myTenders, setMyTenders] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/tender/getmytenders",
          { withCredentials: true }
        );
        setMyTenders(data.myTenders);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyTenders([]);
      }
    };
    fetchTenders();
  }, []);
  if (!isAuthorized || (user && user.role !== "Tender Manager")) {
    navigateTo("/");
  }

  const handleEnableEdit = (tenderId) => {
    setEditingMode(tenderId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateTender = async (tenderId) => {
    const updatedTender = myTenders.find((tender) => tender._id === tenderId);
    await axios
      .put(`http://localhost:4000/api/v1/tender/update/${tenderId}`, updatedTender, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteTender = async (tenderId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/tender/delete/${tenderId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyTenders((prevTenders) => prevTenders.filter((tender) => tender._id !== tenderId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (tenderId, field, value) => {
    setMyTenders((prevTenders) =>
      prevTenders.map((tender) =>
        tender._id === tenderId ? { ...tender, [field]: value } : tender
      )
    );
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="mytenders page">
        <div className="container">
          <h1>Your Posted Tenders</h1>
          {myTenders.length > 0 ? (
            <>
              <div className="banner">
                {myTenders.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Construction and Infrastructure">
                              Construction and Infrastructure
                            </option>
                            <option value="Information Technology">
                              Information Technology
                            </option>
                            <option value="Healthcare">
                              Healthcare
                            </option>
                            <option value="Transport and Logistics">
                              Transport and Logistics
                            </option>
                            <option value="Energy and Power">
                              Energy and Power</option>
                            <option value="Education and Training">
                              Education and Training
                            </option>
                            <option value="Agriculture and Food">
                              Agriculture and Food</option>
                            <option value="Public Services and Utilities">
                              Public Services and Utilities
                            </option>
                            <option value="Manufacturing">
                              Manufacturing
                            </option>
                            <option value="Finance and Insurance">
                              Finance and Insurance
                            </option>
                          </select>
                        </div>
                        <div>
                          <span>
                              <div>
                                <input
                                  type="datetime-local"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={formatDate(element.startTime)}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "startTime",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="datetime-local"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={formatDate(element.endTime)}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "endTime",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                          </span>
                        </div>
                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateTender(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteTender(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any tender or may be you deleted all of your tenders!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyTenders;
