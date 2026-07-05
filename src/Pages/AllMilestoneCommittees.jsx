import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";

import Admin from "../services/Admin.model";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import "./AllDiscussion.css";
import { useNavigate } from "react-router-dom";

export default function AllMilestoneCommittees() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---- edit state ----
  const [editingRowId, setEditingRowId] = useState(null);
  const [formOptions, setFormOptions] = useState({ doctors: [], tas: [] });
  const [selectedDoctors, setSelectedDoctors] = useState(["", "", ""]);
  const [selectedTAs, setSelectedTAs] = useState(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const response = await Admin.downloadMilestoneCommittees();

      const link = document.createElement("a");
      link.href = response.download_url;
      link.download = response.file_name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
      toast.error("Failed to download the file");
    }
  };

  useEffect(() => {
    getData();
  }, []);

const getData = async () => {
  try {
    setLoading(true);
    const response = await Admin.getMilestoneCommittees();
    console.log("Fresh data after update:", response); // ← شوف هنا
    setRows(response || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  // ---- enter edit mode ----
// ---- enter edit mode ----
const handleEditClick = async (row, e) => {
  e.stopPropagation();
  try {
    // 1. هنجيب الخيارات المتاحة فقط من الـ API
    const res = await Admin.getFormData(row.id);

    setFormOptions({
      doctors: res.available_doctors || [],
      tas: res.available_tas || [],
    });
 
    const docs = row.doctors || [];
    const tas = row.tas || [];

    setSelectedDoctors([
      docs[0]?.id || docs[0]?.doctor_id || "", 
      docs[1]?.id || docs[1]?.doctor_id || "",
      docs[2]?.id || docs[2]?.doctor_id || "",
    ]);
    
    setSelectedTAs([
      tas[0]?.id || tas[0]?.ta_id || "",
      tas[1]?.id || tas[1]?.ta_id || "",
      tas[2]?.id || tas[2]?.ta_id || "",
    ]);

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
  doctor_ids: selectedDoctors.map(id => id === "" ? null : id),
  ta_ids: selectedTAs.map(id => id === "" ? null : id),
};

    console.log("Row ID:", row.id);
    console.log("Payload being sent:", data);

    await Admin.updateMilestoneCommittees(row.id, data);

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
    return params.row.tas?.[index]?.name || "-";
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
      field: "ta1",
      headerName: "TA 1",
      flex: 1.2,
      renderCell: renderTACell(0),
    },
    {
      field: "ta2",
      headerName: "TA 2",
      flex: 1.2,
      renderCell: renderTACell(1),
    },
    {
      field: "ta3",
      headerName: "TA 3",
      flex: 1.2,
      renderCell: renderTACell(2),
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1.5,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const isEditing = params.row.id === editingRowId;

        if (isEditing) {
          return (
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
                "&:hover": {
                  backgroundColor: "#0d47a1",
                },
              }}
            >
              {submitting ? (
                <CircularProgress size={18} sx={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          );
        }

        return (
          <IconButton
            className="edit-btn"
            onClick={(e) => handleEditClick(params.row, e)}
          >
            <EditIcon />
          </IconButton>
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
              All Milestone Committees
            </Typography>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
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
                if (editingRowId) return; // prevent navigation while editing
                navigate(
                  `/admin/all-milestone-committees-details/${params.row.team_id}`
                );
              }}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
}