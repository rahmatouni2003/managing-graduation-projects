import "./projectsPage.css";
import {
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";


import {
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Project from "../Services/Project.model";

function ProjectCard({ id, title, department, year, description, tags, favorite, type }) {
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

      <p className="card-description">{description}</p>

      <div className="tags">
        {tags?.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>

      <button
        className="details-btn"
        onClick={() =>
          navigate(
            type === "suggested"
              ? `/projectsLiberary/suggested-project-details/${id}`
              : `/projectsLiberary/project-details/${id}`
          )
        }
      >
        View Details →
      </button>
    </div>
  );
}


export default function AllProjectsPage() {
  const { type } = useParams();

  const [projects, setProjects] =
    useState([]);
  const fetchProjects = async () => {
    try {

      if (type === "previous") {
        const response =
          await Project.getPreviousProjects();

        setProjects(response);
      }

      if (type === "suggested") {
        const response =
          await Project.getSuggestedProjects();

        setProjects(response);
      }

    } catch (error) {
      console.log(error);
    }
  };
useEffect(() => {
  async function loadProjects() {
    await fetchProjects();
  }

  loadProjects();
}, [type]);



  return (
    <div className="projects-page">

      <div className="section-header">
        <h2>
          {type === "previous"
            ? "Previous Projects"
            : "Suggestions"}
        </h2>
      </div>

      <div className="cards-grid">
{projects.map((project) => (
  <ProjectCard
    key={project.id}
    id={project.id}        
    type={type}            
    title={project.title}
    department={project.department_name}
    year={project.year}
    description={project.description}
    tags={project.technologies}
  />
))}
      </div>

    </div>
  );
}