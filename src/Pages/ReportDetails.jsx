import {
    Box,
    Typography,
    Paper,
    Button,
    Chip,
    TextField,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SendIcon from "@mui/icons-material/Send";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Admin from "../Services/Admin.model";
import "./ReportDetails.css";

const getStatusColor = (status) => {
    switch (status) {
        case "pending":
            return "#f9a825";
        case "resolved":
            return "#4caf50";
        case "unopened":
            return "#9e9e9e";
        default:
            return "#ddd";
    }
};


function parseAdminAttachments(raw) {
    if (!raw) return [];
    try {
        const match = raw.match(/\[(.*)\]/);
        if (!match) return [];
        const arr = JSON.parse(`[${match[1]}]`);
        const base = raw.split("[")[0];
        return arr.map((p) => `${base}${p.replace(/\\\//g, "/")}`);
    } catch {
        return [];
    }
}

export default function ReportDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [solutionText, setSolutionText] = useState("");
    const [solutionImage, setSolutionImage] = useState(null);
    const [solutionImagePreview, setSolutionImagePreview] = useState(null);
    const [sending, setSending] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchReportDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchReportDetails = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await Admin.getAdminreportsDetails(id);
            // الـ extractResponseData بترجع res.data بالفعل
            setReport(response);
        } catch (err) {
            console.log(err);
            setError(err.message || "حدث خطأ أثناء تحميل بيانات البلاغ");
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
            alert("الرجاء اختيار صورة بصيغة PNG أو JPG أو JPEG فقط");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("حجم الصورة يجب ألا يتجاوز 5MB");
            return;
        }

        setSolutionImage(file);
        setSolutionImagePreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleImageSelect({ target: { files: [file] } });
    };

    const handleSendSolution = async () => {
        if (!solutionText.trim()) {
            alert("من فضلك اكتب الحل أو الرد أولاً");
            return;
        }

        try {
            setSending(true);

            const formData = new FormData();
            formData.append("admin_response", solutionText);
            if (solutionImage) {
                formData.append("admin_attachment", solutionImage);
            }

            await Admin.sendReportSolution(id, formData);

            await fetchReportDetails();
            setSolutionText("");
            setSolutionImage(null);
            setSolutionImagePreview(null);
        } catch (err) {
            console.log(err);
            alert(err.message || "حدث خطأ أثناء إرسال الحل");
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <Box className="admin-layout">
                <Sidebar />
                <Box className="main-content">
                    <Header />
                    <Box className="report-details-loading">
                        <CircularProgress />
                    </Box>
                </Box>
            </Box>
        );
    }

    if (error || !report) {
        return (
            <Box className="admin-layout">
                <Sidebar />
                <Box className="main-content">
                    <Header />
                    <Box className="report-details-page">
                        <Typography color="error">
                            {error || "لم يتم العثور على البلاغ"}
                        </Typography>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                            sx={{ mt: 2 }}
                        >
                            رجوع
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }

    const adminAttachments = parseAdminAttachments(report.admin_attachment);

    return (
        <Box className="admin-layout">
            <Sidebar />

            <Box className="main-content">
                <Header />

                <Box className="report-details-page">
                    {/* Back + Title */}
                    <Box className="report-details-titlebar">
                        <Button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                            startIcon={<ArrowBackIcon />}
                        >
                        </Button>
                        <Typography className="report-details-title">
                            Report Details
                        </Typography>
                    </Box>

                    {/* Info card */}
                    <Paper className="report-info-card">
                        <Box className="info-row">
                            <Typography className="info-label">
                                Student Name:
                            </Typography>
                            <Typography className="info-value">
                                {report.user?.name}
                            </Typography>
                        </Box>

                        <Box className="info-row">
                            <Typography className="info-label">
                                Subject:
                            </Typography>
                            <Typography className="info-value">
                                {report.subject}
                            </Typography>
                        </Box>

                        <Box className="info-row align-top">
                            <Typography className="info-label">
                                Description:
                            </Typography>
                            <Typography className="info-value description-text">
                                {report.description}
                            </Typography>
                        </Box>

                        <Box className="info-row">
                            <Typography className="info-label">
                                Submitted On:
                            </Typography>
                            <Typography className="info-value">
                                {report.created_at}
                            </Typography>
                        </Box>

                        <Box className="info-row">
                            <Typography className="info-label">
                                Status:
                            </Typography>
                            <Chip
                                label={report.status}
                                size="small"
                                sx={{
                                    backgroundColor: getStatusColor(report.status),
                                    color: "#fff",
                                    textTransform: "capitalize",
                                }}
                            />
                        </Box>

                        {/* Student attachment */}
                        {report.attachment && (
                            <Box className="attachment-section">
                                <Typography className="section-label">
                                    Attachment (from student):
                                </Typography>
                                <Box className="attachment-preview">
                                    <img
                                        src={report.attachment}
                                        alt="attachment"
                                        className="attachment-thumb"
                                    />
                                    <Typography className="attachment-name">
                                        {report.attachment.split("/").pop()}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box className="divider-line" />

                        {/* Existing admin response (if resolved/pending with a response) */}
                        {report.admin_response && (
                            <Box className="admin-response-readonly">
                                <Typography className="section-label">
                                    Admin Solution / Response:
                                </Typography>
                                <Typography className="response-text">
                                    {report.admin_response}
                                </Typography>

                                {adminAttachments.length > 0 && (
                                    <Box className="admin-attachments-list">
                                        {adminAttachments.map((url, idx) => (
                                            <a
                                                key={idx}
                                                href={url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="admin-attachment-chip"
                                            >
                                                <InsertDriveFileOutlinedIcon fontSize="small" />
                                                {url.split("/").pop()}
                                            </a>
                                        ))}
                                    </Box>
                                )}

                                {report.resolved_at && (
                                    <Typography className="resolved-at">
                                        Resolved at: {report.resolved_at}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        {/* Reply form */}
                        <Box className="solution-form">
                            <Typography className="section-label">
                                Admin Solution / Response
                            </Typography>

                            <Typography className="field-label">
                                Write the solution
                            </Typography>
                            <TextField
                                multiline
                                minRows={4}
                                fullWidth
                                placeholder="Type the solution or response for the student..."
                                value={solutionText}
                                onChange={(e) => setSolutionText(e.target.value)}
                                className="solution-textfield"
                            />

                            <Typography className="field-label upload-label">
                                Attach image (optional)
                            </Typography>

                            <Box
                                className="upload-dropzone"
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    hidden
                                    onChange={handleImageSelect}
                                />
                                {solutionImagePreview ? (
                                    <img
                                        src={solutionImagePreview}
                                        alt="preview"
                                        className="upload-preview-img"
                                    />
                                ) : (
                                    <>
                                        <CloudUploadOutlinedIcon className="upload-icon" />
                                        <Typography className="upload-text">
                                            Click to upload image or drag and drop
                                        </Typography>
                                        <Typography className="upload-hint">
                                            PNG, JPG or JPEG (Max. 5MB)
                                        </Typography>
                                    </>
                                )}
                            </Box>

                            <Button
                                className="send-solution-btn"
                                variant="contained"
                                startIcon={<SendIcon />}
                                onClick={handleSendSolution}
                                disabled={sending}
                            >
                                {sending ? "Sending..." : "Send Solution"}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
