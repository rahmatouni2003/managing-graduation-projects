import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  IconButton,
} from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EventIcon from "@mui/icons-material/Event";
import FlagIcon from "@mui/icons-material/Flag";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Admin from "../services/Admin.model";
import Project from "../services/Project.model";
import "./AllTeams.css";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TeamsPage = () => {
  // filters
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [capstones, setCapstones] = useState([]);
  const [selectedCapstone, setSelectedCapstone] = useState("");

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [editingYear, setEditingYear] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // data
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({});
  const [currentMilestones, setCurrentMilestones] = useState({});
  const [academicYearInfo, setAcademicYearInfo] = useState({});

  const navigate = useNavigate();

  // debounce the search box so we don't hit the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    loadStatuses();
    loadCapstones();
    loadDepartments();
    loadAcademicYears();
  }, []);

  useEffect(() => {
    loadTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedStatus,
    selectedCapstone,
    selectedDepartment,
    debouncedSearch,
    selectedAcademicYear,
  ]);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedStatus !== "all") params.status = selectedStatus;
      if (selectedCapstone) params.project_course_id = selectedCapstone;
      if (selectedDepartment !== "all")
        params.department_id = selectedDepartment;
      if (debouncedSearch) params.search = debouncedSearch;
      if (selectedAcademicYear) params.academic_year_id = selectedAcademicYear;

      const response = await Admin.getAllTeams(params, true);

      setTeams(response?.data || []); // <-- كانت response بس
      setStatistics(response?.statistics || {});
      setCurrentMilestones(response?.current_milestones || {});
      setAcademicYearInfo(response?.academic_year || {});
    } catch (error) {
      console.error("Error loading teams:", error);
      setTeams([]);
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

  const loadDepartments = async () => {
    try {
      const response = await Project.getDepartments();
      setDepartments(response || []);
    } catch (error) {
      console.error("Error loading departments:", error);
    }
  };

  const loadAcademicYears = async () => {
    try {
      const response = await Project.getAcademicYears();
      setAcademicYears(response || []);
      const active = (response || []).find((y) => y.is_active);
      if (active) setSelectedAcademicYear(active.id);
    } catch (error) {
      console.error("Error loading academic years:", error);
    }
  };

  const activeYearCode = useMemo(() => {
    const found = academicYears.find((y) => y.id === selectedAcademicYear);
    return found?.code || academicYearInfo?.code || "-";
  }, [academicYears, selectedAcademicYear, academicYearInfo]);

  // pick which milestone (project 1 / project 2) to show in the top-right banner,
  // based on the selected capstone / project course
  const activeMilestone = useMemo(() => {
    if (!currentMilestones) return null;
    const capstoneMeta = capstones.find((c) => c.id === selectedCapstone);
    if (capstoneMeta?.order === 2) return currentMilestones.project_2;
    if (capstoneMeta?.order === 1) return currentMilestones.project_1;
    return currentMilestones.project_1 || currentMilestones.project_2;
  }, [currentMilestones, capstones, selectedCapstone]);

  const statusMeta = (status) => {
    switch (status) {
      case "delayed":
        return { label: "Delayed", color: "#d32f2f", Icon: WarningAmberIcon };
      case "pending_submission":
        return {
          label: "Pending Submission",
          color: "#ed6c02",
          Icon: HourglassBottomIcon,
        };
      default:
        return { label: "On Track", color: "#2e7d32", Icon: CheckCircleIcon };
    }
  };

  return (
    <Box className="page-wrapper teams-layout">
      <Sidebar />

      <Box className="teams-content main-content">
        <Header />

        <Box className="teams-container" sx={{ p: 3 }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ color: "#1a1a2e" }}
              >
                All Teams
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                <Typography sx={{ color: "#777" }}>Academic Year</Typography>
                {editingYear ? (
                  <Select
                    size="small"
                    value={selectedAcademicYear || ""}
                    onChange={(e) => {
                      setSelectedAcademicYear(e.target.value);
                      setEditingYear(false);
                    }}
                    onBlur={() => setEditingYear(false)}
                    autoFocus
                    sx={{ ml: 1, height: 28 }}
                  >
                    {academicYears.map((y) => (
                      <MenuItem key={y.id} value={y.id}>
                        {y.code}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <>
                    <Typography
                      sx={{
                        fontStyle: "italic",
                        fontFamily: "serif",
                        color: "#1976d2",
                      }}
                    >
                      {activeYearCode}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setEditingYear(true)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </>
                )}
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, mt: 1.5 }}>
                <Chip
                  icon={
                    <CheckCircleIcon sx={{ color: "#2e7d32 !important" }} />
                  }
                  label={
                    <span>
                      <strong>{statistics.on_track ?? 0}</strong> Teams On Track
                    </span>
                  }
                  sx={{ bgcolor: "#e8f5e9", fontWeight: 500 }}
                />
                <Chip
                  icon={
                    <WarningAmberIcon sx={{ color: "#d32f2f !important" }} />
                  }
                  label={
                    <span>
                      <strong>{statistics.delayed_teams_count ?? 0}</strong>{" "}
                      Teams At Risk
                    </span>
                  }
                  sx={{ bgcolor: "#fdecea", fontWeight: 500 }}
                />
              </Box>
            </Box>

            {activeMilestone && (
              <Card
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  minWidth: 260,
                  bgcolor: "#fafbff",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FlagIcon fontSize="small" sx={{ color: "#1976d2" }} />
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Milestone:{" "}
                    <strong style={{ color: "#1976d2" }}>
                      {activeMilestone.title}
                    </strong>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <EventIcon fontSize="small" sx={{ color: "#1976d2" }} />
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Deadline:{" "}
                    <strong>{formatDate(activeMilestone.deadline)}</strong>
                  </Typography>
                </Box>
              </Card>
            )}
          </Box>

          {/* Search & Filters */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              mb: 3,
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Search by team, project, or student"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1, minWidth: 260, bgcolor: "#fff", borderRadius: 2 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "#999" }} />,
              }}
            />

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="all">
                    Department: <span className="blue-text">&nbsp;All</span>
                  </MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">
                    Status: <span className="blue-text">&nbsp;All</span>
                  </MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 170 }}>
                <Select
                  value={selectedCapstone}
                  onChange={(e) => setSelectedCapstone(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">
                    Capstone: <span className="blue-text">&nbsp;All</span>
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

          {loading && (
            <Typography sx={{ color: "#999", mb: 2 }}>
              Loading teams...
            </Typography>
          )}

          {!loading && teams.length === 0 && (
            <Typography sx={{ color: "#999", mb: 2 }}>
              No teams found.
            </Typography>
          )}

          <Grid container spacing={3} alignItems="stretch">
            {teams.map((team) => {
              const { label, color, Icon } = statusMeta(
                team.current_milestone_status,
              );
              const isDelayed = team.current_milestone_status === "delayed";

              return (
                // xs={12} تعني كارت واحد في الموبايل، sm={6} تعني كارتين بجانب بعضهما في الشاشات الأكبر
                <Grid
                  item
                  xs={12}
                  sm={3}
                  key={team.id}
                  sx={{ display: "flex" }}
                >
                  <Card
                    sx={{
                      width: "510px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      overflow: "hidden",
                      border: isDelayed
                        ? "2px solid #ef5350"
                        : "1px solid #eee",
                      boxShadow: isDelayed
                        ? "0 4px 18px rgba(239,83,80,0.15)"
                        : "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={team.project?.image_url || FALLBACK_IMAGE}
                        alt="project"
                        sx={{
                          width: "100%",
                          height: 160,
                          objectFit: "cover",
                          borderRadius: 3,
                          mb: 1.5,
                        }}
                      />

                      <Typography fontWeight={700} sx={{ color: "#1a1a2e" }}>
                        {team.project?.title || "Untitled project"}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#777", fontStyle: "italic", my: 0.5 }}
                      >
                        "
                        {team.project?.description ||
                          "No description available"}
                        "
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          my: 1,
                        }}
                      >
                        {team.department?.name && (
                          <Chip
                            label={team.department.name}
                            size="small"
                            sx={{
                              bgcolor: "#e3f2fd",
                              color: "#1976d2",
                              fontWeight: 600,
                            }}
                          />
                        )}
                        {team.project?.technologies?.split(",").map((tech) => (
                          <Chip
                            key={tech}
                            label={tech.trim()}
                            size="small"
                            sx={{ bgcolor: "#f0f0f0" }}
                          />
                        ))}
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ color: "#555", mb: 0.5 }}
                      >
                        Members:{" "}
                        <span className="blue-text" style={{ fontWeight: 600 }}>
                          {team.members_count}
                        </span>
                      </Typography>

                      <AvatarGroup
                        max={4}
                        sx={{ justifyContent: "flex-end", mb: 1 }}
                      >
                        {team.members?.map((member) => (
                          <Avatar
                            key={member.id}
                            sx={{ width: 30, height: 30, fontSize: 14 }}
                          >
                            {member.name?.charAt(0)?.toUpperCase()}
                          </Avatar>
                        ))}
                      </AvatarGroup>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color,
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        <Icon fontSize="small" />
                        <Typography
                          variant="body2"
                          sx={{ color, fontWeight: 600 }}
                        >
                          {label}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: "auto" }}>
                        <Typography variant="caption" display="block">
                          Doctor:{" "}
                          <span className="blue-text font-bold">
                            {team.supervisors?.doctor?.name || "Not assigned"}
                          </span>
                        </Typography>
                        <Typography variant="caption" display="block">
                          Teacher Assistant:{" "}
                          <span className="blue-text font-bold">
                            {team.supervisors?.ta?.name || "Not assigned"}
                          </span>
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ px: 2, pb: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          bgcolor: "#1976d2",
                          "&:hover": { bgcolor: "#1565c0" },
                        }}
                        onClick={() => navigate(`/team-details/${team.id}`)}
                      >
                        View Team
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamsPage;
