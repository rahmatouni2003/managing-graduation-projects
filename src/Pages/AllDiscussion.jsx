import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Admin from "../services/Admin.model";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import "./AllDiscussion.css";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AllDiscussions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---- edit state ----
  const [editingRowId, setEditingRowId] = useState(null);
  const [formOptions, setFormOptions] = useState({ doctors: [], tas: [] });
  const [selectedDoctors, setSelectedDoctors] = useState(["", "", ""]);
  const [selectedTAs, setSelectedTAs] = useState(["", "", ""]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectCourseId = searchParams.get("capstoneId") || 1;

  useEffect(() => {
    getData();
  }, [projectCourseId]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await Admin.getDefenseCommittees(projectCourseId);
      setRows(response || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ---- delete ----
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await Admin.deleteDefenseCommittee(id);
      toast.success("Discussion deleted successfully");
      setRows((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete discussion");
    }
  };

  // ---- convert "2026-05-25 10:30:00" <-> "2026-05-25T10:30" for datetime-local ----
  const toInputDateTime = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const toApiDateTime = (value) => {
    if (!value) return null;
    // value like "2026-05-25T10:30"
    return value.replace("T", " ") + ":00";
  };

  // ---- enter edit mode ----
  const handleEditClick = async (row, e) => {
    e.stopPropagation();
    try {
      const res = await Admin.getAvailableDoctorsAndTA(row.id);

      setFormOptions({
        doctors: res?.doctors || [],
        tas: res?.tas || [],
      });

      const docs = row.doctors || [];
      const tas = row.assistants || [];

      setSelectedDoctors([
        docs[0]?.id || "",
        docs[1]?.id || "",
        docs[2]?.id || "",
      ]);

      setSelectedTAs([tas[0]?.id || "", tas[1]?.id || "", tas[2]?.id || ""]);

      setScheduledAt(toInputDateTime(row.scheduled_at));
      setLocation(row.location || "");

      setEditingRowId(row.id);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load edit data");
    }
  };

  // ---- submit edit ----
  const handleSubmitClick = async (row, e) => {
    e.stopPropagation();
    try {
      setSubmitting(true);

      const data = {
        scheduled_at: toApiDateTime(scheduledAt),
        location: location,
        doctor_ids: selectedDoctors.map((id) => (id === "" ? null : id)),
        ta_ids: selectedTAs.map((id) => (id === "" ? null : id)),
      };

      await Admin.updateDefenseCommittee(row.id, data);

      toast.success("Committee updated successfully");
      setEditingRowId(null);
      await getData();
    } catch (err) {
      console.log(err);
      toast.error("Failed to save changes");
    } finally {
      setSubmitting(false);
    }
  };

  const renderDoctorCell = (index) => (params) => {
    if (params.row.id === editingRowId) {
      return (
        <Box onClick={(e) => e.stopPropagation()} sx={{ width: "100%" }}>
          <Select
            size="small"
            fullWidth
            value={selectedDoctors[index]}
            onChange={(e) => {
              const arr = [...selectedDoctors];
              arr[index] = e.target.value;
              setSelectedDoctors(arr);
            }}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {formOptions.doctors.map((doc) => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.full_name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      );
    }
    return params.row.doctors?.[index]?.name || "-";
  };

  const renderTACell = (index) => (params) => {
    if (params.row.id === editingRowId) {
      return (
        <Box onClick={(e) => e.stopPropagation()} sx={{ width: "100%" }}>
          <Select
            size="small"
            fullWidth
            value={selectedTAs[index]}
            onChange={(e) => {
              const arr = [...selectedTAs];
              arr[index] = e.target.value;
              setSelectedTAs(arr);
            }}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {formOptions.tas.map((ta) => (
              <MenuItem key={ta.id} value={ta.id}>
                {ta.full_name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      );
    }
    return params.row.assistants?.[index]?.name || "-";
  };

  const columns = [
    {
      field: "project_title",
      headerName: "Project",
      flex: 2,
    },
    {
      field: "project_category",
      headerName: "Category",
      flex: 1.3,
    },
    {
      field: "scheduled_at",
      headerName: "Date & Time",
      flex: 1.6,
      renderCell: (params) => {
        if (params.row.id === editingRowId) {
          return (
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: "100%" }}>
              <TextField
                type="datetime-local"
                size="small"
                fullWidth
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
            </Box>
          );
        }
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: "assistant1",
      headerName: "Assistant 1",
      flex: 1.2,
      renderCell: renderTACell(0),
    },
    {
      field: "assistant2",
      headerName: "Assistant 2",
      flex: 1.2,
      renderCell: renderTACell(1),
    },
    {
      field: "assistant3",
      headerName: "Assistant 3",
      flex: 1.2,
      renderCell: renderTACell(2),
    },
    {
      field: "doctor1",
      headerName: "Doctor 1",
      flex: 1.2,
      renderCell: renderDoctorCell(0),
    },
    {
      field: "doctor2",
      headerName: "Doctor 2",
      flex: 1.2,
      renderCell: renderDoctorCell(1),
    },
    {
      field: "doctor3",
      headerName: "Doctor 3",
      flex: 1.2,
      renderCell: renderDoctorCell(2),
    },
    {
      field: "grade",
      headerName: "Grade",
      width: 100,
      renderCell: (params) => params.value || "Pending",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1.4,
      renderCell: (params) => {
        if (params.row.id === editingRowId) {
          return (
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: "100%" }}>
              <TextField
                size="small"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Box>
          );
        }
        return params.value || "-";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const isEditing = params.row.id === editingRowId;

        if (isEditing) {
          return (
            <div className="action-buttons">
              <Button
                variant="contained"
                size="small"
                disabled={submitting}
                onClick={(e) => handleSubmitClick(params.row, e)}
                sx={{
                  backgroundColor: "#1565c0",
                  color: "#fff",
                  fontWeight: 600,
                  minWidth: "90px",
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                {submitting ? (
                  <CircularProgress size={18} sx={{ color: "#fff" }} />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                variant="outlined"
                size="small"
                disabled={submitting}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingRowId(null);
                }}
                sx={{ minWidth: "60px" }}
              >
                Cancel
              </Button>
            </div>
          );
        }

        return (
          <div className="action-buttons">
<IconButton
  onClick={(e) => handleEditClick(params.row, e)}
  sx={{
    color: "#1976d2",
    "&:hover": { backgroundColor: "rgba(25,118,210,0.08)" },
  }}
>
  <EditIcon />
</IconButton>

<IconButton
  onClick={(e) => handleDelete(params.row.id, e)}
  sx={{
    color: "#d32f2f",
    "&:hover": { backgroundColor: "rgba(211,47,47,0.08)" },
  }}
>
  <DeleteIcon />
</IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <div className="admin-layout">
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar />

      <div className="main-content">
        <Header />

        <Box className="discussion-page">
          <Box className="discussion-header">
            <Typography variant="h4" fontWeight={700}>
              All Final Discussions
            </Typography>

            <Button variant="contained" startIcon={<DownloadIcon />}>
              Download
            </Button>
          </Box>

          <Paper className="discussion-table">
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              pageSizeOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              autoHeight
              onRowClick={(params) => {
                if (editingRowId) return;
                navigate(
                  `/admin/discussion-details/${params.row.team_id}`
                );
              }}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
}