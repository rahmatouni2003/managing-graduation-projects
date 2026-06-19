import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  FaCalendarAlt,
  FaRegCircle,
  FaEdit,
  FaTimesCircle,
  FaLock,
  FaLockOpen,
  FaFolderOpen
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Project from "../services/Project.model";
import Admin from "../services/Admin.model";
import "./MilestonesSetup.css";
import toast from "react-hot-toast";

export default function MilestonesSetup() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // 1. إضافة State جديدة لإدارة الـ Tabs (Capstone 1 أو Capstone 2) الافتراضي هو 1
  const [activeCapstoneTab, setActiveCapstoneTab] = useState(1); 
  
  const navigate = useNavigate();
  const [notes, setNotes] = useState({});
  const [anchorElTemplate, setAnchorElTemplate] = useState(null);
  const openTemplate = Boolean(anchorElTemplate);
  const [academicYear, setAcademicYear] = useState("");

  const getAcademicYear = async () => {
    try {
      const response = await Project.getAcademicYears();
      const activeYear = response?.find((year) => year.is_active === 1);
      setAcademicYear(activeYear?.code || "");
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }
  };

  const handleTemplateClose = () => setAnchorElTemplate(null);

  useEffect(() => {
    getMilestones(true);
    getAcademicYear();
  }, []);

  const getMilestones = async (isFirstLoad = false) => {
    try {
      if (isFirstLoad) setLoading(true); 
      
      const response = await Admin.getMilestones();
      const data = response || [];

      setMilestones(data.sort((a, b) => a.phase_number - b.phase_number));

      const initialNotes = {};
      data.forEach((m) => {
        initialNotes[m.id] = m.notes || "";
      });

      setNotes(initialNotes);
    } catch (error) {
      console.error("Error fetching milestones:", error);
      toast.error("Failed to refresh milestones data");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSubmission = async (milestoneId) => {
    try {
      await Admin.toggleMilestoneStatus(milestoneId);
      toast.success("Submission status updated");
      getMilestones();
    } catch (error) {
      toast.error("Failed to update submission status");
      console.error(error);
    }
  };

  const handleToggleOpenClose = async (milestoneId) => {
    try {
      const response = await Admin.toggleOpenClose(milestoneId);
      if (response && response.message) {
        toast.success(response.message);
      } else {
        toast.success("Status updated successfully");
      }
      getMilestones();
    } catch (error) {
      console.error("Error toggling milestone open/close status:", error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleAddNotes = async (milestoneId) => {
    try {
      await Admin.addNotes(milestoneId, {
        notes: notes[milestoneId],
      });
      toast.success("Notes added successfully");
      getMilestones();
    } catch (error) {
      console.error("Error adding notes:", error);
      toast.error(error?.response?.data?.message || "Failed to add notes");
    }
  };

  // 2. تحديث منطق الفلترة ليشمل تصفية الـ Tabs (project_course_id) والـ Status معاً
  const filteredMilestones = milestones.filter((m) => {
    // أولاً: التأكد من مطابقة الـ Capstone Tab المختار (1 أو 2)
    if (Number(m.project_course_id) !== activeCapstoneTab) return false;

    // ثانياً: تطبيق فلتر الحالة (All, On Progress, Completed, Pending)
    const currentStatus = m.status.toLowerCase();
    if (activeFilter === "all") return true;
    if (activeFilter === "onProgress") {
      return currentStatus === "on_progress" || currentStatus === "on progress" || currentStatus === "active";
    }
    return currentStatus === activeFilter.toLowerCase();
  });

  // 3. تحديث العدادات (Counts) لتتوافق ديناميكياً مع الـ Tab المفتوح حالياً فقط
  const getCount = (status) => {
    // فلترة العناصر التي تنتمي للـ Tab الحالي أولاً قبل حساب العداد
    const capstoneSpecificMilestones = milestones.filter(m => Number(m.project_course_id) === activeCapstoneTab);

    if (status === "all") return capstoneSpecificMilestones.length;
    if (status === "on_progress") {
      return capstoneSpecificMilestones.filter(m => {
        const s = m.status.toLowerCase();
        return s === "on_progress" || s === "on progress" || s === "active";
      }).length;
    }
    return capstoneSpecificMilestones.filter(m => m.status.toLowerCase() === status.toLowerCase()).length;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Box className="admin-layout">
      <Sidebar />

      <Box className="main-content">
        <Header />

        <Box className="page-content">
          <Typography variant="h4" className="page-title">
            Milestones Setup
          </Typography>

          <Paper elevation={0} className="setup-header-card">
            <Box className="shc-top">
              <Box>
                <Typography variant="h6" fontWeight={700} className="shc-title">
                  Graduation Project Standard Milestones
                </Typography>
                <Box className="shc-meta-row">
                  <Typography variant="body2">
                    Academic Year:{" "}
                    <span className="text-dark">
                      {academicYear || "Loading..."}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Menu anchorEl={anchorElTemplate} open={openTemplate} onClose={handleTemplateClose}>
                <MenuItem onClick={handleTemplateClose}>Milestone 2023-2024</MenuItem>
                <MenuItem onClick={handleTemplateClose}>Milestone 2024-2025</MenuItem>
              </Menu>
            </Box>

            {/* 4. ربط الأزرار (Chips) بالـ State الجديدة والتحكم في كلاس النشاط (active) */}
            <Box className="shc-bottom-pills">
              <Chip 
                label="Capstone 1" 
                color={activeCapstoneTab === 1 ? "primary" : "default"} 
                variant={activeCapstoneTab === 1 ? "filled" : "outlined"}
                className={`capstone-chip ${activeCapstoneTab === 1 ? "active" : ""}`} 
                onClick={() => setActiveCapstoneTab(1)}
              />
              <Chip 
                label="Capstone 2" 
                color={activeCapstoneTab === 2 ? "primary" : "default"} 
                variant={activeCapstoneTab === 2 ? "filled" : "outlined"}
                className={`capstone-chip ${activeCapstoneTab === 2 ? "active" : ""}`} 
                onClick={() => setActiveCapstoneTab(2)}
              />
            </Box>
          </Paper>

          <Box className="filters-row">
            <Chip
              label={`All (${getCount("all")})`}
              className={`filter-pill ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            />
            <Chip
              label={`On Progress (${getCount("on_progress")})`}
              className={`filter-pill ${activeFilter === "onProgress" ? "active" : ""}`}
              onClick={() => setActiveFilter("onProgress")}
            />
            <Chip
              label={`Completed (${getCount("completed")})`}
              className={`filter-pill ${activeFilter === "completed" ? "active" : ""}`}
              onClick={() => setActiveFilter("completed")}
            />
            <Chip
              label={`Pending (${getCount("pending")})`}
              className={`filter-pill ${activeFilter === "pending" ? "active" : ""}`}
              onClick={() => setActiveFilter("pending")}
            />
          </Box>

          {loading ? (
            <Box className="loading-wrapper">
              <CircularProgress />
            </Box>
          ) : (
            <Box className="timeline-wrapper">
              <div className="timeline-line"></div>

              {filteredMilestones.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", mt: 4, color: "#777" }}>
                  No milestones found for this selection.
                </Typography>
              ) : (
                filteredMilestones.map((milestone) => {
                  const currentStatus = milestone.status.toLowerCase();
                  const isCompleted = currentStatus === "completed";
                  const statusClass = currentStatus.replace(/[\s_]+/g, '');

                  return (
                    <Box key={milestone.id} className="timeline-item">
                      <div className={`timeline-dot status-${statusClass}`}>
                        <FaRegCircle />
                      </div>

                      <Paper elevation={0} className="milestone-card">
                        <Box className="card-top">
                          <Box className="card-info-side">
                            <Typography variant="h6" fontWeight={700} className="milestone-card-title">
                              Phase {milestone.phase_number} : {milestone.title}
                            </Typography>

                            <ul className="requirements-list">
                              {milestone.requirements && milestone.requirements.map((req) => (
                                <li key={req.id}>
                                  <Typography variant="body2">{req.requirement}</Typography>
                                </li>
                              ))}
                            </ul>
                          </Box>

                          <Box className="chips-column">
                            <Chip
                              label={`${parseInt(milestone.max_score)} Marks`}
                              className="mark-badge"
                              size="small"
                            />
                            <Chip
                              label={
                                currentStatus === "on_progress" || currentStatus === "on progress"
                                  ? "On Progress"
                                  : currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)
                              }
                              className={`status-badge ${statusClass}`}
                            />
                          </Box>
                        </Box>

                        <Box
                          className="date-display-row"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <FaCalendarAlt className="calendar-icon" />
                            <Typography variant="body2" className="date-text">
                              {isCompleted
                                ? `Submitted: ${formatDate(milestone.updated_at)}`
                                : `Due: ${formatDate(milestone.deadline)}`
                              }
                            </Typography>
                          </Box>

                          {!isCompleted && (
                            <Button
                              size="small"
                              variant="contained"
                              className="main-update-btn"
                              onClick={() =>
                                navigate(`/milestones/edit/${milestone.id}`, {
                                  state: { focusDeadline: true },
                                })
                              }
                            >
                              Update
                            </Button>
                          )}
                        </Box>

                        {!isCompleted && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              width: "100%",
                              mt: 2,
                            }}
                          >
                            <Box
                              sx={{
                                flex: 1,
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                px: 2,
                                py: 1,
                              }}
                            >
                              <InputBase
                                fullWidth
                                placeholder="Add notes for students"
                                value={notes[milestone.id] || ""}
                                onChange={(e) =>
                                  setNotes((prev) => ({
                                    ...prev,
                                    [milestone.id]: e.target.value,
                                  }))
                                }
                              />
                            </Box>

                            <Button
                              variant="contained"
                              onClick={() => handleAddNotes(milestone.id)}
                            >
                              Submit
                            </Button>
                          </Box>
                        )}

                        <Box className="card-footer">
                          <Box className="footer-left-side">
                            {isCompleted && (
                              <Button 
                                variant="outlined" 
                                startIcon={milestone.is_open ? <FaLock /> : <FaFolderOpen />} 
                                className="reopen-btn"
                                onClick={() => handleToggleOpenClose(milestone.id)}
                                sx={{
                                  borderColor: milestone.is_open ? "#d32f2f" : "#1976d2",
                                  color: milestone.is_open ? "#d32f2f" : "#1976d2",
                                  "&:hover": {
                                    borderColor: milestone.is_open ? "#c62828" : "#115293",
                                    backgroundColor: milestone.is_open ? "#fdecea" : "#f0f7ff",
                                  }
                                }}
                              >
                                {milestone.is_open ? "Close Submissions" : "Reopen"}
                              </Button>
                            )}
                          </Box>

                          {!isCompleted && (
                            <Box className="actions-btn-group">
                              <Button
                                variant="text"
                                startIcon={<FaEdit />}
                                className="action-text-btn"
                                onClick={() => navigate(`/milestones/edit/${milestone.id}`)}
                              >
                                Edit
                              </Button>
                              <Button variant="text" startIcon={<FaTimesCircle />} className="action-text-btn deactivate">
                                Deactivate
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={
                                  milestone.is_open ?<FaLock /> :<FaLockOpen /> 
                                }
                                className="close-sub-btn"
                                onClick={() => handleToggleSubmission(milestone.id)}
                              >
                                {milestone.is_open ? "Close Submissions" :"Open Submissions" }
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Paper>
                    </Box>
                  );
                })
              )}

              <Box className="add-new-milestone-container">
                <Button
                  variant="contained"
                  className="add-milestone-floating-btn"
                  onClick={() => navigate("/admin/milestones/add")}
                >
                  + Add New Milestone
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}