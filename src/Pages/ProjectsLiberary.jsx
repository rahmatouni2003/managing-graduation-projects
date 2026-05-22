// ProjectsPage.jsx

import "./projectsPage.css";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Project from "../Services/Project.model";
import { useNavigate } from "react-router-dom";
function ProjectCard({
  id,
  title,
  department,
  year,
  description,
  tags,
  favorite,
}) {
  const navigate = useNavigate();

  return (
    <div className="project-card">
      <div className="card-top">
        <div>
          <h3>{title}</h3>

          <div className="card-meta">
            <span>{department}</span>
            <span>{year}</span>
          </div>
        </div>

        <button className="favorite-btn">
          {favorite ? (
            <FaHeart className="heart-filled" />
          ) : (
            <FaRegHeart className="heart-outline" />
          )}
        </button>
      </div>

      <p className="card-description">
        {description}
      </p>

      <div className="tags">
        {tags?.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>

<button
  className="details-btn"
  onClick={() =>
    navigate(`/project-details/${id}`)
  }
>
  View Details →
</button>
    </div>
  );
}

function Section({ title, data, type }) {
  const navigate = useNavigate();

  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>

        <button
          onClick={() =>
            navigate(`/projects/${type}`)
          }
        >
          See all
        </button>
      </div>

      <div className="cards-grid">
        {data.map((project) => (
          <ProjectCard
          id={project.id}
            key={project.id}
            title={project.title}
            department={project.department_name}
            year={project.year}
            description={project.description}
            tags={project.technologies}
            favorite={project.favorites > 0}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [previousProjects, setPreviousProjects] =
    useState([]);

  const [suggestions, setSuggestions] =
    useState([]);

  const [departments, setDepartments] =
    useState([]);
const [academicYears, setAcademicYears] =
  useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

const fetchProjects = async () => {
  try {
    setLoading(true);

    // Previous Projects
    const previousResponse =
      await Project.getPreviousProjects();

    setPreviousProjects(
      previousResponse
    );

    // Suggested Projects
    const suggestedResponse =
      await Project.getSuggestedProjects();

    setSuggestions(
      suggestedResponse
    );

    // Departments
    const departmentsResponse =
      await Project.getDepartments();

    setDepartments(
      departmentsResponse
    );

    // Academic Years
    const yearsResponse =
      await Project.getAcademicYears();

    setAcademicYears(
      yearsResponse
    );

  } catch (error) {
    console.log(
      "Error fetching projects:",
      error
    );
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="projects-page">

      {/* TOP BAR */}
      <div className="top-bar">

        {/* SEARCH */}
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Projects"
          />
        </div>

        {/* FILTERS */}
        <div className="filters">

          {/* Department */}
          <div className="custom-select">
            <select>
              <option value="">
                All
              </option>

              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}
            </select>

            <span className="select-label">
              Department:
            </span>

            <span className="select-arrow">
              ▼
            </span>
          </div>

{/* Year */}
<div className="custom-select">
  <select>
    <option value="">
      All
    </option>

{academicYears.map((year) => (
  <option
    key={year.id}
    value={year.id}
  >
    {year.code}
  </option>
))}
  </select>

  <span className="select-label">
    Year:
  </span>

  <span className="select-arrow">
    ▼
  </span>
</div>

          {/* Category */}
          <div className="custom-select">
            <select>
              <option>
                All
              </option>

              <option>
                AI
              </option>

              <option>
                Web
              </option>

              <option>
                Mobile
              </option>
            </select>

            <span className="select-label">
              Category:
            </span>

            <span className="select-arrow">
              ▼
            </span>
          </div>

        </div>
      </div>

<Section
  title="Previous Projects"
  data={previousProjects}
  type="previous"
/>

<Section
  title="Suggestions"
  data={suggestions}
  type="suggestions"
/>

    </div>
  );
}