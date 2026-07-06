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

        // The API returns { success, data }, so we unwrap `data`
        const payload = response?.data
          ? response.data
          : response;

        setProject(payload);

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

  // Everything related to the project's content
  // (title, description, technologies, etc.) lives
  // inside `proposal`.
  const proposal = project.proposal || {};

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
                {proposal.title}
              </h2>

              <span>
                {project.year}
              </span>

            </div>

            {proposal.attachment_file && (
              <a
                href={proposal.attachment_file}
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                <FaDownload />
              </a>
            )}

          </div>

          {/* IMAGE */}

          <img
 src={
            project.image_url ||
            `https://picsum.photos/1000/450?random=${project.id}`
          }
            alt={proposal.title}
            className="project-image"
          />

          {/* DESCRIPTION */}

          <p className="project-description">
            {proposal.description}
          </p>

          {/* PROBLEM */}

          {proposal.problem_statement && (
            <div className="problem-box">

              <div className="problem-title">

                <FaCircle />

                <h4>
                  Problem Statement
                </h4>

              </div>

              <p>
                {proposal.problem_statement}
              </p>

            </div>
          )}

          {/* SOLUTION (extra field from API) */}

          {proposal.solution && (
            <div className="problem-box">

              <div className="problem-title">

                <FaCircle />

                <h4>
                  Solution
                </h4>

              </div>

              <p>
                {proposal.solution}
              </p>

            </div>
          )}

          {/* GRADE */}

          {project.grade && (
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

              {project.graded_at && (
                <div className="feedback-footer">
                  <span>
                    Graded At: {project.graded_at}
                  </span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* RIGHT SIDE */}

        <div className="details-right">

          {/* PROJECT INFO (extra fields from API) */}

          {(proposal.category ||
            project.department ||
            project.project_type) && (
            <div className="side-card">

              <h3>
                Project Info
              </h3>

              {proposal.category && (
                <p>
                  <strong>Category:</strong>
                  {" "}
                  {proposal.category}
                </p>
              )}

              {project.department?.name && (
                <p>
                  <strong>Department:</strong>
                  {" "}
                  {project.department.name}
                </p>
              )}

              {project.project_type?.name && (
                <p>
                  <strong>Type:</strong>
                  {" "}
                  {project.project_type.name}
                </p>
              )}

            </div>
          )}

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
              {project.team?.name && (
                <span className="team-name">
                  {" "}
                  ({project.team.name})
                </span>
              )}
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
                        src={`https://i.pravatar.cc/150?u=${member.id}`}
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

                          {member.email &&
                            member.email !== "Unknown" && (
                              <p>
                                <strong>Email:</strong>
                                {" "}
                                {member.email}
                              </p>
                            )}

                          {member.department && (
                            <p>
                              <strong>Department:</strong>
                              {" "}
                              {member.department}
                            </p>
                          )}

                        </div>

                      </div>
                    )}

                  </div>
                )
              )}

            </div>

          </div>

          {/* SUPERVISION */}

          {project.team?.supervisors?.length > 0 && (
            <div className="side-card">

              <h3>
                Supervision
              </h3>

              <div className="members-list">

                {project.team.supervisors.map(
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
                        {supervisor.role && (
                          <>
                            {" "}
                            <em>({supervisor.role})</em>
                          </>
                        )}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* TECH STACK */}

          {proposal.technologies?.length > 0 && (
            <div className="side-card">

              <h3>
                Tech Stack
              </h3>

              <ul className="tech-list">

                {proposal.technologies.map(
                  (tech, index) => (
                    <li key={index}>
                      {tech}
                    </li>
                  )
                )}

              </ul>

            </div>
          )}

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
