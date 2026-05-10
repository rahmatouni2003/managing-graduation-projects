// ProjectsPage.jsx
import "./projectsPage.css";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";

const previousProjects = [
  {
    id: 1,
    title: "Blockchain-based Certificate Verification",
    department: "CS Department",
    year: "2023",
    description:
      "A secure system built on blockchain technology to verify academic certificates and prevent fraud.",
    tags: ["CS", "Blockchain", "Web"],
    favorite: false,
  },
  {
    id: 2,
    title: "AI Mental Health Companion",
    department: "CS Department",
    year: "2024",
    description:
      "A mobile application that uses artificial intelligence to support mental health through personalized conversations.",
    tags: ["AI", "Healthcare", "Mobile"],
    favorite: false,
  },
  {
    id: 3,
    title: "IoT Smart Campus",
    department: "AI Department",
    year: "2023",
    description:
      "A smart campus system that uses IoT devices to monitor and manage energy consumption, security, and facilities.",
    tags: ["AI", "IoT", "Embedded"],
    favorite: false,
  },
];

const suggestions = [
  {
    id: 4,
    title: "AI-Powered Exam Proctoring",
    department: "CS Department",
    year: "2025",
    description:
      "An AI-driven system designed to monitor online exams, detect cheating behavior, and ensure exam integrity using webcam.",
    tags: ["CS", "AI", "Security"],
    favorite: true,
  },
  {
    id: 5,
    title: "VR Career Simulator",
    department: "IS Department",
    year: "2025",
    description:
      "A secure system built on blockchain technology to verify academic certificates and prevent fraud.",
    tags: ["IS", "VR"],
    favorite: false,
  },
  {
    id: 6,
    title: "AI-based Sign Language Translator",
    department: "AI Department",
    year: "2025",
    description:
      "A secure system built on blockchain technology to verify academic certificates and prevent fraud.",
    tags: ["CS", "AI"],
    favorite: true,
  },
];

function ProjectCard({
  title,
  department,
  year,
  description,
  tags,
  favorite,
}) {
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
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>

      <button className="details-btn">
        View Details →
      </button>
    </div>
  );
}

function Section({ title, data }) {
  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>

        <button>See all</button>
      </div>

      <div className="cards-grid">
        {data.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      {/* Filters */}
      <div className="top-bar">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Projects"
          />
        </div>

        <div className="filters">
          <select>
            <option>Department: All</option>
          </select>

          <select>
            <option>Year: All</option>
          </select>

          <select>
            <option>Category: All</option>
          </select>
        </div>
      </div>

      {/* Sections */}
      <Section
        title="Previous Projects"
        data={previousProjects}
      />

      <Section
        title="Suggestions"
        data={suggestions}
      />
    </div>
  );
}