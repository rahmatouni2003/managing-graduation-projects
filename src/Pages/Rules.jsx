import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Divider,
} from "@mui/material";

import {
    Add,
    Remove,
    Groups,
    School,
    InfoOutlined,
    Delete,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Admin from "../services/Admin.model";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "./Rules.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function Rules() {
    const [newRequirement, setNewRequirement] = useState("");
    const [newCriteria, setNewCriteria] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [rules, setRules] = useState(null);
    const [form, setForm] = useState({
        min_team_size: 2,
        max_team_size: 6,
        project1_team_formation_deadline: "",
        supervisor_max_score: 40,
        defense_max_score: 40,
        milestone_committee_total_score: 20,
        passing_percentage: 50,
        project_type_requirements: [],
        idea_selection_criteria: [],
    });

    const fetchRules = async () => {
        try {
            const res = await Admin.getTeamRules();
            setRules(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    const handleDeleteRequirement = async (id) => {
        try {
            await Admin.deletRules(id);
            setForm((prev) => ({
                ...prev,
                project_type_requirements: prev.project_type_requirements.filter((item) => item.id !== id),
            }));
            toast.success("Requirement deleted successfully");
        } catch (err) {
            toast.error("Failed to delete requirement ❌");
        }
    };

    const handleDeleteCriteria = async (id) => {
        try {
            // تم إزالة النداء المتكرر هنا
            await Admin.deletRules(id);
            setForm((prev) => ({
                ...prev,
                idea_selection_criteria: prev.idea_selection_criteria.filter((item) => item.id !== id),
            }));
            await fetchRules();
            toast.success("Criteria deleted successfully 🎉");
        } catch (err) {
            toast.error("Failed to delete criteria ❌");
        }
    };

    const handleAddIdeaSelectionCriteria = async () => {
        if (!newCriteria.trim()) {
            return;
        }

        try {
            const payload = { rule: newCriteria };
            
            // نداء واحد فقط للـ API
            await Admin.addideaSelectionCriteria(payload);

            setForm((prev) => ({
                ...prev,
                idea_selection_criteria: [
                    ...prev.idea_selection_criteria,
                    {
                        id: Date.now(),
                        rules: newCriteria,
                    },
                ],
            }));
            
            await fetchRules();
            setNewCriteria("");
        } catch (err) {
            toast.error("Failed to add criteria ❌");
        }
    };

    const handleAddProjectRequirement = async () => {
        if (!newRequirement.trim()) {
            toast.error("Please enter a requirement");
            return;
        }

        try {
            const payload = { rule: newRequirement };

            // نداء واحد فقط للـ API
            await Admin.addProjectTypeRequirements(payload);

            setForm((prev) => ({
                ...prev,
                project_type_requirements: [
                    ...prev.project_type_requirements,
                    {
                        id: Date.now(),
                        rules: newRequirement,
                    },
                ],
            }));

            await fetchRules();
            setNewRequirement("");
        } catch (err) {
            toast.error("Failed to add requirement ❌");
        }
    };

    const handleGraduationRulesSave = async () => {
        try {
            if (newRequirement.trim()) {
                await handleAddProjectRequirement();
            }

            if (newCriteria.trim()) {
                await handleAddIdeaSelectionCriteria();
            }

            toast.success("Rules saved successfully 🎉");
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong ❌"
            );
        }
    };

    const handleTeamRulesSave = async () => {
        try {
            const payload = {
                min_team_size: Number(form.min_team_size),
                max_team_size: Number(form.max_team_size),
                project1_team_formation_deadline:
                    form.project1_team_formation_deadline
                        ? dayjs(form.project1_team_formation_deadline).format(
                            "YYYY-MM-DD"
                        )
                        : null,
            };

            await Admin.updateTeamRules(payload);
            toast.success("Team rules updated successfully 🎉");
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong ❌"
            );
        }
    };

    const updateTeamField = (key, delta) => {
        setForm((prev) => ({
            ...prev,
            [key]: Math.max(1, Number(prev[key]) + delta),
        }));
    };

    const handleSaveAll = async () => {
        try {
            const payload = {
                supervisor_max_score: Number(form.supervisor_max_score),
                defense_max_score: Number(form.defense_max_score),
                passing_percentage: Number(form.passing_percentage),
            };

            const res = await Admin.updateTeamgrading(payload);
            setForm((prev) => ({
                ...prev,
                supervisor_max_score: res.supervisor_max_score,
                defense_max_score: res.defense_max_score,
                milestone_committee_total_score: res.milestone_committee_total_score,
                passing_percentage: res.passing_percentage,
            }));

            toast.success("Grading rules updated successfully 🎉");
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong ❌"
            );
        }
    };

    const updateField = (key, delta) => {
        setForm((prev) => {
            const updatedValue = Math.max(0, Number(prev[key]) + delta);
            return {
                ...prev,
                [key]: updatedValue,
            };
        });
    };

    useEffect(() => {
        if (!rules) return;

        const apiDate = rules.team_formation_rules.project1_team_formation_deadline;
        if (apiDate) {
            const cleanDate = apiDate.replace(/\.\d{6}Z$/, "Z");
            const date = dayjs(cleanDate);
            if (date.isValid()) {
                setSelectedDate(date);
            }
        }

        setForm({
            min_team_size: rules.team_formation_rules.min_team_size,
            max_team_size: rules.team_formation_rules.max_team_size,
            project1_team_formation_deadline: rules.team_formation_rules.project1_team_formation_deadline,
            supervisor_max_score: rules.grading_rules.supervisor_max_score,
            defense_max_score: rules.grading_rules.defense_max_score,
            milestone_committee_total_score: rules.grading_rules.milestone_committee_total_score,
            passing_percentage: rules.grading_rules.passing_percentage,
            project_type_requirements: rules.graduation_project_rules.project_type_requirements || [],
            idea_selection_criteria: rules.graduation_project_rules.idea_selection_criteria || [],
        });
    }, [rules]);

    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="main-content">
                <Header />

                <div className="page-content">
                    <Typography className="page-title">
                        Team & Project Rules
                    </Typography>

                    {/* 1. Team Formation Rules */}
                    <Paper className="rules-card" elevation={0}>
                        <Box className="card-header">
                            <Groups className="header-icon" />
                            <Typography variant="h6" className="card-header-title">
                                Team Formation Rules
                            </Typography>
                        </Box>

                        <Divider className="card-divider" />

                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} md={4}>
                                <Typography className="field-label">Minimum Team Size</Typography>
                                <Box className="counter-box">
                                    <TextField
                                        size="small"
                                        value={form.min_team_size}
                                        onChange={(e) => setForm({ ...form, min_team_size: Number(e.target.value) })}
                                    />
                                    <IconButton className="counter-btn" onClick={() => updateTeamField("min_team_size", -1)}>
                                        <Remove />
                                    </IconButton>
                                    <IconButton className="counter-btn" onClick={() => updateTeamField("min_team_size", 1)}>
                                        <Add />
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Typography className="field-label">Maximum Team Size</Typography>
                                <Box className="counter-box">
                                    <TextField
                                        size="small"
                                        value={form.max_team_size}
                                        onChange={(e) => setForm({ ...form, max_team_size: Number(e.target.value) })}
                                    />
                                    <IconButton className="counter-btn" onClick={() => updateTeamField("max_team_size", -1)}>
                                        <Remove />
                                    </IconButton>
                                    <IconButton className="counter-btn" onClick={() => updateTeamField("max_team_size", 1)}>
                                        <Add />
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Typography className="field-label">Team Formation Deadline</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar
                                        value={selectedDate}
                                        onChange={(newValue) => {
                                            setSelectedDate(newValue);
                                            setForm((prev) => ({ ...prev, project1_team_formation_deadline: newValue }));
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        <Box className="card-footer-row">
                            <Typography className="rule-note">
                                Teams should be multidisciplinary and consist of students from the same department.
                            </Typography>
                            <Button variant="contained" className="save-btn" onClick={handleTeamRulesSave}>
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>

                    {/* 2. Evaluation Rules */}
                    <Paper className="rules-card" elevation={0}>
                        <Box className="card-header">
                            <Groups className="header-icon" />
                            <Typography variant="h6" className="card-header-title">
                                Evaluation Rules
                            </Typography>
                        </Box>

                        <Divider className="card-divider" />

                        <Grid container spacing={4} sx={{ mt: 1 }}>
                            <Grid item xs={12} md={4}>
                                <Typography className="field-label bold-label">Committee Evaluation Marks</Typography>
                                <Typography className="field-sublabel">Total marks assigned for the Supervising Committee evaluation.</Typography>
                                <Box className="counter-box">
                                    <TextField
                                        size="small"
                                        value={form.milestone_committee_total_score}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Typography className="field-label bold-label">Supervisor Evaluation Marks</Typography>
                                <Typography className="field-sublabel">Total marks assigned for the Supervisor evaluation.</Typography>
                                <Box className="counter-box">
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={form.supervisor_max_score}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                supervisor_max_score: Number(e.target.value),
                                            }))
                                        }
                                    />
                                    <IconButton className="counter-btn" onClick={() => updateField("supervisor_max_score", -1)}><Remove /></IconButton>
                                    <IconButton className="counter-btn" onClick={() => updateField("supervisor_max_score", 1)}><Add /></IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Typography className="field-label bold-label">Final Discussion Marks</Typography>
                                <Typography className="field-sublabel">Marks given by the final discussion committee after the project presentation.</Typography>
                                <Box className="counter-box">
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={form.defense_max_score}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                defense_max_score: Number(e.target.value),
                                            }))
                                        }
                                    />
                                    <IconButton className="counter-btn" onClick={() => updateField("defense_max_score", -1)}><Remove /></IconButton>
                                    <IconButton className="counter-btn" onClick={() => updateField("defense_max_score", 1)}><Add /></IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4} sx={{ mt: -1 }}>
                                <Typography className="field-label bold-label">Passing Marks (Out of 100)</Typography>
                                <Typography className="field-sublabel">Minimum total marks required for project to be considered Pass.</Typography>
                                <Box className="counter-box">
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={form.passing_percentage}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                passing_percentage: Number(e.target.value),
                                            }))
                                        }
                                    />
                                    <IconButton className="counter-btn" onClick={() => updateField("passing_percentage", -1)}><Remove /></IconButton>
                                    <IconButton className="counter-btn" onClick={() => updateField("passing_percentage", 1)}><Add /></IconButton>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box className="info-box">
                            <InfoOutlined className="info-icon" />
                            <Typography variant="body2" className="info-text">
                                Total marks distribution will be: 20 (Committee) + 40 (Supervisor) + 40 (Final Discussion) = <strong>100 marks for each capstone</strong>
                                <span className="info-subtext">The final grade will be calculated out of 100.</span>
                            </Typography>
                        </Box>

                        <Box className="btn-wrapper">
                            <Button variant="contained" className="save-btn" onClick={handleSaveAll}>
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>

                    {/* 3. Graduation Project Rules */}
                    <Paper className="rules-card" elevation={0}>
                        <Box className="card-header">
                            <School className="header-icon" />
                            <Typography variant="h6" className="card-header-title">
                                Graduation Project Rules
                            </Typography>
                        </Box>

                        <Divider className="card-divider" />

                        <Grid container spacing={4} sx={{ mt: 1 }}>
                            {/* Project Type Requirements Column */}
                            <Grid item xs={12} md={6}>
                                <Typography className="section-title">
                                    Project Type Requirements
                                </Typography>
                                <Box className="checkbox-group">
                                    {form.project_type_requirements.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked
                                                        sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
                                                    />
                                                }
                                                label={item.rules}
                                            />
                                            <IconButton
                                                edge="end"
                                                color="error"
                                                onClick={() => handleDeleteRequirement(item.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>

                                <Typography className="section-title mt">
                                    Additional Rules
                                </Typography>
                                <TextField
                                    multiline
                                    rows={3}
                                    fullWidth
                                    className="textarea-field"
                                    placeholder="Enter new project requirement..."
                                    value={newRequirement}
                                    onChange={(e) => setNewRequirement(e.target.value)}
                                />
                            </Grid>

                            {/* Idea Selection Criteria Column */}
                            <Grid item xs={12} md={6}>
                                <Typography className="section-title">
                                    Idea Selection Criteria
                                </Typography>

                                <ul className="rules-list" style={{ paddingLeft: 0, listStyle: 'none' }}>
                                    {form.idea_selection_criteria.map((item) => (
                                        <li
                                            key={item.id}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}
                                        >
                                            <Typography variant="body1">{item.rules}</Typography>
                                            <IconButton
                                                edge="end"
                                                color="error"
                                                onClick={() => handleDeleteCriteria(item.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </li>
                                    ))}
                                </ul>

                                <Typography className="section-title mt">
                                    Additional Rules
                                </Typography>
                                <TextField
                                    multiline
                                    rows={3}
                                    fullWidth
                                    className="textarea-field"
                                    placeholder="Enter new idea selection criteria..."
                                    value={newCriteria}
                                    onChange={(e) => setNewCriteria(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Box className="btn-wrapper">
                            <Button
                                variant="contained"
                                className="save-btn"
                                onClick={handleGraduationRulesSave}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>
                </div>
            </div>
        </div>
    );
}