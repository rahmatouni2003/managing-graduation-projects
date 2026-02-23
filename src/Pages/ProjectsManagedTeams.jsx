import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
    Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Avatar
} from "@mui/material";
import { FaRegFileAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { MdCampaign } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaStar } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import { MdGrade } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { RiFileTextLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
export default function ProjectsManagedTeams() {
      const navigate = useNavigate();
  return (
<Box sx={{ display: "flex", gap: 2 }}>

  {/* ================= MAIN CONTENT (LEFT) ================= */}
 <Box sx={{ flex: 5}}>
    <Box sx={{ background: "#f5f6fa", minHeight: "100vh" }}>
        <Box sx={{ p: 2, background: "#f5f6fa", minHeight: "100vh" }}>

      {/* ================= HEADER ================= */}
<Box sx={{ p: 3, mb: 3 }}>  {/* Box بدون خلفية */}
  <Stack direction="row" justifyContent="space-between">
    <Box>
      <Typography variant="h5" fontWeight="bold">
        Projects & Managed Teams
      </Typography>
      <Typography color="text.secondary">
        Academic Year 2025-2026
      </Typography>
    </Box>

    <Box textAlign="right">
      {/* Current Milestone */}
      <Typography component="span" color="primary" fontWeight={600}>
        Current Milestone:{" "}
      </Typography>
      <Typography component="span" color="text.secondary">
        UI Design & Prototyping
      </Typography>

      <br />

      {/* Deadline with Calendar Icon */}
      <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="flex-end">
        <FaCalendarAlt style={{ fontSize: 16, color: '#1976d2' }} />
        <Typography color="primary" fontWeight={600}>
          Deadline:
        </Typography>
        <Typography color="text.secondary">
          Jan 30, 2026
        </Typography>
      </Stack>
    </Box>
  </Stack>
</Box>

      {/* ================= STATS ================= */}
<Grid container spacing={3} mb={3}>
  {[
    { 
      title: "Total Teams", 
      value: 5, 
      icon: <RiTeamFill size={20} />,
    },
    { 
      title: "On Track", 
      value: 3, 
      icon: <FaChartLine size={20} />,
      color: "#16a34a",
    },
    { 
      title: "Delayed", 
      value: 1, 
      icon: <IoIosWarning size={20} />,
      color: "#dc2626",
    },
    { 
      title: "Meetings This Week", 
      value: 2, 
      icon: <FaCalendarAlt size={20} />,
    }
  ].map((item, index) => (
    <Grid item xs={12} md={3} key={index}>
      <Card
        sx={{
          borderRadius: 3,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
      <CardContent
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 130,
  }}
>

          {/* Title + Icon */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Box sx={{ color: item.color || "#555" }}>
              {item.icon}
            </Box>


            <Typography color="text.secondary">
              {item.title}
            </Typography>
          </Stack>

          {/* Value */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: item.color || "black" }}
          >
            {item.value}
          </Typography>

        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      {/* ================= SEARCH & FILTERS ================= */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by team, project, or student"
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Department</InputLabel>
          <Select label="Department" defaultValue="">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="cs">CS</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status" defaultValue="">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="ontrack">On Track</MenuItem>
            <MenuItem value="delayed">Delayed</MenuItem>
          </Select>
        </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Grads</InputLabel>
          <Select label="Status" defaultValue="">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="ontrack">On Track</MenuItem>
            <MenuItem value="delayed">Delayed</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* ================= PROJECT CARD ================= */}
      <Card sx={{ borderRadius: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }}>

          {/* Image */}
    <Box
      component="img"
      src="https://via.placeholder.com/200"
      sx={{ width: 200, cursor: "pointer" }}
      onClick={() => navigate("/project-details")} // 👈 هنا السحر
    />

          {/* Content */}
          <Box sx={{ flex: 1, p: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Blockchain-based Certificate
            </Typography>

            <Typography color="text.secondary" mb={2}>
              Secure academic credential verification using ethereum smart contracts.
            </Typography>

            <Stack direction="row" spacing={1} mb={2}>
              <Chip label="CS" />
              <Chip label="Blockchain" />
              <Chip label="Web" />
            </Stack>

            <Typography>
              Teacher Assistant: <strong>Ahmed Fayez</strong>
            </Typography>
          </Box>

          {/* Buttons */}
<Stack spacing={1} p={2}>
  <Button
    variant="outlined"
    startIcon={<BiMessageRoundedDetail />}
    sx={{ color: "#243B56", borderColor: "#243B56" }}
  >
    Message
  </Button>

  <Button
    variant="outlined"
    startIcon={<VscFeedback />}
    sx={{ color: "#243B56", borderColor: "#243B56" }}
  >
    Give Feedback
  </Button>

  <Button
    variant="contained"
    startIcon={<MdGrade />}
    sx={{ backgroundColor: "#243B56", color: "#fff", "&:hover": { backgroundColor: "#1e324a" } }}
  >
    Grade Project
  </Button>

  <Button
    variant="outlined"
    startIcon={<RiFileTextLine />}
    sx={{ color: "#243B56", borderColor: "#243B56" }}
  >
    Open Files
  </Button>

  <Button
    variant="outlined"
    startIcon={<MdOutlineEdit />}
    sx={{ color: "#243B56", borderColor: "#243B56" }}
  >
    Request Edit
  </Button>
</Stack>

        </Stack>
      </Card>

    </Box>

    </Box>
   </Box>

{/* sidebar */}
  <Box sx={{ flex: 1 }}>
    <Box
      sx={{
        background: "#f4f6f8",
        minHeight: "100vh",
        borderLeft: "1px solid #e5e7eb"
      }}
    >

         <Box
      sx={{
       
        p: 2,
        background: "#f4f6f8",
        minHeight: "100vh"
      }}
    >
      {/* ================= UPCOMING MEETINGS ================= */}
      <Typography fontWeight="bold" mb={1}>
        Upcoming Meetings
      </Typography>

      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent sx={{ p: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs()}
              sx={{
                "& .MuiPickersDay-root.Mui-selected": {
                  backgroundColor: "#1976d2"
                }
              }}
            />
          </LocalizationProvider>
        </CardContent>
      </Card>

      {/* ================= PENDING FEEDBACK ================= */}
      <Typography fontWeight="bold" mb={1}>
        Pending Feedback
      </Typography>

      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "#e3f2fd" }}>
              <RiTeamFill color="#1976d2" />
            </Avatar>

            <Box flex={1}>
              <Typography fontWeight="600">Team B</Typography>
              <Typography variant="body2" color="text.secondary">
                AI Mental Health Companion
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary">
              3 days
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* ================= RECENTLY GRADED ================= */}
      <Typography fontWeight="bold" mb={1}>
        Recently Graded
      </Typography>

      {/* Card 1 */}
      <Card sx={{ borderRadius: 3, mb: 2 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FaStar color="#facc15" />

            <Box flex={1}>
              <Typography fontWeight="600">Team C</Typography>
              <Typography variant="body2" color="text.secondary">
                AI Mental Health Companion
              </Typography>
            </Box>

            <Chip
              label="92%"
              size="small"
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 600
              }}
            />
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="right"
            mt={1}
          >
            Jan 26
          </Typography>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FaStar color="#facc15" />

            <Box flex={1}>
              <Typography fontWeight="600">Team E</Typography>
              <Typography variant="body2" color="text.secondary">
                VR Career Simulator
              </Typography>
            </Box>

            <Chip
              label="86%"
              size="small"
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 600
              }}
            />
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="right"
            mt={1}
          >
            Jan 23
          </Typography>
        </CardContent>
      </Card>
    </Box>
 <Box sx={{ mt: 3 }}>

      {/* ================= RECENT ACTIVITY ================= */}
      <Typography fontWeight="bold" mb={1}>
        Recent Activity
      </Typography>

      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>

            {/* Activity 1 */}
            <Stack direction="row" spacing={2} alignItems="center">
              <FaRegFileAlt size={18} color="#6b7280" />
              <Box>
                <Typography variant="body2">
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>
                    Team A
                  </span>{" "}
                  submitted UI Prototype
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  30 mins ago
                </Typography>
              </Box>
            </Stack>

            <Divider />

            {/* Activity 2 */}
            <Stack direction="row" spacing={2} alignItems="center">
              <FiUpload size={18} color="#6b7280" />
              <Box>
                <Typography variant="body2">
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>
                    Team C
                  </span>{" "}
                  uploaded a file
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  2 hours ago
                </Typography>
              </Box>
            </Stack>

            <Divider />

            {/* Activity 3 */}
            <Stack direction="row" spacing={2} alignItems="center">
              <FaRegCalendarAlt size={18} color="#6b7280" />
              <Box>
                <Typography variant="body2">
                  <span style={{ color: "#2563eb", fontWeight: 600 }}>
                    Team B
                  </span>{" "}
                  requested a meeting
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  1 day ago
                </Typography>
              </Box>
            </Stack>

          </Stack>
        </CardContent>
      </Card>

      {/* ================= QUICK ACTIONS ================= */}
      <Typography fontWeight="bold" mb={1}>
        Quick Actions
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Stack>

            {[
              { icon: <FiCalendar size={18} />, label: "Schedule Meeting" },
              { icon: <MdCampaign size={18} />, label: "Send Announcement" },
              { icon: <FaChartBar size={18} />, label: "View Reports" },
              { icon: <FaTasks size={18} />, label: "View Submissions" },
              { icon: <FaTrophy size={18} />, label: "View All Milestones" },
              { icon: <FiPlus size={18} />, label: "Add New Milestone" },
              { icon: <FaRegStickyNote size={18} />, label: "Add Notes" }
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2,
                  py: 1.5,
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: "#f1f5f9"
                  }
                }}
              >
                <Box sx={{ color: "#6b7280" }}>{item.icon}</Box>
                <Typography variant="body2">
                  {item.label}
                </Typography>
              </Box>
            ))}

          </Stack>
        </CardContent>
      </Card>

    </Box>

    </Box>
 </Box>

</Box>

  );
}

