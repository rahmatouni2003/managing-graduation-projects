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
import toast, { Toaster } from "react-hot-toast";
import "./AddMilestone.css";
import Admin from "../services/Admin.model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export default function EditMilestone() {
    const { id } = useParams();
    const [position, setPosition] = useState(1);
    const [capstone, setCapstone] = useState(1);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [maxScore, setMaxScore] = useState(20);
    const location = useLocation();
    const deadlineRef = useRef(null);
    const [startDate, setStartDate] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        if (location.state?.focusDeadline && deadlineRef.current) {
            setTimeout(() => {
                deadlineRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 500);
        }
    }, [deadline, location.state]);

    useEffect(() => {
        const fetchMilestone = async () => {
            try {
                const res = await Admin.getMilestones();
                const data = res?.data || res;

                const milestone = data.find((m) => m.id === Number(id));

                if (!milestone) {
                    toast.error("Milestone not found");
                    return;
                }

                setTitle(milestone?.title || "");
                setMaxScore(milestone?.max_score ?? 0);
                setDescription(milestone?.description || "");
                setPosition(milestone?.previous_milestone_id || 1);
                setCapstone(milestone?.project_course_id || 1);

                setStartDate(
                    milestone?.start_date ? dayjs(milestone.start_date) : null
                );

                setDeadline(
                    milestone?.deadline ? dayjs(milestone.deadline) : null
                );

                setRequirements(
                    (milestone?.requirements || []).map((r) => ({
                        id: r.id || null,
                        text: r.text || r.requirement || "",
                        action: "", // التعديل هنا: نص فارغ للعناصر الثابتة حتى لا يراها السيرفر كخطأ
                    }))
                );

            } catch (err) {
                console.log("Fetch milestone error:", err?.response || err);
                toast.error(
                    err?.response?.data?.message || "Failed to load milestone"
                );
            }
        };

        fetchMilestone();
    }, [id]);

    const handleUpdateMilestone = async () => {
        const loadingToast = toast.loading("Updating milestone...");
        try {
            // تصفية المصفوفة لإرسال العناصر التي تحتوي على أكشن فقط (new, update, delete)
            // واستبعاد العناصر الثابتة (النص الفارغ) والعناصر التي حُذفت فوراً دون إرسالها للسيرفر
            const formattedRequirements = requirements
                .filter((r) => r.action !== "new-remove" && r.action !== "")
                .map((r) => {
                    const item = { text: r.text, action: r.action };
                    if (r.id) {
                        item.id = r.id; // نرسل الـ id فقط للعناصر القديمة الموجودة بالفعل بالسيرفر
                    }
                    return item;
                });

            const payload = {
                title,
                max_score: Number(maxScore),
                deadline: deadline ? deadline.format("YYYY-MM-DD") : "",
                previous_milestone_id: position,
                project_course_id: capstone,
                description,
                requirements: formattedRequirements
            };

            await Admin.updateMilestone(id, payload);
            toast.success("Milestone updated successfully", { id: loadingToast });
            
            // إعادة تحديث الصفحة أو البيانات هنا إذا رغبت لضمان قراءة البيانات الجديدة من السيرفر
        } catch (error) {
            toast.error(error?.response?.data?.message || "Update failed", { id: loadingToast });
        }
    };

    const addRequirement = () => {
        setRequirements([
            ...requirements,
            { id: null, text: "", action: "new" },
        ]);
    };

    const removeRequirement = (index) => {
        const updated = [...requirements];
        // إذا كان العنصر قادم من السيرفر (لديه id) نضع أكشن delete، وإلا نقوم بوسمه كـ new-remove لتجاهله
        updated[index].action = updated[index].id ? "delete" : "new-remove";
        setRequirements(updated);
    };

    const updateRequirement = (index, value) => {
        const updated = [...requirements];
        updated[index].text = value;

        // إذا لم يكن مضافاً حديثاً، يتم وسمه كـ update
        if (updated[index].action !== "new") {
            updated[index].action = "update";
        }

        setRequirements(updated);
    };

    return (
        <Box className="admin-layout">
            <Toaster position="top-center" />
            <Sidebar />

            <Box className="main-content">
                <Header />

                <Box className="add-milestone-page">
                    <Box className="page-header">
                        <Typography variant="h4" fontWeight={700}>
                            Edit Milestone
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
                                disabled
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe The Milestone..."
                            />
                        </Box>

                        {/* Requirements */}
                        <Box className="form-group">
                            <Typography className="label">
                                Requirements
                            </Typography>

                            {/* نعرض الشروط النشطة فقط ونخفي ما تم حذفه بالواجهة */}
                            {requirements
                                .filter((req) => req.action !== "new-remove" && req.action !== "delete")
                                .map((req, index) => (
                                    <Box
                                        key={index}
                                        className="requirement-item"
                                    >
                                        <TextField
                                            fullWidth
                                            value={req.text}
                                            onChange={(e) =>
                                                updateRequirement(
                                                    requirements.indexOf(req), // نمرر الـ index الحقيقي داخل المصفوفة الأصلية
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <IconButton
                                            onClick={() =>
                                                removeRequirement(requirements.indexOf(req))
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
                                        readOnly
                                    />
                                </Box>

                                <Box className="date-divider" />

                                <Box
                                    className="date-column"
                                    ref={deadlineRef}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        align="center"
                                    >
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
                                onClick={handleUpdateMilestone}
                            >
                                Save
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