import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Admin from "../services/Admin.model";
import "./AllTeams.css";
import { useNavigate } from "react-router-dom";
const TeamsPage = () => {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [capstones, setCapstones] = useState([]);
  const [selectedCapstone, setSelectedCapstone] = useState("");
  const [teams, setTeams] = useState([]);
  const [, setLoading] = useState(false);

  const [statistics, setStatistics] = useState({});
  const [academicYear, setAcademicYear] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    loadStatuses();
    loadCapstones();
  }, []);

  useEffect(() => {
    loadTeams();
  }, [selectedStatus, selectedCapstone]);

  const loadTeams = async () => {
    console.log("loadTeams called");
    try {
      setLoading(true);
      const params = {};
      if (selectedStatus !== "all") params.status = selectedStatus;
      if (selectedCapstone) params.project_course_id = selectedCapstone;

      const response = await Admin.getAllTeams(params);
      console.log(response);
      console.log(response.statistics);
      console.log(response.academic_year);
      setTeams(response || []);
      setStatistics(response.statistics || {});
      setAcademicYear(response.academic_year || {});
      console.log(academicYear)
    } catch (error) {
      console.error("Error loading teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCapstones = async () => {
    try {
      const response = await Admin.getCapastone();
      setCapstones(response || []);
    } catch (error) {
      console.error("Error loading capstones:", error);
    }
  };

  const loadStatuses = async () => {
    try {
      const response = await Admin.getTeamStatus();
      setStatuses(response || []);
    } catch (error) {
      console.error("Error loading team statuses:", error);
    }
  };

  return (
    <Box className="page-wrapper teams-layout">
      <Sidebar />

      <Box className="teams-content main-content">
        <Header />

        <Box className="teams-container">
          {/* Header Section */}
          <Box className="top-section">
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#222" }}>
                All Teams
              </Typography>
              <Typography className="year-text">
                Academic Year{" "}

                <span style={{ fontFamily: "serif", fontStyle: "italic" }}>
                  {academicYear?.code}
                </span>
              </Typography>

              <Box className="stats-container">
                <Chip
                  icon={
                    <span style={{ color: "#2e7d32", marginLeft: "5px" }}>
                      ✓
                    </span>
                  }
                  label={<strong>20</strong> + " Teams On Track"}
                  className="status-summary-chip track-chip"
                />
                <Chip
                  label={`${statistics.delayed_teams_count || 0} Delayed Teams`}
                />
              </Box>
            </Box>

          </Box>

          {/* Search & Filters */}
          <Box className="filter-row">
            <TextField
              className="search-input"
              placeholder="Search by team, project, or student"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "#999" }} />,
              }}
            />

            <Box className="dropdown-group">
              <FormControl size="small" className="filter-dropdown">
                <Select defaultValue="all" displayEmpty>
                  <MenuItem value="all">
                    Department: <span className="blue-text">All</span>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" className="filter-dropdown">
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">
                    Status: <span className="blue-text">All</span>
                  </MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" className="filter-dropdown">
                <Select
                  value={selectedCapstone}
                  onChange={(e) => setSelectedCapstone(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">
                    Capstone: <span className="blue-text">1</span>
                  </MenuItem>
                  {capstones.map((capstone) => (
                    <MenuItem key={capstone.id} value={capstone.id}>
                      {capstone.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Grid container spacing={4} alignItems="stretch">
            {teams.map((team) => (
              <Grid item xs={12} md={6} key={team.id} style={{ display: "flex" }}>
                <Card
                  className={`team-card ${team.status === "Delayed" ? "delayed-border" : ""}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box className="card-content">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
                      alt="project"
                      className="project-image"
                    />

                    <Typography className="project-title">
                      {team.project?.title || "Blockchain-based Certificate"}
                    </Typography>

                    <Typography className="project-desc">
                      {team.project?.description || "No description available"}
                    </Typography>

                    <Box className="tech-tags">
                      <Box className="tech-tags">
                        {team.project?.technologies
                          ?.split(",")
                          .map((tech) => (
                            <Chip
                              key={tech}
                              label={tech.trim()}
                              size="small"
                              className="tech-chip"
                            />
                          ))}
                      </Box>
                    </Box>

                    <Typography className="members-count-text">
                      Members:
                      <span className="blue-text">
                        {team.members_count}
                      </span>
                    </Typography>
                    <AvatarGroup max={4}>
                      {team.members?.map((member) => (
                        <Avatar key={member.id}>
                          {member.name?.charAt(0)}
                        </Avatar>
                      ))}
                    </AvatarGroup>

                    <Box className="status-row">
                      {team.current_milestone_status === "delayed" ? (
                        <span className="status-delayed">
                          ⚠ Delayed
                        </span>
                      ) : team.current_milestone_status === "pending_submission" ? (
                        <span className="status-pending">
                          ⏳ Pending Submission
                        </span>
                      ) : (
                        <span className="status-ontrack">
                          ✓ On Track
                        </span>
                      )}
                    </Box>

                    <Box className="supervisors-section">
                      <Typography variant="caption">
                        Doctor:
                        <span className="blue-text font-bold">
                          {team.supervisors?.doctor?.name}
                        </span>
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Teacher Assistant:
                        <span className="blue-text font-bold">
                          {team.supervisors?.ta?.name}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                  {/* Button Centered at the very bottom */}
                  <Box className="card-action-row">
                    <Button
                      variant="contained"
                      className="view-btnn"
                      onClick={() => navigate(`/team-details/${team.id}`)}
                    >
                      View Team
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamsPage;
