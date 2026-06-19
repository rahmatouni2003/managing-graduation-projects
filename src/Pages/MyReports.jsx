import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";

import "./MyReports.css";

const reports = [
    {
        id: 221247,
        user: "Aliya Othman",
        subject: "Unable to upload File",
        status: "Pending",
        date: "2 hours ago",
    },
    {
        id: 221247,
        user: "Aliya Othman",
        subject: "Unable to upload File",
        status: "Unopened",
        date: "1 day ago",
    },
    {
        id: 221247,
        user: "Aliya Othman",
        subject: "Unable to upload File",
        status: "Resolved",
        date: "May 30",
    },
    {
        id: 221247,
        user: "Aliya Othman",
        subject: "Unable to upload File",
        status: "Pending",
        date: "May 25",
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case "Pending":
            return "#f9a825";

        case "Resolved":
            return "#4caf50";

        case "Unopened":
            return "#9e9e9e";

        default:
            return "#ddd";
    }
};

export default function MyReports() {
    return (
        <Box className="admin-layout">
            <Sidebar />

            <Box className="main-content">
                <Header />

                <Box className="reports-page">
                    <Typography className="reports-title">
                        Reports
                    </Typography>

                    <Typography className="reports-subtitle">
                        View and manage all reported problems
                    </Typography>

                    {/* Statistics */}
                    <Box className="stats-section">
                        <Paper className="report-card">
                            <Box>
                                <Typography className="card-title">
                                    Total Reports
                                </Typography>
                                <Typography className="card-number">
                                    23
                                </Typography>
                            </Box>

                            <Box className="icon-circle blue">
                                <DescriptionOutlinedIcon />
                            </Box>
                        </Paper>

                        <Paper className="report-card">
                            <Box>
                                <Typography className="card-title">
                                    Pending
                                </Typography>
                                <Typography className="card-number">
                                    7
                                </Typography>
                            </Box>

                            <Box className="icon-circle red">
                                <AccessTimeIcon />
                            </Box>
                        </Paper>

                        <Paper className="report-card">
                            <Box>
                                <Typography className="card-title">
                                    Unopened
                                </Typography>
                                <Typography className="card-number">
                                    8
                                </Typography>
                            </Box>

                            <Box className="icon-circle gray">
                                <MarkEmailUnreadOutlinedIcon />
                            </Box>
                        </Paper>

                        <Paper className="report-card">
                            <Box>
                                <Typography className="card-title">
                                    Resolved
                                </Typography>
                                <Typography className="card-number">
                                    8
                                </Typography>
                            </Box>

                            <Box className="icon-circle green">
                                <CheckCircleOutlineIcon />
                            </Box>
                        </Paper>
                    </Box>

                    {/* Table */}

                    <Paper className="table-wrapper">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="center">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {reports.map((report, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{report.id}</TableCell>

                                            <TableCell>{report.user}</TableCell>

                                            <TableCell>{report.subject}</TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={report.status}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor:
                                                            getStatusColor(report.status),
                                                        color: "#fff",
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell>{report.date}</TableCell>

                                            <TableCell align="center">
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box className="pagination-wrapper">
                            <Typography>
                                Showing 1 to 8 of 23 reports
                            </Typography>

                            <Pagination
                                count={3}
                                page={1}
                                color="primary"
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}