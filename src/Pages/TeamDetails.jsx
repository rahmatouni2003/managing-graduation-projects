import {
  Box,
  Card,
  Typography,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TextField 
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useParams } from "react-router-dom";
import Admin from "../services/Admin.model";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast";;
export default function TeamDetails() {
  const { id } = useParams();
  const submittedFilesRef = useRef(null);
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingMilestone, setEditingMilestone] = useState(null);
const [grades, setGrades] = useState({});
const [saving, setSaving] = useState(false);
useEffect(() => {
  const milestonesData =
    teamData?.courses?.flatMap(
      (course) => course.milestones
    ) || [];

  if (milestonesData.length) {
    const initialGrades = {};

    milestonesData.forEach((milestone) => {
      initialGrades[milestone.id] =
        milestone.grade?.grade || "";
    });

    setGrades(initialGrades);
  }
}, [teamData]);
const handleSaveGrade = async (milestoneId) => {
  try {
    setSaving(true);

    await Admin.updaTemilestoneCommittees({
      team_id: Number(id),
      milestone_id: milestoneId,
      grade: Number(grades[milestoneId]),
    });

    toast.success("Grade updated successfully");

    setEditingMilestone(null);

    await loadTeamDetails();
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed to update grade"
    );
  } finally {
    setSaving(false);
  }
};
  const loadTeamDetails = async () => {
    try {
      setLoading(true);

      const response = await Admin.getTeamDetails(id);

      setTeamData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTeamDetails();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  const currentCourse = teamData?.courses?.find(
    (course) => course.current_milestone,
  );
  const milestones =
    teamData?.courses?.flatMap(
      course => course.milestones
    ) || [];
  const renderStatus = (status) => {
    switch (status) {
      case "completed":
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ color: "#22c55e" }}
          >
            <CheckIcon fontSize="small" sx={{ fontSize: 12 }} />
            <Typography fontSize="11px" fontWeight="bold">
              Completed
            </Typography>
          </Box>
        );

      case "in_progress":
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ color: "#f59e0b" }}
          >
            <HourglassEmptyIcon fontSize="small" sx={{ fontSize: 12 }} />
            <Typography fontSize="11px" fontWeight="bold">
              In Progress
            </Typography>
          </Box>
        );

      case "locked":
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ color: "#94a3b8" }}
          >
            <LockIcon fontSize="small" sx={{ fontSize: 12 }} />
            <Typography fontSize="11px" fontWeight="bold">
              Locked
            </Typography>
          </Box>
        );

      case "delayed":
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ color: "#ef4444" }}
          >
            <CloseIcon fontSize="small" sx={{ fontSize: 12 }} />
            <Typography fontSize="11px" fontWeight="bold">
              Delayed
            </Typography>
          </Box>
        );

      default:
        return (
          <Typography fontSize="11px" fontWeight="bold">
            {status}
          </Typography>
        );
    }
  };
  const teamStatus =
    teamData?.overall_progress >= 80
      ? "Excellent"
      : teamData?.overall_progress >= 50
        ? "On Track"
        : "At Risk";
  const team = teamData?.team;
  const project = teamData?.project;
  const supervisors = teamData?.supervisors;
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f1f5f9",
        minHeight: "100vh",
        marginTop: "64px",
      }}
    >
      <Sidebar />

      <Box
        sx={{ flex: 1, ml: "260px", display: "flex", flexDirection: "column" }}
      >
        <Header />

        <Box sx={{ p: 3, maxWidth: "1280px", width: "100%", mx: "auto" }}>
          <Card
            sx={{
              borderRadius: "16px",
              p: 2.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={5.5}>
                <Box
                  sx={{
                    position: "relative",
                    height: 210,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                    alt="Project Thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Chip
                    label={currentCourse?.title}
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "#d8ff4f",
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "11px",
                      height: "24px",
                      borderRadius: "6px",
                    }}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={6.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="700"
                    color="#1e293b"
                    sx={{ mb: 1 }}
                  >
                    {project?.title}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <Typography
                      fontSize="14px"
                      fontWeight="600"
                      color="#475569"
                    >
                      Team #{team?.id} :
                    </Typography>
                    <Chip
                      icon={
                        <CheckCircleIcon
                          style={{ color: "#fff", fontSize: 14 }}
                        />
                      }
                      label={teamStatus}
                      size="small"
                      sx={{
                        bgcolor:
                          teamStatus === "Excellent"
                            ? "#22c55e"
                            : teamStatus === "On Track"
                              ? "#f59e0b"
                              : "#ef4444",
                        color: "#fff",
                        fontWeight: "600",
                        height: "22px",
                      }}
                    />
                  </Box>

                  <Typography color="#94a3b8" fontSize="11px" lineHeight={1.5}>
                    {project?.description}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "#f8fafc",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box>
                    <Typography>
                      Current Milestone:
                      <span style={{ color: "#3b82f6" }}>
                        {currentCourse?.current_milestone?.title}
                      </span>
                    </Typography>

                    <Typography
                      fontSize="12px"
                      color="#1e293b"
                      fontWeight="600"
                      mt={0.5}
                    >
                      Deadline:{" "}
                      <span style={{ color: "#64748b", fontWeight: "normal" }}>
                        Jan 30, 2026
                      </span>
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<FolderOpenIcon sx={{ fontSize: 16 }} />}
                    onClick={() =>
                      submittedFilesRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                    sx={{
                      textTransform: "none",
                      borderRadius: "6px",
                      borderColor: "#cbd5e1",
                      color: "#1e293b",
                      fontSize: "12px",
                      fontWeight: "600",
                      py: 0.5,
                      px: 1.5,
                      bgcolor: "#fff",
                    }}
                  >
                    View All Files
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>

          <Card
            sx={{
              borderRadius: "16px",
              p: 2.5,
              mb: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <ErrorOutlineIcon sx={{ color: "#f43f5e", fontSize: 18 }} />
              <Typography fontWeight="600" fontSize="14px" color="#475569">
                {project?.problem_statement}
              </Typography>
            </Box>
            <Typography
              color="#64748b"
              fontSize="13px"
              lineHeight={1.6}
            >
              {project?.solution}
            </Typography>
          </Card>

          <Grid container spacing={3} mb={3} alignItems="stretch">
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
              <Card
                sx={{
                  borderRadius: "16px",
                  p: 2.5,
                  width: "100%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                  mb={2.5}
                  sx={{ borderBottom: "1px solid #f1f5f9", pb: 1 }}
                >
                  <Typography fontWeight="700" color="#2563eb" fontSize="14px">
                    👥 Supervisors
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {[supervisors?.doctor?.name, supervisors?.ta?.name].map(
                    (name, idx) => (
                      <Box
                        key={idx}
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                      >
                        <Avatar sx={{ width: 28, height: 28 }} />
                        <Typography
                          fontSize="13px"
                          fontWeight="500"
                          color="#475569"
                        >
                          {name}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Card>
            </Grid>

            {/* Supervising Committee */}
            <Grid item size={{ xs: 12, md: 8 }} sx={{ display: "flex" }}>
              <Card
                sx={{
                  borderRadius: "16px",
                  p: 2.5,
                  width: "100%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                  mb={2.5}
                  sx={{ borderBottom: "1px solid #f1f5f9", pb: 1 }}
                >
                  <Typography fontWeight="700" color="#2563eb" fontSize="14px">
                    👥 Supervising Commitee
                  </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    {[
                      ...(teamData?.milestone_committee?.doctors || []),
                      ...(teamData?.milestone_committee?.tas || []),
                    ].map((member) => (
                      <Grid item xs={12} sm={6} key={member.id}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar />
                          <Typography>{member.name}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Card
            sx={{
              borderRadius: "16px",
              p: 3,
              mb: 3,
              boxShadow: "none",
              border: "1px solid #e2e8f0",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                fontWeight="700"
                color="#1e293b"
                fontSize="18px"
              >
                Team Progress
              </Typography>
              <Typography
                variant="h6"
                fontWeight="700"
                color="#1e293b"
                fontSize="16px"
              >
                {teamData?.overall_progress}% Complete
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={teamData?.overall_progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "#e2e8f0",
                "& .MuiLinearProgress-bar": { bgcolor: "#22c55e" },
              }}
            />
            <Box mt={4} sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  left: "4%",
                  right: "4%",
                  height: "2px",
                  bgcolor: "#cbd5e1",
                  zIndex: 1,
                }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ position: "relative", zIndex: 2, px: 2, mb: 1.5 }}
              >
                <Box
                  sx={{
                    bgcolor: "#22c55e",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckIcon sx={{ color: "#fff", fontSize: 12 }} />
                </Box>
                <Box
                  sx={{
                    bgcolor: "#22c55e",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckIcon sx={{ color: "#fff", fontSize: 12 }} />
                </Box>
                <Box
                  sx={{
                    bgcolor: "#f59e0b",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "4px solid #fef3c7",
                  }}
                />
                <Box
                  sx={{
                    bgcolor: "#94a3b8",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "3px solid #f1f5f9",
                  }}
                />
                <Box
                  sx={{
                    bgcolor: "#cbd5e1",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmojiEventsIcon sx={{ color: "#f59e0b", fontSize: 15 }} />
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                textAlign="center"
              >
                {[
                  "Initial Proposal",
                  "Requirements & Planning",
                  "Design & Development",
                  "Internal Defense",
                  "Final Defense",
                ].map((text, i) => (
                  <Typography
                    key={i}
                    fontSize="12px"
                    fontWeight="600"
                    color="#64748b"
                    sx={{ width: "20%" }}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box
              display="flex"
              gap={4}
              mt={3}
              p={1.5}
              sx={{ bgcolor: "#f8fafc", borderRadius: "10px" }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#22c55e",
                  }}
                />
                <Typography fontSize="12px" fontWeight="500" color="#64748b">
                  Completed
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#f59e0b",
                  }}
                />
                <Typography fontSize="12px" fontWeight="500" color="#64748b">
                  In Progress
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <LockIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                <Typography fontSize="12px" fontWeight="500" color="#64748b">
                  Locked
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <LockIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                <Typography fontSize="12px" fontWeight="500" color="#64748b">
                  Locked
                </Typography>
              </Box>
            </Box>
          </Card>

          <Card
            sx={{
              borderRadius: "16px",
              p: 2.5,
              mb: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography fontWeight="700" color="#1e293b" mb={2} fontSize="15px">
              Milestone Progress
            </Typography>

            <TableContainer
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f0fa" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        color: "#475569",
                        borderRight: "1px solid #e2e8f0",
                        py: 1.2,
                      }}
                    >
                      Milestone
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        color: "#475569",
                        borderRight: "1px solid #e2e8f0",
                        py: 1.2,
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        color: "#475569",
                        borderRight: "1px solid #e2e8f0",
                        py: 1.2,
                      }}
                    >
                      Grade
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", color: "#475569", py: 1.2 }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {milestones.map((milestone) => (
                    <TableRow key={milestone.id}>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          color: "#64748b",
                          borderRight: "1px solid #e2e8f0",
                        }}
                      >
                        {milestone.title}
                      </TableCell>

                      <TableCell
                        sx={{
                          borderRight: "1px solid #e2e8f0",
                        }}
                      >
                        {renderStatus(milestone.status)}
                      </TableCell>
<TableCell
  sx={{
    borderRight: "1px solid #e2e8f0",
  }}
>
  {editingMilestone === milestone.id ? (
    <TextField
      size="small"
      type="number"
      value={grades[milestone.id] ?? ""}
      onChange={(e) =>
        setGrades((prev) => ({
          ...prev,
          [milestone.id]: e.target.value,
        }))
      }
      inputProps={{
        min: 0,
        max: milestone.max_score,
      }}
      sx={{
        width: 90,
      }}
    />
  ) : (
    <Typography
      fontSize="12px"
      color="#64748b"
    >
      {milestone.grade
        ? `${milestone.grade.grade}/${milestone.max_score}`
        : `0/${milestone.max_score}`}
    </Typography>
  )}
</TableCell>

                      <TableCell>
   {editingMilestone === milestone.id ? (
  <Button
    size="small"
    variant="contained"
    disabled={saving}
    startIcon={<CheckIcon />}
    onClick={() =>
      handleSaveGrade(milestone.id)
    }
    sx={{
      textTransform: "none",
      fontSize: "11px",
    }}
  >
    Submit
  </Button>
) : (
  <Button
    size="small"
    variant="outlined"
    startIcon={<EditIcon />}
    onClick={() => {
      setEditingMilestone(milestone.id);
    }}
    sx={{
      textTransform: "none",
      color: "#64748b",
      borderColor: "#cbd5e1",
      fontSize: "11px",
    }}
  >
    Edit
  </Button>
)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Card
            ref={submittedFilesRef}
            sx={{
              borderRadius: "16px",
              p: 2.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography fontWeight="700" color="#1e293b" mb={2} fontSize="15px">
              Submitted Files
            </Typography>

            <TableContainer
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: "#f3f0fa" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        color: "#475569",
                        borderRight: "1px solid #e2e8f0",
                        py: 1.2,
                      }}
                    >
                      File Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        color: "#475569",
                        borderRight: "1px solid #e2e8f0",
                        py: 1.2,
                      }}
                    >
                      Milestone
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "600", color: "#475569", py: 1.2 }}
                    >
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamData?.submitted_files?.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <InsertDriveFileIcon />

                          <Typography
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {file.file_name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        {file.milestone}
                      </TableCell>

                      <TableCell>
                        {new Date(
                          file.uploaded_at
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
