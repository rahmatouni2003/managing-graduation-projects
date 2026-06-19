import "./projectsPage.css";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Project from "../Services/Project.model";

function FavoriteCard({
  id,
  title,
  department,
  year,
  description,
  tags,
  type,
}) {
  const navigate = useNavigate();

  return (
    <div className="project-card">

      <div className="card-top">
        <div className="card-info">
          <h3>{title}</h3>

          <div className="card-meta">
            <span>{department}</span>
            <span>{year || "-"}</span>
          </div>
        </div>

        <FaHeart className="heart-filled" />
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

export default function FavoritesPage() {
  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const response =
        await Project.getLibraryFavorites();

      setFavorites(
        response || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="projects-page">

      <div className="section-header">
        <h2>Favorites Projects</h2>
      </div>

      {favorites.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <h3>No favorites yet</h3>
        </div>
      ) : (
        <div className="cards-grid">
          {favorites.map((project) => (
            <FavoriteCard
              key={`${project.type}-${project.id}`}
              id={project.id}
              title={project.title}
              department={
                project.department_name
              }
              year={project.year}
              description={
                project.description
              }
              tags={
                project.technologies
              }
              type={project.type}
            />
          ))}
        </div>
      )}
    </div>
  );
}