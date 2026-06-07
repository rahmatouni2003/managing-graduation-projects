import "./adminHeader.css";
import { useState } from "react";

import {
  FaSearch,
  FaBell,
  FaGraduationCap,
  FaPen
} from "react-icons/fa";

import logo from "../assets/logo2.png";

const Header = () => {
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [showYearModal, setShowYearModal] = useState(false);
  const [startYear, setStartYear] = useState("2025");

  const handleSave = () => {
    setAcademicYear(
      `${startYear}-${Number(startYear) + 1}`
    );

    setShowYearModal(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img
            src={logo}
            alt="logo"
            className="header-logo"
          />

          <div className="search-boxx">
            <FaSearch />

            <input
              placeholder="Search Projects or Students"
            />
          </div>
        </div>

        <div className="header-right">
          <div className="academic-year">
            <FaGraduationCap className="grad-icon" />

            <span>
              Academic Year : {academicYear}
            </span>

            <button
              className="edit-year-btn"
              onClick={() => setShowYearModal(true)}
            >
              <FaPen />
            </button>
          </div>

          <FaBell className="bell" />

          <div className="profile">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
            />

            <span>Mahmoud Fareed</span>
          </div>
        </div>
      </header>

      {showYearModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowYearModal(false)}
        >
          <div
            className="year-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Edit Academic Year</h3>

              <button
                className="close-btn"
                onClick={() => setShowYearModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <label>Start Year</label>

              <select
                value={startYear}
                onChange={(e) =>
                  setStartYear(e.target.value)
                }
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>

              <p className="year-note">
                End Year :{" "}
                <strong>
                  {Number(startYear) + 1}
                </strong>
                {" "}
                ( Start Year + 1 )
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowYearModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;