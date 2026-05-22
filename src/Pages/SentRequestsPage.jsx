import "./SentRequestsPage.css";

import { IoArrowBack } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
const sentRequests = [
  {
    id: 1,
    name: "Dennisa Nedry",
    role: "UI/UX",
    image: "https://i.pravatar.cc/150?img=11",
    status: "Accepted",
  },
  {
    id: 2,
    name: "Dennisa Nedry",
    role: "UI/UX",
    image: "https://i.pravatar.cc/150?img=12",
    status: "",
  },
  {
    id: 3,
    name: "Dennisa Nedry",
    role: "UI/UX",
    image: "https://i.pravatar.cc/150?img=13",
    status: "Declined",
  },
  {
    id: 4,
    name: "Dennisa Nedry",
    role: "UI/UX",
    image: "https://i.pravatar.cc/150?img=14",
    status: "Declined",
  },
  {
    id: 5,
    name: "Dennisa Nedry",
    role: "UI/UX",
    image: "https://i.pravatar.cc/150?img=15",
    status: "",
  },
  {
    id: 6,
    name: "Dennisa Nedry",
    role: "UI/UX",
    image: "https://i.pravatar.cc/150?img=16",
    status: "Accepted",
  },
];

function SentRequestsPage() {
const navigate = useNavigate();
const activeTab = "sent";

  return (

    <div className="sent-page">

      {/* HEADER */}

      <div className="sent-header">

        <div className="sent-header-left">

          <IoArrowBack className="back-icon" />

          <h2>
            Requests
          </h2>

        </div>

        <button className="send-request-btn">
          Send New Requests
        </button>

      </div>

      {/* TABS */}

      <div className="sent-tabs">

        <button
          className={
            activeTab === "received"
              ? "sent-tab active-tab"
              : "sent-tab"
          }
onClick={() =>
  navigate("/received")
}
        >
          Received
        </button>

        <button
          className={
            activeTab === "sent"
              ? "sent-tab active-tab"
              : "sent-tab"
          }
onClick={() =>
  navigate("/sent-requests")
}
        >
          Sent
        </button>

      </div>

      {/* CARD */}

      <div className="sent-card">

        {/* SEARCH */}

        <div className="sent-search-row">

          <div className="sent-search-box">

            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search"
            />

          </div>

          <button className="filter-btn">

            <HiOutlineAdjustmentsHorizontal />

          </button>

        </div>

        {/* LIST */}

        <div className="sent-list">

          {sentRequests.map((item) => (

            <div
              className="sent-item"
              key={item.id}
            >

              <div className="sent-user">

                <img
                  src={item.image}
                  alt=""
                />

                <div>

                  <h4>
                    {item.name}
                  </h4>

                  <p>
                    {item.role}
                  </p>

                </div>

              </div>

              <div
                className={
                  item.status === "Accepted"
                    ? "status accepted"
                    : item.status === "Declined"
                    ? "status declined"
                    : "status"
                }
              >
                {item.status}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default SentRequestsPage;