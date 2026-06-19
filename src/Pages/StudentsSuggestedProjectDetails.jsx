import "./StudentsSuggestedProjectDetails.css";
import { FaArrowLeft, FaCalendarAlt, FaLaptopCode } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Project from "../Services/Project.model";

function SuggestedProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);

      const response =
        await Project.getSuggestedProjectDetails(id);

      setProject(response.data || response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="loading">
        No Project Found
      </div>
    );
  }

  return (
    <div className="suggested-wrapper">

      <div className="suggested-card">

        {/* Header */}

        <div className="suggested-header">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1>{project.title}</h1>

            <span className="department-badge">
              {project.department_name}
            </span>
          </div>

        </div>

        {/* Image */}

        <img
          src={
            project.image_url ||
            "https://via.placeholder.com/1000x450?text=Suggested+Project"
          }
          alt={project.title}
          className="suggested-image"
        />

        {/* Description */}

        <div className="section-box">
          <h3>Description</h3>

          <p>
            {project.description}
          </p>
        </div>

        {/* Technologies */}

        <div className="section-box">
          <h3>
            <FaLaptopCode />
            Technologies
          </h3>

          <div className="tech-container">

            {project.technologies?.length > 0 ? (
              project.technologies.map(
                (tech, index) => (
                  <span
                    key={index}
                    className="tech-tag"
                  >
                    {tech}
                  </span>
                )
              )
            ) : (
              <p>
                No technologies specified
              </p>
            )}

          </div>
        </div>

        {/* Dates */}

        <div className="section-box">

          <h3>
            <FaCalendarAlt />
            Project Information
          </h3>

          <div className="info-grid">

            <div>
              <strong>
                Created At
              </strong>

              <p>
                {project.created_at}
              </p>
            </div>

            <div>
              <strong>
                Updated At
              </strong>

              <p>
                {project.updated_at}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SuggestedProjectDetails;