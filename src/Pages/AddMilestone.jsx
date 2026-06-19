import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    IconButton,
} from "@mui/material";
import { FaTrash, FaPlus } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import toast from "react-hot-toast";
import "./AddMilestone.css";
import Admin from "../services/Admin.model";
export default function AddMilestone() {
    const [position, setPosition] = useState(1);
    const [capstone, setCapstone] = useState(1);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [maxScore, setMaxScore] = useState(20);

    const [startDate, setStartDate] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [requirements, setRequirements] = useState([
        "UI Wireframes",
        "UI Wireframes",
    ]);

const handleSaveMilestone = async () => {
  try {
    const formData = new FormData();

    formData.append("title", title || "");

    formData.append(
      "start_date",
      startDate ? startDate.format("YYYY-MM-DD") : ""
    );

    formData.append(
      "deadline",
      deadline ? deadline.format("YYYY-MM-DD") : ""
    );

    formData.append("previous_milestone_id", position);
requirements
  .filter((req) => req.trim() !== "")
  .forEach((req, index) => {
    formData.append(`requirements[${index}]`, req);
  });
    formData.append("description", description || "");

    formData.append("max_score", Number(maxScore || 0));

    formData.append("project_course_id", capstone);

  


    console.log([...formData.entries()]);

    await Admin.addMilestone(formData);

    toast.success("Milestone added successfully");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to add milestone"
    );
  }
};
    const addRequirement = () => {
        setRequirements([...requirements, ""]);
    };

    const removeRequirement = (index) => {
        setRequirements(requirements.filter((_, i) => i !== index));
    };

    const updateRequirement = (index, value) => {
        const updated = [...requirements];
        updated[index] = value;
        setRequirements(updated);
    };

    return (
        <Box className="admin-layout">
            <Sidebar />

            <Box className="main-content">
                <Header />

                <Box className="add-milestone-page">
                    <Box className="page-header">
                        <Typography variant="h4" fontWeight={700}>
                            Add New Milestone
                        </Typography>

  <Box className="capstone-switch">
  <Button
    variant={capstone === 1 ? "contained" : "outlined"}
    onClick={() => setCapstone(1)}
  >
    Capstone 1
  </Button>

  <Button
    variant={capstone === 2 ? "contained" : "outlined"}
    onClick={() => setCapstone(2)}
  >
    Capstone 2
  </Button>
</Box>
                    </Box>

                    <Paper className="milestone-form-card">

                        {/* Order */}
                        <Box className="order-section">
                            <Typography variant="h6" fontWeight={700}>
                                Milestone Order
                            </Typography>

                            <Box className="order-row">
                                <Typography>Position:</Typography>

                                <TextField
                                    select
                                    size="small"
                                    value={position}
                                    onChange={(e) => setPosition(Number(e.target.value))}
                                    sx={{ width: 300 }}
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <MenuItem key={num} value={num}>
                                            {num}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>

                            <Typography className="phase-text">
                                This will be phase:
                                <span className="phase-badge">
                                    {position + 1}
                                </span>
                            </Typography>
                        </Box>

                        {/* Name */}
                        <Box className="form-group">
                            <Typography className="label">
                                Milestone Name
                            </Typography>

<TextField
  fullWidth
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Enter Milestone Name"
/>
                        </Box>

                        {/* Score */}
                        <Box className="form-group">
                            <Typography className="label">
                                Max Score
                            </Typography>

<TextField
  fullWidth
  value={maxScore}
  onChange={(e) => setMaxScore(e.target.value)}
/>
                        </Box>

                        {/* Description */}
                        <Box className="form-group">
                            <Typography className="label">
                                Description
                            </Typography>

                            <TextField
  multiline
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe The Milestone..."
/>
                        </Box>

                        {/* Requirements */}
                        <Box className="form-group">
                            <Typography className="label">
                                Requirements
                            </Typography>

                            {requirements.map((req, index) => (
                                <Box
                                    key={index}
                                    className="requirement-item"
                                >
                                    <TextField
                                        fullWidth
                                        value={req}
                                        onChange={(e) =>
                                            updateRequirement(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />

                                    <IconButton
                                        onClick={() =>
                                            removeRequirement(index)
                                        }
                                    >
                                        <FaTrash />
                                    </IconButton>
                                </Box>
                            ))}

                            <Button
                                startIcon={<FaPlus />}
                                className="add-req-btn"
                                onClick={addRequirement}
                            >
                                Add a requirement
                            </Button>
                        </Box>

                        {/* Dates */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box className="dates-row">
                                <Box className="date-column">
                                    <Typography variant="h6" fontWeight={700} align="center">
                                        Start
                                    </Typography>

                                 <DateCalendar
  value={startDate}
  onChange={(newValue) => setStartDate(newValue)}
/>
                                </Box>

                                <Box className="date-divider" />

                                <Box className="date-column">
                                    <Typography variant="h6" fontWeight={700} align="center">
                                        Deadline
                                    </Typography>

                                 <DateCalendar
  value={deadline}
  onChange={(newValue) => setDeadline(newValue)}
/>
                                </Box>
                            </Box>
                        </LocalizationProvider>

                        {/* Actions */}
                        <Box className="action-buttons">
            <Button
  variant="contained"
  size="large"
  onClick={handleSaveMilestone}
>
  Save Milestone
</Button>

                            <Button
                                variant="outlined"
                                size="large"
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}