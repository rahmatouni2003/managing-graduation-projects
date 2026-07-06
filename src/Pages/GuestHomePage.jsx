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

// استيراد الـ Model الخاص بك
import Student from "../Services/Student.model";

// الأيقونات والخلفيات لتطابق الألوان المعروضة بالترتيب
const PROJECT_ICONS = [
  { bg: "#e0f2fe", icon: <FolderOpen size={22} color="#0284c7" /> }, // أزرق سماوي
  { bg: "#dbeafe", icon: <FolderOpen size={22} color="#2563eb" /> }, // أزرق داكن
  { bg: "#e0e7ff", icon: <FolderOpen size={22} color="#4f46e5" /> }, // بنفسجي
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
        // استدعاء الدالة الحقيقية لجلب البيانات من الـ API
        const response = await Student.getHome();
        console.log("API Response:", response);
        
        // تعديل التخزين هنا ليعتمد على response.data مباشرة حتى تنجح عملية الـ destructuring بالأسفل
        if (response && response.success && response.data) {
          setData(response.data);
        } else if (response && response.featured_projects) {
          setData(response);
        } else if (response && response.data) {
          setData(response.data);
        } else {
          setError("Failed to load dashboard data");
        }
      } catch (err) {
        setError("Something went wrong while loading the page");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  if (loading) {
    return <div className="home-loading">Loading Dashboard...</div>;
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

  // 1. تصفية المشاريع لاستبعاد أي عنصر يحتوي على قيم null أو فارغة تماماً
  const validFeaturedProjects = featured_projects.filter(
    (project) => project && project.title && project.department && project.year
  );

  // 2. تصفية التعليمات لاستبعاد النصوص التجريبية أو القصيرة جداً مثل "jj"
  const validGuidelines = project_guidelines.filter(
    (rule) => rule && rule.trim().length > 2
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <h1 className="home-title">
          Welcome <span className="wave">👋🏼</span>
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
              <strong>{statistics.projects || 0}</strong> Projects
            </span>
          </div>
          <span className="home-stat-divider" />
          <div className="home-stat-item">
            <Lightbulb size={16} className="home-stat-icon-yellow" />
            <span>
              <strong>{statistics.ideas || 0}</strong> Ideas
            </span>
          </div>
          <span className="home-stat-divider" />
          <div className="home-stat-item">
            <LayoutGrid size={16} className="home-stat-icon-purple" />
            <span>
              <strong>{statistics.departments || 0}</strong> Departments
            </span>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="home-card featured-card">
        <div className="featured-header">
          <Star size={18} className="featured-star" />
          <span className="card-title">Featured Projects</span>
        </div>
        <hr className="card-divider" />

        <div className="featured-grid">
          {validFeaturedProjects.map((project, index) => {
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
                  <span className="featured-project-title" title={project.title}>
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

        {/* تعديل اللينك الأول يروح لـ projectsLiberary/projects/previous/ */}
        <a href="/projectsLiberary/projects/previous/" className="browse-link">
          Browse All Projects <ArrowRight size={16} />
        </a>
      </section>

      {/* Bottom Grid Section (Guidelines + Suggested Ideas) */}
      <section className="home-bottom-grid">
        <div className="home-card">
          <div className="bottom-card-header">
            <ClipboardList size={18} className="bottom-card-icon" />
            <span className="card-title">Project Guidelines</span>
          </div>
          <hr className="card-divider" />
          <ul className="guidelines-list">
            {validGuidelines.map((rule, index) => (
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
          {/* تعديل اللينك الثاني يروح لـ projectsLiberary/projects/suggested */}
          <a href="/projectsLiberary/projects/suggested" className="explore-link">
            Explore All Ideas <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}