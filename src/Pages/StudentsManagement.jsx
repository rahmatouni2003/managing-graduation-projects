import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import "./StudentsManagement.css";
import {
  FaSearch,
  FaPlus,
  FaUpload,
  FaShareAlt
} from "react-icons/fa";
import { FaPen, FaTrashAlt } from "react-icons/fa";
const data = Array(10).fill({
  id: 221246,
  name: "Aliya Othman",
  email: "aliyaothman@fcis.bsu.edu.eg",
  department: "CS",
  grades: 30
});

const StudentsManagement = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="page">

        <h2>Students Management</h2>

        <div className="tabs">
          <button className="active">
            Project 1 Students
          </button>

          <button>
            Project 2 Students
          </button>

          <button>Doctors</button>

          <button>Assistants</button>
        </div>

        <div className="table-card">

<div className="top-bar">

  <div className="search-wrapper">
    <FaSearch className="search-icon" />
    <input
      type="text"
      placeholder="Search"
    />
  </div>

  <div className="top-actions">

    <button className="btn-primary">
      <FaPlus />
      Add Student
    </button>

    <button className="btn-secondary">
      <FaUpload />
      Upload Excel
    </button>

    <button className="btn-secondary">
      <FaShareAlt />
      Share Project 1 List
    </button>

  </div>

</div>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>University Email</th>
                <th>Department</th>
                <th>Grades</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.department}</td>
                  <td>{item.grades}</td>
<td>
  <div className="action-buttons">
    <button className="edit-btn">
      <FaPen />
      Edit
    </button>

    <button className="deactivate-btn">
      <FaTrashAlt />
      Deactivate
    </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </>
  );
};

export default StudentsManagement;