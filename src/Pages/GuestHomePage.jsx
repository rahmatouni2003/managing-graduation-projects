import "./GuestHomePage.css";

import React, { useEffect, useState } from "react";
import {
  Search,
  Star,
  FolderOpen,
  Lightbulb,
  LayoutGrid,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import Student from "../Services/Student.model";

const PROJECT_ICONS = [
  { bg: "#dbeafe", icon: <FolderOpen size={22} color="#2563eb" /> },
  { bg: "#fef3c7", icon: <FolderOpen size={22} color="#d97706" /> },
  { bg: "#fce7f3", icon: <FolderOpen size={22} color="#db2777" /> },
];

export default function GuestHomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
const fetchHome = async () => {
  try {
    setLoading(true);
    const response = await Student.getHome();
    if (response) {
      setData(response); // response هنا هو الـ data الفعلية مباشرة
    } else {
      setError("Failed to load data");
    }
  } catch {
    setError("Something went wrong while loading the page");
  } finally {
    setLoading(false);
  }
};

    fetchHome();
  }, []);

  if (loading) {
    return <div className="home-loading">Loading...</div>;
  }

  if (error || !data) {
    return <div className="home-error">{error || "No data available"}</div>;
  }

  const {
    featured_projects = [],
    statistics = {},
    project_guidelines = [],
    suggested_projects_ideas = [],
  } = data;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <h1 className="home-title">
          Welcome <span className="wave">👋</span>
        </h1>
        <p className="home-subtitle">
          Explore graduation projects and discover new ideas.
        </p>

        <form className="home-search" onSubmit={handleSearchSubmit}>
          <Search size={18} className="home-search-icon" />
          <input
            type="text"
            placeholder="Search Projects"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="home-stats">
          <div className="home-stat-item">
            <FolderOpen size={16} className="home-stat-icon" />
            <span>
              <strong>{statistics.projects}+</strong> Projects
            </span>
          </div>
          <span className="home-stat-divider" />
          <div className="home-stat-item">
            <Lightbulb size={16} className="home-stat-icon" />
            <span>
              <strong>{statistics.ideas}+</strong> Ideas
            </span>
          </div>
          <span className="home-stat-divider" />
          <div className="home-stat-item">
            <LayoutGrid size={16} className="home-stat-icon" />
            <span>
              <strong>{statistics.departments}</strong> Departments
            </span>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="home-card featured-card">
        <div className="featured-header">
          <Star size={18} className="featured-star" />
          <span className="card-title">Featured Projects</span>
        </div>
        <hr className="card-divider" />

        <div className="featured-grid">
          {featured_projects.map((project, index) => {
            const iconStyle = PROJECT_ICONS[index % PROJECT_ICONS.length];
            return (
              <div className="featured-project" key={index}>
                <div
                  className="featured-project-icon"
                  style={{ background: iconStyle.bg }}
                >
                  {iconStyle.icon}
                </div>
                <div className="featured-project-info">
                  <span className="featured-project-title">
                    {project.title}
                  </span>
                  <span className="featured-project-meta">
                    {project.department} · {project.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <a href="/projects" className="browse-link">
          Browse All Projects <ArrowRight size={16} />
        </a>
      </section>

      {/* Guidelines + suggested ideas */}
      <section className="home-bottom-grid">
        <div className="home-card">
          <div className="bottom-card-header">
            <ClipboardList size={18} className="bottom-card-icon" />
            <span className="card-title">Project Guidelines</span>
          </div>
          <hr className="card-divider" />
          <ul className="guidelines-list">
            {project_guidelines.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="home-card">
          <div className="bottom-card-header">
            <Lightbulb size={18} className="bottom-card-icon ideas-icon" />
            <span className="card-title">Suggested Project Ideas</span>
          </div>
          <hr className="card-divider" />
          <ul className="ideas-list">
            {suggested_projects_ideas.map((idea) => (
              <li key={idea.id}>{idea.title}</li>
            ))}
          </ul>
          <a href="/ideas" className="explore-link">
            Explore All Ideas <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
