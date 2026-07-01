import "./PreviuosProjectDetails.css";

import {
  FaArrowLeft,
  FaDownload,
  FaBell,
  FaShareAlt,
  FaFolderOpen,
  FaGithub,
  FaCircle,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Project from "../Services/Project.model";

function PreviuosProjectDetails() {

  const { id } = useParams();
const [hoveredMember, setHoveredMember] =
  useState(null);
  const navigate = useNavigate();

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProjectDetails();

  }, [id]);

  const fetchProjectDetails =
    async () => {

      try {

        setLoading(true);

        const response =
          await Project.getProjectDetails(id);

        setProject(response);

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

    <div className="project-wrapper">



      <div className="details-page">

        {/* LEFT SIDE */}

        <div className="details-left">

          {/* HEADER */}

          <div className="details-header">

            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </button>

            <div className="title-box">

              <h2>
                {project.title}
              </h2>

              <span>
                {project.year}
              </span>

            </div>

            <a
              href={project.attachment_file}
              target="_blank"
              rel="noreferrer"
              className="download-btn"
            >
              <FaDownload />
            </a>

          </div>

          {/* IMAGE */}

          <img
            src={
              project.image_url ||
              "https://via.placeholder.com/800x400"
            }
            alt={project.title}
            className="project-image"
          />

          {/* DESCRIPTION */}

          <p className="project-description">
            {project.description}
          </p>

          {/* PROBLEM */}

          <div className="problem-box">

            <div className="problem-title">

              <FaCircle />

              <h4>
                Problem Statement
              </h4>

            </div>

            <p>
              {project.problem_statement}
            </p>

          </div>

          {/* GRADE */}

          <div className="grade-box">

            <h4>
              Grade
            </h4>

            <span className="final-score">
              Final Score
            </span>

            <div className="grade-score">
              {project.grade}%
            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${project.grade}%`,
                }}
              ></div>

            </div>

          </div>

          {/* FEEDBACK */}

          <div className="feedback-box">

            <h4>
              Feedback
            </h4>

            <p>
              {project.feedback?.text ||
                "No Feedback Yet"}
            </p>

            <div className="feedback-footer">

              <span>
                Graded By:
                {" "}
                {project.feedback
                  ?.graded_by || "-"}
              </span>

              <span>
                November 16, 2024
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="details-right">

          {/* RESOURCES */}

          <div className="side-card">

            <h3>
              Resources
            </h3>

            <a href="#">
              <FaFolderOpen />
              Documentation
            </a>

            <a href="#">
              <FaGithub />
              Source Code
            </a>

          </div>

          {/* MEMBERS */}

          <div className="side-card">

            <h3>
              Members
            </h3>

<div className="members-list">

  {project.team?.members?.map(
    (member) => (

      <div
        className="member-wrapper"
        key={member.id}
        onMouseEnter={() =>
          setHoveredMember(member)
        }
        onMouseLeave={() =>
          setHoveredMember(null)
        }
      >

        <div className="member-item">

          <img
          src={project.image_url || `https://picsum.photos/1000/450?random=${project.id}`}
            alt={member.name}
          />

          <span>
            {member.name}
          </span>

        </div>

        {/* Hover Card */}

        {hoveredMember?.id === member.id && (

          <div className="member-card">

            <div className="member-card-header">

              <img
                src={`https://i.pravatar.cc/150?u=${member.id}`}
                alt={member.name}
              />

              <div>

                <h4>
                  {member.name}
                </h4>

                <p>
                  {member.track}
                </p>

              </div>

            </div>

            <div className="member-info">

              <p>
                <strong>Role:</strong>
                {" "}
                {member.role}
              </p>

              <p>
                <strong>Email:</strong>
                {" "}
                {member.email}
              </p>

              <p>
                <strong>Department:</strong>
                {" "}
                {member.department || "-"}
              </p>

            </div>

          </div>
        )}

      </div>
    )
  )}

</div>

          </div>

          {/* SUPERVISION */}

          <div className="side-card">

            <h3>
              Supervision
            </h3>

            <div className="members-list">

              {project.team?.supervisors?.map(
                (supervisor) => (

                  <div
                    className="member-item"
                    key={supervisor.id}
                  >

                    <img
                      src={`https://i.pravatar.cc/150?u=${supervisor.id}`}
                      alt=""
                    />

                    <span>
                      {supervisor.name}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

          {/* TECH STACK */}

          <div className="side-card">

            <h3>
              Tech Stack
            </h3>

            <ul className="tech-list">

              {project.technologies?.map(
                (tech, index) => (
                  <li key={index}>
                    {tech}
                  </li>
                )
              )}

            </ul>

          </div>

          {/* SHARE */}

          <button className="share-btn">

            <FaShareAlt />

            Share with Team

          </button>

        </div>

      </div>

    </div>
  );
}

export default PreviuosProjectDetails;