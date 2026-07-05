import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import "./Management.css";
import {
  FaSearch,
  FaPlus,
  FaUpload,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Admin from "../services/Admin.model";
import Project from "../services/Project.model";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const StudentsManagement = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("project1");
  const [courseId,] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [editMode, setEditMode] = useState("student");
  const [students, setStudents] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [tas, setTAs] = useState([]);

  // ===== Pagination state =====
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Generic meta returned from the server for whichever tab is active
  // (Laravel paginator: current_page / last_page / total / per_page).
  // Students, Doctors and Assistants are ALL paginated on the server now,
  // so a single meta object is enough instead of one per type.
  const [meta, setMeta] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: itemsPerPage,
  });

  useEffect(() => {
    Project.getDepartments().then(res => {
      setDepartments(res);
    });
  }, []);
  const [editForm, setEditForm] = useState({
    name: "",
    national_id: "",
    email: "",
    phone: "",
    department_id: "",
    gpa: ""
  });
  const dataToRender =
    type === "doctors"
      ? doctors
      : type === "assistants"
        ? tas
        : students;

  // ===== Pagination calculations =====
  // Every tab (students / doctors / assistants) is now server-paginated,
  // so the data we already hold is exactly the current page's rows and
  // the total number of pages comes straight from the server meta.
  const totalPages = meta.lastPage;
  const paginatedData = dataToRender;

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Reset to page 1 whenever the tab (type) changes
  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState({
    name: "",
    national_id: "",
    email: "",
    phone: "",
    department_id: "",
    gpa: "",
  });
  const getDoctorPayload = () => ({
    name: editForm.name,
    national_id: editForm.national_id,
    phone: editForm.phone,
    email: editForm.email,
    department_id: editForm.department_id
  });
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async (id) => {
    console.log("UPDATE CLICKED", id);

    try {
      const payload = {
        ...getDoctorPayload(),
        department_id: Number(editForm.department_id),
      };

      if (editMode === "doctor") {
        await Admin.updateTAs(id, payload);
      }
      else if (editMode === "assistant") {
        await Admin.updateTAs(id, payload);
      }
      else {
        await Admin.updateStudent(id, editForm);
      }

      await loadData();

      setEditingId(null);

      toast.success("Updated successfully");
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);

      toast.error("Update failed");
    }
  };
  const handleUploadExcel = async () => {
    try {
      const formData = new FormData();

      const course = type === "project1" ? 1 : 2;

      formData.append("file", excelFile);
      formData.append("course", course);

      const response = await Admin.uploadStudent(formData);

      console.log("Upload Response:", response);

      loadData();

      setExcelFile(null);
      setShowUploadModal(false);
      toast.success("File uploaded successfully");
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await Admin.userToogleStatus(id);

      toast.success(
        response.is_active
          ? "User activated successfully"
          : "User deactivated successfully"
      );

      loadData();
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  };
  const handleNewChange = (e) => {
    setNewForm({
      ...newForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = async () => {
    try {
      if (type === "doctors") {
        await Admin.addDoctor({
          name: newForm.name,
          national_id: newForm.national_id,
          phone: newForm.phone,
          email: newForm.email,
          department_id: newForm.department_id,
        });
      }

      else if (type === "assistants") {
        await Admin.addTAs({
          name: newForm.name,
          national_id: newForm.national_id,
          phone: newForm.phone,
          email: newForm.email,
          department_id: newForm.department_id,
        });
      }

      else {
        await Admin.addStudent({
          name: newForm.name,
          national_id: newForm.national_id,
          gpa: newForm.gpa,
          course: type === "project1" ? 1 : 2,
          department_id: newForm.department_id,
        });
      }

      setIsAdding(false);

      setNewForm({
        name: "",
        national_id: "",
        email: "",
        phone: "",
        department_id: "",
        gpa: "",
      });

      loadData();
      toast.success("Added successfully");
    } catch {
      toast.error("Add failed");
    }
  };
  const loadData = async () => {
    try {
      setLoading(true);

      if (type === "doctors") {
        // Now paginated the same way students are: server returns a
        // Laravel paginator (data / current_page / last_page / total / per_page)
        const paginator = await Admin.showDoctor(currentPage, itemsPerPage);

        if (paginator) {
          setDoctors(paginator.data || []);
          setMeta({
            currentPage: paginator.current_page || 1,
            lastPage: paginator.last_page || 1,
            total: paginator.total || 0,
            perPage: paginator.per_page || itemsPerPage,
          });
        }

        setStudents([]);
        setTAs([]);
      }

      else if (type === "assistants") {
        // Now paginated the same way students are: server returns a
        // Laravel paginator (data / current_page / last_page / total / per_page)
        const paginator = await Admin.getTAs(currentPage, itemsPerPage);

        if (paginator) {
          setTAs(paginator.data || []);
          setMeta({
            currentPage: paginator.current_page || 1,
            lastPage: paginator.last_page || 1,
            total: paginator.total || 0,
            perPage: paginator.per_page || itemsPerPage,
          });
        }

        setStudents([]);
        setDoctors([]);
      }

      else {
        const course = type === "project1" ? 1 : 2;

        const paginator = await Admin.getStudents(course, currentPage, itemsPerPage);

        if (paginator) {
          setStudents(paginator.data || []);
          setMeta({
            currentPage: paginator.current_page || 1,
            lastPage: paginator.last_page || 1,
            total: paginator.total || 0,
            perPage: paginator.per_page || itemsPerPage,
          });
        }

        setDoctors([]);
        setTAs([]);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
const handleExport = async () => {
  try {
    let response;
    let fileName;

    if (type === "doctors") {
      response = await Admin.exportDoctor(); // ستعمل بنجاح الآن كـ Blob
      fileName = `doctors_list_${new Date().toISOString().slice(0,10)}.xlsx`;
    } else if (type === "assistants") {
      response = await Admin.exportTAs(); // ستعمل بنجاح الآن كـ Blob
      fileName = `teaching_assistants_list_${new Date().toISOString().slice(0,10)}.xlsx`;
    } else {
      const courseId = type === "project1" ? 1 : 2;
      response = await Admin.exportStudents(courseId);
      fileName = `capstone_project_${courseId}_students_${new Date().toISOString().slice(0,10)}.xlsx`;
    }

    const url = window.URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
    toast.success("File downloaded successfully");
  } catch (error) {
    console.error("Export Error:", error);
    toast.error("Export failed");
  }
};

  // Refetch when the tab / course changes
  useEffect(() => {
    loadData();
  }, [type, courseId]);

  // Refetch from the server whenever the page changes. All tabs
  // (students / doctors / assistants) are server-paginated now.
  useEffect(() => {
    loadData();
  }, [currentPage]);

  if (loading) {
    return (
      <>
        <Sidebar />
        <Header />
        <div className="page">
          Loading Students...
        </div>
      </>
    );
  }
  return (

    <>
      <div className="admin-managment">
        <Sidebar />
        <Header />

        <div className="admin-managment">

          <h2>
            {type === "project1" && "Project 1 Students"}
            {type === "project2" && "Project 2 Students"}
            {type === "doctors" && "Doctors Management"}
            {type === "assistants" && "Assistants Management"}
          </h2>
          <div className="tabs">
            <button
              className={type === "project1" ? "active" : ""}
              onClick={() => setType("project1")}
            >
              Project 1 Students
            </button>

            <button
              className={type === "project2" ? "active" : ""}
              onClick={() => setType("project2")}
            >
              Project 2 Students
            </button>

            <button
              className={type === "doctors" ? "active" : ""}
              onClick={() => setType("doctors")}
            >
              Doctors
            </button>

            <button
              className={type === "assistants" ? "active" : ""}
              onClick={() => setType("assistants")}
            >
              Assistants
            </button>
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
                <button
                  className="btn-primary"
                  onClick={() => setIsAdding(true)}
                >
                  <FaPlus />

                  {type === "project1" && "Add Student"}
                  {type === "project2" && "Add Student"}
                  {type === "doctors" && "Add Doctor"}
                  {type === "assistants" && "Add TA"}
                </button>

                <button
                  className="btn-secondary"
                  onClick={() =>
                    document.getElementById("excelUpload").click()
                  }
                >
                  <FaUpload />
                  Upload Excel
                </button>

                <button
                  className="btn-secondary"
                  onClick={handleExport}
                >
                  <FaShareAlt />

                  {type === "project1" && "Share Project 1 List"}
                  {type === "project2" && "Share Project 2 List"}
                  {type === "doctors" && "Share Doctors List"}
                  {type === "assistants" && "Share TA List"}
                </button>

              </div>

            </div>
            <input
              type="file"
              id="excelUpload"
              accept=".xlsx,.xls"
              style={{ display: "none" }}
              onChange={(e) => {
                setExcelFile(e.target.files[0]);
                setShowUploadModal(true);
              }}
            />
            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>University Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  {type !== "doctors" && type !== "assistants" && (
                    <th>Grades</th>
                  )}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {isAdding && (
                  <tr>
                    <td>
                      <input
                        name="national_id"
                        value={newForm.national_id}
                        onChange={handleNewChange}
                      />
                    </td>

                    <td>
                      <input
                        name="name"
                        value={newForm.name}
                        onChange={handleNewChange}
                      />
                    </td>

                    <td>
                      <input
                        name="email"
                        value={newForm.email}
                        onChange={handleNewChange}
                      />
                    </td>

                    <td>
                      <input
                        name="phone"
                        value={newForm.phone}
                        onChange={handleNewChange}
                      />
                    </td>

                    <td>
                      <select
                        name="department_id"
                        value={newForm.department_id}
                        onChange={handleNewChange}
                        className="table-select"

                      >
                        <option value="">Department</option>

                        {departments.map((dep) => (
                          <option key={dep.id} value={dep.id}>
                            {dep.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    {type !== "doctors" && type !== "assistants" && (
                      <td>
                        <input
                          name="gpa"
                          value={newForm.gpa}
                          onChange={handleNewChange}
                        />
                      </td>
                    )}

                    <td>
                      <button
                        className="save-btn"
                        onClick={handleAdd}
                      >
                        Submit
                      </button>

                    </td>
                  </tr>
                )}
                {paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.national_id}</td>

                    {/* NAME */}
                    <td>
                      {editingId === item.id ? (
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleChange}
                        />
                      ) : (
                        item.full_name
                      )}
                    </td>

                    {/* EMAIL */}
                    <td>
                      {editingId === item.id ? (
                        <input
                          name="email"
                          value={editForm.email}
                          onChange={handleChange}
                        />
                      ) : (
                        item.email
                      )}
                    </td>

                    {/* PHONE */}
                    <td>
                      {editingId === item.id ? (
                        <input
                          name="phone"
                          value={editForm.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        item.phone || "-"
                      )}
                    </td>

                    {/* DEPARTMENT */}
                    <td>
                      {editingId === item.id ? (
                        <div className="select-wrapper">
                          <select
                            name="department_id"
                            value={editForm.department_id}
                            onChange={handleChange}
                            className="table-select"
                          >
                            <option value="">Select Department</option>

                            {departments.map((dep) => (
                              <option key={dep.id} value={dep.id}>
                                {dep.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        item.department?.name || item.department || "-"
                      )}
                    </td>

                    {/* GPA */}
                    {type !== "doctors" && type !== "assistants" && (

                      <td>
                        {editingId === item.id ? (
                          <input
                            type="number"
                            step="0.01"
                            name="gpa"
                            value={editForm.gpa}
                            onChange={handleChange}
                            className="table-input"
                          />
                        ) : (
                          item.gpa ?? "-"
                        )}
                      </td>
                    )}

                    {/* ACTION */}
                    <td>
                      <div className="action-buttons">

                        {editingId === item.id ? (
                          <button
                            className="save-btn"
                            onClick={() => handleUpdate(item.id)}
                          >
                            Submit
                          </button>
                        ) : (
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditingId(item.id);
                              if (type === "doctors") {
                                setEditMode("doctor");
                              }
                              else if (type === "assistants") {
                                setEditMode("assistant");
                              }
                              else {
                                setEditMode("student");
                              }


                              setEditForm({
                                name: item.name || item.full_name,
                                national_id: item.national_id || "",
                                email: item.email || "",
                                phone: item.phone || "",
                                department_id: item.department_id || ""
                              });
                            }}
                          >
                            <FaPen />
                            Edit
                          </button>
                        )}

                        <button
                          className={`status ${item.is_active ? "active" : "inactive"
                            }`}
                          onClick={() => handleToggleStatus(item.id)}
                        >
                          {item.is_active ? (
                            <>
                              <FaCheckCircle />
                              Active
                            </>
                          ) : (
                            <>
                              <FaTimesCircle />
                              Inactive
                            </>
                          )}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

            {/* ===== Pagination Controls (English) ===== */}
            <div className="pagination-wrapper">
              <button
                className="pagination-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
                Previous
              </button>

              <span className="pagination-info">
                Page {currentPage} of {totalPages} ({meta.total}{" "}
                {type === "doctors"
                  ? "doctors"
                  : type === "assistants"
                    ? "assistants"
                    : "students"}
                )
              </span>

              <button
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <FaChevronRight />
              </button>
            </div>

            {showUploadModal && (
              <div className="modal-overlay">
                <div className="year-modal">

                  <div className="modal-header">
                    <h3>Confirm Upload</h3>

                    <button
                      className="close-btn"
                      onClick={() => setShowUploadModal(false)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="modal-body">
                    <p>
                      Are you sure you want to upload this Excel file?
                    </p>

                    {excelFile && (
                      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                        File: {excelFile.name}
                      </p>
                    )}
                  </div>

                  <div className="modal-footer">

                    <button
                      className="cancel-btn"
                      onClick={() => setShowUploadModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      className="save-btn"
                      onClick={handleUploadExcel}
                    >
                      Confirm
                    </button>

                  </div>

                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default StudentsManagement;
