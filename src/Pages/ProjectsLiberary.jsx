// ProjectsPage.jsx

import "./projectsPage.css";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Project from "../Services/Project.model";
import { useNavigate } from "react-router-dom";

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
}) {
  const navigate = useNavigate();

  return (
    <div className="project-card">
      <div className="card-top">
        <div className="card-info">
          <h3>{title}</h3>

          <div className="card-meta">
            <span>{department}</span>
            <span>{year || "N/A"}</span>
          </div>
        </div>

        <button className="favorite-btn" onClick={() => onFavoriteClick(id, type)}>
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

function Section({ title, data, type, onFavoriteClick }) {
  const navigate = useNavigate();

  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>

        <button onClick={() => navigate(`/projectsLiberary/projects/${type}`)}>
          See all
        </button>
      </div>

      <div className="cards-grid">
        {data.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            department={project.department_name}
            year={project.year}
            description={project.description}
            tags={project.technologies}
            favorite={project.favorite}
            type={project.projectType || type}
            onFavoriteClick={onFavoriteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsLiberary() {
  const navigate = useNavigate();

  const [previousProjects, setPreviousProjects] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // حقول الفلترة والبحث المحدثة
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // إضافة الـ State الخاص بالتصنيف
  
  const [filteredProjects, setFilteredProjects] = useState([]);

  const saveFavorite = (id, type) => {
    const key = `${type}-favorites`;
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");

    if (favorites.includes(id)) {
      const updated = favorites.filter((favId) => favId !== id);
      localStorage.setItem(key, JSON.stringify(updated));
    } else {
      localStorage.setItem(key, JSON.stringify([...favorites, id]));
    }
  };

  const handleFavorite = async (projectId, type) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      if (type === "previous") {
        await Project.addPreviousFavorite(projectId);
        saveFavorite(projectId, "previous");
        setPreviousProjects((prev) =>
          prev.map((project) =>
            project.id === projectId
              ? { ...project, favorite: !project.favorite }
              : project
          )
        );
      }

      if (type === "suggested") {
        await Project.addSuggestedFavorite(projectId);
        saveFavorite(projectId, type);
        setSuggestions((prev) =>
          prev.map((project) =>
            project.id === projectId
              ? { ...project, favorite: !project.favorite }
              : project
          )
        );
      }
    } catch (error) {
      console.log("Error adding favorite:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // دالة الفلترة الشاملة (بحث + قسم + سنة + تصنيف)
  useEffect(() => {
    // إذا لم يقم المستخدم بالبحث أو التصفية بأي شيء، نعيد ضبط مصفوفة الفلترة لتظهر الواجهة الافتراضية
    if (searchQuery.trim() === "" && selectedDepartment === "" && selectedYear === "" && selectedCategory === "") {
      setFilteredProjects([]);
      return;
    }

    // دمج مصفوفتي المشاريع
    const allProjects = [
      ...previousProjects.map(p => ({ ...p, projectType: "previous" })),
      ...suggestions.map(p => ({ ...p, projectType: "suggested" }))
    ];

    const filtered = allProjects.filter((project) => {
      // 1. تصفية نص البحث (العنوان، الوصف، أو الـ tags)
      const matchesSearch = searchQuery.trim() === "" || 
        project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. تصفية القسم
      const matchesDepartment = selectedDepartment === "" || 
        String(project.department_id) === String(selectedDepartment);

      // 3. تصفية السنة
      const matchesYear = selectedYear === "" || 
        project.year === selectedYear;

      // 4. تصفية التصنيف (مثل IoT, AI, Web, Mobile)
      let matchesCategory = true;
      if (selectedCategory !== "") {
        const categoryLower = selectedCategory.toLowerCase();
        
        // فحص وجود الكلمة في العنوان أو الوصف أو التقنيات
        const inTitle = project.title?.toLowerCase().includes(categoryLower);
        const inDesc = project.description?.toLowerCase().includes(categoryLower);
        const inTags = project.technologies?.some(tag => tag.toLowerCase().includes(categoryLower));
        
        // تخصيص ذكي لـ IoT (إذا كان المشروع يحتوي على ESP32 أو الـ tags تشمل الـ IoT)
        const isIoTAddon = categoryLower === "iot" && project.technologies?.some(tag => tag.toLowerCase().includes("esp32") || tag.toLowerCase().includes("mqtt"));

        matchesCategory = inTitle || inDesc || inTags || isIoTAddon;
      }

      // يجب أن يطابق المشروع كل الشروط النشطة معاً
      return matchesSearch && matchesDepartment && matchesYear && matchesCategory;
    });

    setFilteredProjects(filtered);
  }, [searchQuery, selectedDepartment, selectedYear, selectedCategory, previousProjects, suggestions]);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const previousResponse = await Project.getPreviousProjects();
      setPreviousProjects(
        previousResponse.map((project) => ({
          ...project,
          favorite: project.is_favorited,
        }))
      );

      const suggestedResponse = await Project.getSuggestedProjects();
      setSuggestions(
        suggestedResponse.map((project) => ({
          ...project,
          favorite: project.is_favorited,
        }))
      );

      const departmentsResponse = await Project.getDepartments();
      setDepartments(departmentsResponse);

      const yearsResponse = await Project.getAcademicYears();
      setAcademicYears(yearsResponse);
    } catch (error) {
      console.log("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // نحدد ما إذا كان أي فلتر نشطاً حالياً
  const isFilteringActive = searchQuery.trim() !== "" || selectedDepartment !== "" || selectedYear !== "" || selectedCategory !== "";

  return (
    <div className="projects-page">
      {/* TOP BAR */}
      <div className="top-bar">
        {/* SEARCH */}
        <div className="search-boxx">
          <FaSearch className="search-iconn" />
          <input 
            type="text" 
            placeholder="Search Projects" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FILTERS */}
        <div className="filters">
          {/* Department Filter */}
          <div className="custom-select">
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <span className="select-label">Department:</span>
            <span className="select-arrow">▼</span>
          </div>

          {/* Year Filter */}
          <div className="custom-select">
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All</option>
              {academicYears.map((year) => (
                <option key={year.id} value={year.code}>
                  {year.code}
                </option>
              ))}
            </select>
            <span className="select-label">Year:</span>
            <span className="select-arrow">▼</span>
          </div>

          {/* Category Filter */}
          <div className="custom-select">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="AI">AI</option>
              <option value="Web">Web</option>
              <option value="Mobile">Mobile</option>
              <option value="IoT">IoT</option>   {/* إضافة خيار IoT */}
            </select>
            <span className="select-label">Category:</span>
            <span className="select-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* العرض الشرطي لنتائج الفلترة والبحث الموحد */}
      {isFilteringActive ? (
        <div className="section">
          <h2>Filtered Results ({filteredProjects.length})</h2>
          {filteredProjects.length > 0 ? (
            <div className="cards-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={`${project.projectType}-${project.id}`}
                  id={project.id}
                  title={project.title}
                  department={project.department_name}
                  year={project.year}
                  description={project.description}
                  tags={project.technologies}
                  favorite={project.favorite}
                  type={project.projectType}
                  onFavoriteClick={handleFavorite}
                />
              ))}
            </div>
          ) : (
            <p>No projects match the selected filters.</p>
          )}
        </div>
      ) : (
        <>
          <Section
            title="Previous Projects"
            data={previousProjects}
            type="previous"
            onFavoriteClick={handleFavorite}
          />
          <Section
            title="Suggested Projects"
            data={suggestions}
            type="suggested"
            onFavoriteClick={handleFavorite}
          />
        </>
      )}
    </div>
  );
}