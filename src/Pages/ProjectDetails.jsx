import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  MdChat,
  MdFolderOpen,
  MdCheckCircle,
  MdAccessTime,
  MdLock,
} from "react-icons/md";

export default function ProjectDashboard() {
 const cell = {
  border: "1px solid #e5e7eb",
  fontSize: "14px",
  padding: "12px",
};

const viewBtn = {
  textTransform: "none",
  fontSize: "12px",
  background: "#ede9fe",
  color: "#5b21b6",
  borderRadius: "8px",
  padding: "4px 12px",
  "&:hover": {
    background: "#ddd6fe",
  },
};
  return (
    <Box sx={{ p: 3, background: "#f4f6fb", minHeight: "100vh" }}>
      
      {/* Top Card */}
      <Card sx={{ borderRadius: 4, mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            
            {/* Image */}
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                src="https://via.placeholder.com/250"
                sx={{ width: "100%", borderRadius: 3 }}
              />
            </Grid>

            {/* Content */}
            <Grid item xs={12} md={9}>
              <Typography fontWeight="bold" fontSize={20}>
                Blockchain-based Certificate
              </Typography>

              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Typography variant="body2">Team A:</Typography>
                <Chip
                  label="On Track"
                  sx={{ bgcolor: "#e6f7ee", color: "green", fontWeight: "bold" }}
                  size="small"
                />
              </Box>

              <Typography variant="body2" color="text.secondary" mt={1}>
                Secure academic credential verification using Ethereum smart contracts
              </Typography>

              <Box mt={2}>
                <Typography variant="body2">
                  <b>Current Milestone:</b> User Interface Design & Prototyping
                </Typography>
                <Typography variant="body2">
                  <b>Deadline:</b> Jan 30, 2026
                </Typography>
              </Box>

              <Box mt={2} display="flex" gap={1}>
                <Button
                  variant="contained"
                  startIcon={<MdChat />}
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  Open Team Chat
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<MdFolderOpen />}
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  View All Files
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Team Progress */}
      <Card sx={{ borderRadius: 4, mb: 3 }}>
        <CardContent>
          <Typography fontWeight="bold" mb={2}>
            Team Progress
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Typography></Typography>
            <Typography fontWeight="bold">65% Complete</Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={65}
            sx={{
              height: 10,
              borderRadius: 5,
              mt: 1,
              background: "#eee",
            }}
          />

          {/* Steps */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            {[
              { label: "Initial Proposal", icon: <MdCheckCircle />, color: "green" },
              { label: "Requirements & Planning", icon: <MdCheckCircle />, color: "green" },
              { label: "Design & Development", icon: <MdAccessTime />, color: "orange" },
              { label: "Internal Defense", icon: <MdLock />, color: "gray" },
              { label: "Final Defense", icon: <MdLock />, color: "gray" },
            ].map((step, i) => (
              <Box key={i} textAlign="center" flex={1}>
                <Box fontSize={20} color={step.color}>
                  {step.icon}
                </Box>
                <Typography variant="caption">{step.label}</Typography>
              </Box>
            ))}
          </Box>

          {/* Legend */}
          <Box display="flex" gap={2} mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <MdCheckCircle color="green" /> <Typography variant="caption">Completed</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <MdAccessTime color="orange" /> <Typography variant="caption">In Progress</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <MdLock color="gray" /> <Typography variant="caption">Locked</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Table */}
 
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        boxShadow: "none",
      }}
    >
      <CardContent>
        <Typography fontWeight="bold" mb={2}>
          Milestone Progress
        </Typography>

        <Table
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <TableHead>
            <TableRow sx={{ background: "#f3f4f6" }}>
              {["Milestone", "Status", "Grade", "Feedback"].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: "bold",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Row 1 */}
            <TableRow>
              <TableCell sx={cell}>Project Discovery</TableCell>

              <TableCell sx={cell}>
                <span style={{ color: "#22c55e", fontWeight: 500 }}>
                  ✔ Completed
                </span>
              </TableCell>

              <TableCell sx={cell}>18/20</TableCell>

              <TableCell sx={cell}>
                <Button sx={viewBtn}>View</Button>
              </TableCell>
            </TableRow>

            {/* Row 2 */}
            <TableRow>
              <TableCell sx={cell}>UI Design & Prototyping</TableCell>

              <TableCell sx={cell}>
                <span style={{ color: "#ef4444", fontWeight: 500 }}>
                  ✖ Delayed
                </span>
              </TableCell>

              <TableCell sx={cell}>—</TableCell>

              <TableCell sx={cell}>
                <Button sx={viewBtn}>View</Button>
              </TableCell>
            </TableRow>

            {/* Row 3 */}
            <TableRow>
              <TableCell sx={cell}>
                Backend & API Integration
              </TableCell>

              <TableCell sx={cell}>
                <span style={{ color: "#f59e0b", fontWeight: 500 }}>
                  ⏳ In Progress
                </span>
              </TableCell>

              <TableCell sx={cell}>—</TableCell>

              <TableCell sx={cell}>—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    </Box>
  );
}