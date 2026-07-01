import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Admin from "../services/Admin.model";
import "./SuggestedProjects.css";
import Project from "../services/Project.model";
import { toast } from "react-hot-toast";
export default function SuggestedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [description, setDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const loadDepartments = async () => {
    try {
      const res = await Project.getDepartments();

      setDepartments(res || []);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await Project.deleteSuggestedProjects(id);

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );

      alert("Project deleted successfully");
    } catch (err) {
      console.log("DELETE ERROR FULL:", err.response || err);
      toast.error("Failed to delete project");
    }
  };
  useEffect(() => {
    getProjects();
    loadDepartments();
  }, []);
  const addTechnology = () => {
    if (!techInput.trim()) return;

    setTechnologies([...technologies, techInput.trim()]);
    setTechInput("");
  };

  const removeTechnology = (index) => {
    setTechnologies(
      technologies.filter((_, i) => i !== index)
    );
  };
  const handleSaveProject = async () => {
    try {
      const payload = {
        title,
        department_id: departmentId,
        description,
        technologies: technologies.join(", "),
      };

      if (isEditMode) {
        await Project.updateSuggestedProjects(editingId, payload);
        toast.success("Project updated successfully");
      } else {
        await Admin.addsuggestedProject(payload);
        toast.success("Project added successfully");
      }

      setShowModal(false);
      setIsEditMode(false);
      setEditingId(null);

      setTitle("");
      setDepartmentId("");
      setDescription("");
      setTechnologies([]);
      setTechInput("");

      getProjects();
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(isEditMode ? "Update failed" : "Add failed");
    }
  };
  const getProjects = async () => {
    try {
      const res = await Admin.librarySuggested();
      setProjects(res || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="suggestions-page">
          <div className="page-header">
            <div className="header-left">
              <h2>Proposed Projects</h2>
              <p>
                Create and manage suggested graduation projects for students to choose from
              </p>
            </div>
            <button
              className="add-project-btn"
              onClick={() => setShowModal(true)}
            >
              <FaPlus />
              <span>Add New Project</span>
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <h3>{project.title}</h3>

                  <span className="department-tag">
                    {project.department_name} Department
                  </span>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="tech-tags">
                    <span>{project.department_name}</span>

                    {project.technologies?.length > 0 ? (
                      project.technologies.map((tech, index) => (
                        <span key={index}>{tech}</span>
                      ))
                    ) : (
                      <span>Project</span>
                    )}
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setIsEditMode(true);
                        setShowModal(true);

                        setEditingId(project.id);
                        setTitle(project.title);
                        setDepartmentId(project.department_id);
                        setDescription(project.description);

                        setTechnologies(
                          project.technologies
                            ? project.technologies.split(",").map(t => t.trim())
                            : []
                        );
                      }}
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="project-modal">

            <div className="modal-header">
              <h3>
                {isEditMode ? "Edit Proposed Project" : "Add Proposed Project"}
              </h3>

              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setIsEditMode(false);
                  setEditingId(null);

                  setTitle("");
                  setDepartmentId("");
                  setDescription("");
                  setTechnologies([]);
                  setTechInput("");
                }}
              >
                ×
              </button>
            </div>

            <div className="modal-body">

              <label>Project Title</label>

              <input
                type="text"
                placeholder="Enter Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Department</label>

              <select
                value={departmentId}
                onChange={(e) =>
                  setDepartmentId(e.target.value)
                }
              >
                <option value="">
                  Choose Department
                </option>

                {departments.map((dep) => (
                  <option
                    key={dep.id}
                    value={dep.id}
                  >
                    {dep.name}
                  </option>
                ))}
              </select>

              <label>Description</label>

              <textarea
                rows="4"
                placeholder="Write Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              <label>Recommended Tracks</label>

              <div className="tech-input-row">
                <input
                  type="text"
                  placeholder="Add Technology"
                  value={techInput}
                  onChange={(e) =>
                    setTechInput(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="add-tech-btn"
                  onClick={addTechnology}
                >
                  +
                </button>
              </div>

              <div className="tech-list">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="tech-chip"
                  >
                    {tech}

                    <span
                      onClick={() =>
                        removeTechnology(index)
                      }
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>

            </div>

            <div className="modal-footer">
              <button
                className="save-btn"
                onClick={handleSaveProject}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setIsEditMode(false);
                  setEditingId(null);

                  setTitle("");
                  setDepartmentId("");
                  setDescription("");
                  setTechnologies([]);
                  setTechInput("");
                }}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="project-modal">

            <div className="modal-header">
              <h3>Delete Project</h3>

              <button
                className="close-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProjectId(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p>
                Are you sure you want to delete this project?
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="delete-confirm-btn"
                onClick={async () => {
                  try {
                    await Project.deleteSuggestedProjects(selectedProjectId);


                    setProjects((prev) =>
                      prev.filter((p) => p.id !== selectedProjectId)
                    );

                    toast.success("Project deleted successfully");

                    setShowDeleteModal(false);
                    setSelectedProjectId(null);
                  } catch {
                    toast.error("Failed to delete project");
                  }
                }}
              >
                Delete
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProjectId(null);
                }}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}