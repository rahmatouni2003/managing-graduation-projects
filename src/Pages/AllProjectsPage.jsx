import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Project from "../Services/Project.model";
import "./AllProjectsPage.css";

// دالة التحقق من تسجيل الدخول
const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

function ProjectCard({
  id,
  title,
  department,
  year,
  description,
  tags,
  favorite,
  type,
  onFavoriteClick,
  showFavoriteBtn, // 👈 استقبال الـ Prop الجديد لمعرفة هل يظهر الزر أم لا
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
        
        {/* 👈 إذا كان المستخدم مسجل دخول، سيظهر الزر، وإذا لم يكن مسجل دخول لن يظهر أي شيء هنا */}
        {showFavoriteBtn && (
          <button className="favorite-btn" onClick={() => onFavoriteClick(id)}>
            {favorite ? (
              <FaHeart className="heart-filled" />
            ) : (
              <FaRegHeart className="heart-outline" />
            )}
          </button>
        )}
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
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      if (type === "previous") {
        const response = await Project.getPreviousProjects();
        setProjects(
          response.map((project) => ({
            ...project,
            favorite: project.is_favorited,
          }))
        );
      }

      if (type === "suggested") {
        const response = await Project.getSuggestedProjects();
        setProjects(
          response.map((project) => ({
            ...project,
            favorite: project.is_favorited,
          }))
        );
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

  const handleFavorite = async (projectId) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      if (type === "previous") {
        await Project.addPreviousFavorite(projectId);
      } else if (type === "suggested") {
        await Project.addSuggestedFavorite(projectId);
      }

      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? { ...project, favorite: !project.favorite }
            : project
        )
      );
    } catch (error) {
      console.log("Error adding favorite:", error);
    }
  };

  return (
    <div className="projects-page">
      <div className="section-headerr">
        <button
          className="back-btnn"
          onClick={() => navigate("/projectsLiberary")}
        >
          <FaArrowLeft />
        </button>
        <h2>{type === "previous" ? "Previous Projects" : "Suggestions"}</h2>
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
            favorite={project.favorite}
            onFavoriteClick={handleFavorite}
            showFavoriteBtn={isLoggedIn()} // 👈 تمرير حالة التسجيل ديناميكياً لكل كارت بناءً على وجود الـ Token
          />
        ))}
      </div>
    </div>
  );
}