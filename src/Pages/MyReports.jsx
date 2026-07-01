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
import { useEffect, useState } from "react";
import Admin from "../Services/Admin.model";
import "./MyReports.css";

import { useNavigate } from "react-router-dom";




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

export default function MyReports() {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        current_page: 1,
        last_page: 1,
    });

    const [statistics, setStatistics] = useState({
        total: 0,
        pending: 0,
        unopened: 0,
        resolved: 0,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await Admin.getAdminreports();

            setReports(response.data?.data || []);
            setStatistics(response.statistics || {});
            setPagination(response.pagination || {});

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <h2>Loading...</h2>;
    }
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
                                    {statistics.total}
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
                                    {statistics.pending}
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
                                    {statistics.unopened}
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
                                    {statistics.resolved}
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
                                    {reports.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell>{report.id}</TableCell>

                                            <TableCell> {report.user?.name}</TableCell>

                                            <TableCell>  {report.subject}</TableCell>
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

                                            <TableCell>{report.created_at_human}</TableCell>

                                            <TableCell align="center">
                                 <Button
    variant="outlined"
    size="small"
    onClick={() => navigate(`/admin/reports/${report.id}`)}
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
                                Showing 1 to {reports.length} of {pagination.total} reports
                            </Typography>

                            <Pagination
                                count={pagination.last_page || 1}
                                page={pagination.current_page || 1}
                                color="primary"
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}