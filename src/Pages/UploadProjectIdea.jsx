import { FaPaperclip, FaChevronDown, FaLightbulb } from "react-icons/fa";
import "./uploadProjectIdea.css";
import { useEffect, useState } from "react";
import Project from "../Services/Project.model";
export default function UploadProjectIdea() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [leaderId, setLeaderId] = useState(null);
  const [tools, setTools] = useState(["Figma", "React", "Python", "Firebase"]);
  const [toolInput, setToolInput] = useState("");
  const [files, setFiles] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("Software Engineering");
  const [form, setForm] = useState({
    title: "",
    description: "",
    problem_statement: "",
    solution: "",
    department_id: "",
    project_type_id: "",
    technologies: tools,
    leader_user_id: leaderId,
  });
  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const addTool = () => {
    if (!toolInput.trim()) return;

    setTools((prev) => [...prev, toolInput.trim()]);
    setToolInput("");
  };
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      technologies: tools,
    }));
  }, [tools]);
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      attachment: files,
    }));
  }, [files]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      image: image,
    }));
  }, [image]);
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("problem_statement", form.problem_statement);
      formData.append("solution", form.solution);
      formData.append("department_id", form.department_id);
      formData.append("project_type_id", form.project_type_id);
      formData.append("leader_user_id", form.leader_user_id);

      formData.append("category", category); // 👈 هنا المهم

      formData.append("technologies", JSON.stringify(form.technologies));

      if (form.attachment) formData.append("attachment", form.attachment);
      if (form.image) formData.append("image", form.image);

      const res = await Project.uploadIdea(formData);

      console.log("Success:", res);
    } catch (error) {
      console.log("Submit error:", error);
    }
  };
  const removeTool = (index) => {
    setTools((prev) => prev.filter((_, i) => i !== index));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTool();
    }
  };
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      technologies: tools,
    }));
  }, [tools]);
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const res = await Project.getFormData();

        const data = res;
        console.log("Form Data:", data);
        setTeamMembers(data.team_members);

        setLeaderId(data.team.leader_user_id);

        setDepartments(data.departments);
        setProjectTypes(data.project_types);
      } catch (error) {
        console.log("Error loading form data:", error);
      }
    };

    fetchFormData();
  }, []);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await Project.getDepartments();
        setDepartments(res);
      } catch (error) {
        console.log("Error loading departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);
  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const res = await Project.getProjectTypes();
        setProjectTypes(res);
      } catch (error) {
        console.log("Error loading project types:", error);
      }
    };

    fetchProjectTypes();
  }, []);
  return (
    <div className="upload-page">
      {/* Header */}
      <div className="upload-header">
        <div>
          <div className="title-row">
            <h1>Upload Project Idea</h1>
            <FaLightbulb className="bulb-icon" />
          </div>

          <p>Start your graduation project by submitting your ideas.</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="upload-card">
        <div className="form-grid">
          {/* LEFT SIDE */}
          <div className="form-column">
            <div className="field-group">
              <label>
                Project Title <span className="required">*</span>
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="field-group">
              <label>
                Project Description <span className="required">*</span>
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="field-group">
              <label>
                Problem Statement <span className="required">*</span>
              </label>

              <textarea
                value={form.problem_statement}
                onChange={(e) =>
                  setForm({ ...form, problem_statement: e.target.value })
                }
              />
            </div>

            <div className="field-group">
              <label>
                Department <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  value={form.department_id}
                  onChange={(e) =>
                    setForm({ ...form, department_id: e.target.value })
                  }
                >
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    departments.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name}
                      </option>
                    ))
                  )}
                </select>

                <FaChevronDown className="select-icon" />
              </div>
            </div>

            <div className="field-group">
              <label>
                Proposed Solution / Objectives{" "}
                <span className="required">*</span>
              </label>
              <textarea
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
              />
            </div>

            <div className="field-group">
              <label>Project Type</label>

              <div className="select-wrapper">
                <select
                  value={form.project_type_id}
                  onChange={(e) =>
                    setForm({ ...form, project_type_id: e.target.value })
                  }
                >
                  <option value="">Select Project Type</option>

                  {projectTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>

                <FaChevronDown className="select-icon" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="form-column">
            <div className="field-group">
              <label>
                Team Leader <span className="required">*</span>
              </label>

              <div className="select-wrapper">
                <select
                  value={form.leader_user_id}
                  onChange={(e) =>
                    setForm({ ...form, leader_user_id: e.target.value })
                  }
                >
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>

                <FaChevronDown className="select-icon" />
              </div>
            </div>

            <div className="field-group">
              <label>
                Category <span className="required">*</span>
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </div>
            <div className="field-group">
              <label>
                Tools / Technologies <span className="required">*</span>
              </label>

              {/* input wrapper */}
              <div className="tools-input-wrapper">
                <input
                  type="text"
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add tool like React..."
                  className="tools-text-input"
                />
                <button
                  type="button"
                  onClick={addTool}
                  className="add-tool-btn"
                >
                  Add
                </button>
              </div>

              {/* tags */}
              <div className="tools-tags-wrapper">
                {tools.map((tool, index) => (
                  <span key={index} className="tool-tag">
                    {tool}
                    <button
                      type="button"
                      onClick={() => removeTool(index)}
                      className="tool-remove-btn"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="field-group">
              <label>Attach Files (if any):</label>

              <label className="upload-box cursor-pointer">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FaPaperclip style={{ color: "#DDDCDC", flexShrink: 0 }} />
                  <span style={{ color: "#DDDCDC" }}>
                    {files
                      ? files.name
                      : "Drag & drop your file here or click to upload"}
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="field-group">
              <label>Project Picture:</label>

              <label className="upload-box cursor-pointer">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FaPaperclip style={{ color: "#DDDCDC", flexShrink: 0 }} />
                  <span style={{ color: "#DDDCDC" }}>
                    {image
                      ? image.name
                      : "Drag & drop picture here or click to upload"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="submit-wrapper">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
