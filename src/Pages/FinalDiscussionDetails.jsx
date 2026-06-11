import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Admin from "../services/Admin.model";

import {
  Box,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

import "./FinalDiscussionDetails.css";

export default function FinalDiscussionDetails() {
  const { id } = useParams();

  const [data, setData] = useState(null);
const projectImage =
  "https://cdn-icons-png.flaticon.com/512/8637/8637099.png";
  useEffect(() => {
    getTeam();
  }, []);

  const getTeam = async () => {
    try {
      const res = await Admin.viewTeams(id);
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return null;

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="discussion-details-page">
          <div className="details-wrapper">

            {/* LEFT */}

            <Paper className="project-card">

              <Typography
                variant="h5"
                fontWeight={700}
              >
                {data.project.title}
              </Typography>

              <img
                src={projectImage}
                 
            
                alt=""
                className="project-image"
              />

              <Typography className="project-description">
                {data.project.description}
              </Typography>

              <div className="problem-section">
                <Typography
                  fontWeight={700}
                >
                  Problem Statement
                </Typography>

                <Typography>
                  {data.project.problem_statement}
                </Typography>
              </div>

            </Paper>

            {/* RIGHT */}

            <div className="side-section">

              {/* Members */}

              <Paper className="side-card">

                <Typography
                  fontWeight={700}
                  mb={2}
                >
                  Members
                </Typography>

                <div className="members-grid">
                  {data.team.members.map(
                    (member) => (
                      <div
                        key={member.id}
                        className="member-item"
                      >
                        <Avatar
                          src={member.image}
                        />

                        <Typography
                          variant="caption"
                        >
                          {member.name}
                        </Typography>
                      </div>
                    )
                  )}
                </div>

              </Paper>

              {/* Supervision */}

              <Paper className="side-card">

                <Typography
                  fontWeight={700}
                  mb={2}
                >
                  Supervision
                </Typography>

                <div className="supervision-list">

                  <div className="supervisor-item">
                    <Avatar />

                    <Typography>
                      {
                        data.supervisors
                          .doctor?.name
                      }
                    </Typography>
                  </div>

                  <div className="supervisor-item">
                    <Avatar />

                    <Typography>
                      {
                        data.supervisors.ta
                          ?.name
                      }
                    </Typography>
                  </div>

                </div>

              </Paper>

              {/* Tech Stack */}

              <Paper className="side-card">

                <Typography
                  fontWeight={700}
                  mb={2}
                >
                  Tech Stack
                </Typography>

                {data.project.technologies
                  ?.split(",")
                  .map((tech) => (
                    <Typography
                      key={tech}
                      className="tech-item"
                    >
                      • {tech.trim()}
                    </Typography>
                  ))}

              </Paper>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}