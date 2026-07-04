import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Admin from "../services/Admin.model";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import "./AllDiscussion.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function AllDiscussions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
const [searchParams] = useSearchParams();
const navigate = useNavigate();
const projectCourseId =
  searchParams.get("capstoneId") || 1;
const handleDelete = async (id) => {
  try {
    await Admin.deleteDefenseCommittee(id);

    toast.success("Discussion deleted successfully");

    setRows((prev) =>
      prev.filter((item) => item.id !== id)
    );
  } catch (error) {
    console.log(error);

    toast.error("Failed to delete discussion");
  }
};
useEffect(() => {
  getData();
}, [projectCourseId]);

  const getData = async () => {
    try {
      setLoading(true);

      const response =
        await Admin.getDefenseCommittees(projectCourseId);

      setRows(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
      flex: 1.5,
      renderCell: (params) =>
        new Date(params.value).toLocaleString(),
    },
    {
      field: "assistants",
      headerName: "Assistants",
      flex: 2,
      renderCell: (params) =>
        params.row.assistants
          ?.map((a) => a.name)
          .join(", "),
    },
    {
      field: "doctor1",
      headerName: "Doctor 1",
      flex: 1.2,
      renderCell: (params) =>
        params.row.doctors?.[0]?.name || "-",
    },
    {
      field: "doctor2",
      headerName: "Doctor 2",
      flex: 1.2,
      renderCell: (params) =>
        params.row.doctors?.[1]?.name || "-",
    },
    {
      field: "doctor3",
      headerName: "Doctor 3",
      flex: 1.2,
      renderCell: (params) =>
        params.row.doctors?.[2]?.name || "-",
    },
    {
      field: "grade",
      headerName: "Grade",
      width: 100,
      renderCell: (params) =>
        params.value || "Pending",
    },
      {
    field: "location",
    headerName: "Location",
    flex: 1.5,
    renderCell: (params) =>
      params.value || "-",
  },
    {
  field: "actions",
  headerName: "Actions",
  width: 120,
  sortable: false,
  filterable: false,

  renderCell: (params) => (
    <div className="action-buttons">
      <IconButton
        className="EDIT-btn"
        onClick={() => {
          console.log("Edit", params.row.id);
        }}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        className="delete-btn"
       onClick={() => {
  console.log(params.row);
  handleDelete(params.row.id);
}}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  ),
},
  ];

return (
  <div className="admin-layout">
    <Sidebar />

    <div className="main-content">
      <Header />

      <Box className="discussion-page">
        <Box className="discussion-header">
          <Typography variant="h4" fontWeight={700}>
            All Final Discussions
          </Typography>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
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
    navigate(
      `/discussion-details/${params.row.team_id}`
    );
  }}
/>
        </Paper>
      </Box>
    </div>
  </div>
);
}