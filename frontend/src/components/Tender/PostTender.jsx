import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostTender = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bufferTime, setBufferTime] = useState('');

  const { isAuthorized, user } = useContext(Context);

  const handleTenderPost = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/tender/post",
        {
          title,
          description,
          category,
          country,
          city,
          location,
          startTime,
          endTime,
          bufferTime,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Tender Manager")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="tender_post page">
        <div className="container">
          <h3>POST NEW TENDER</h3>
          <form onSubmit={handleTenderPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tender Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Construction and Infrastructure">Construction and Infrastructure</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Healthcare">
                  Healthcare
                </option>
                <option value="Transport and Logistics">
                  Transport and Logistics
                </option>
                <option value="Energy and Power">Energy and Power</option>
                <option value="Education and Training">
                  Education and Training
                </option>
                <option value="Agriculture and Food">Agriculture and Food</option>
                <option value="Public Services and Utilities">
                  Public Services and Utilities
                </option>
                <option value="Manufacturing">
                  Manufacturing
                </option>
                <option value="Finance and Insurance">Finance and Insurance</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <div className="wrapper">
              <label>Start Time</label>
              <input type="datetime-local"  value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              <label>End Time</label>
              <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="End Time" required />
            </div>
            <div className="wrapper">
              {/* <label>Buffer Time (in minutes)</label> */}
              <input type="number" value={bufferTime} onChange={(e) => setBufferTime(e.target.value)} placeholder="Buffer Time (in minutes)" required />
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tender Description"
            />
            <button type="submit">Create Tender</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostTender;
