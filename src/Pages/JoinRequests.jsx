import { Box } from "@mui/material";
import ProjectTabs from "../Components/JoinTabs";

const JoinRequests = () => {
  const projects = [
    {
      name: "Smart Farming System",
      department: "CS Department",
      description: "An innovative agricultural solution that utilizes IoT sensors to monitor soil moisture, temperature, and pH levels in real-time. The system automatically controls irrigation pumps through a mobile app to optimize water consumption and improve crop yield using automated data analysis",
    type: "active",
members: [
  {
    image: "https://i.pravatar.cc/150?img=1",
    name: "Ahmed",
    role: "Frontend",
  },
  {
    image: "https://i.pravatar.cc/150?img=2",
    name: "Sara",
    role: "Backend",
  },
  {
    image: "https://i.pravatar.cc/150?img=3",
    name: "Mona",
    role: "UI/UX",
  },
  {
    image: "https://i.pravatar.cc/150?img=4",
    name: "Ali",
    role: "Frontend",
  },
  {
    image: "https://i.pravatar.cc/150?img=5",
    name: "Omar",
    role: "Backend",
  },
],
    projectPDF: "Smart_Farming_Proposal.pdf",
    category : "IoT & Embedded Systems"
    },
    {
      name: "SecurePass AI",
      department: "Cybersecurity",
      description: "An innovative agricultural solution that utilizes IoT sensors to monitor soil moisture, temperature, and pH levels in real-time. The system automatically controls irrigation pumps through a mobile app to optimize water consumption and improve crop yield using automated data analysis",
      type: "archived",
members: [
  {
    image: "https://i.pravatar.cc/150?img=1",
    name: "Ahmed",
    role: "Frontend",
  },
  {
    image: "https://i.pravatar.cc/150?img=2",
    name: "Sara",
    role: "Backend",
  },
  {
    image: "https://i.pravatar.cc/150?img=3",
    name: "Mona",
    role: "UI/UX",
  },
  {
    image: "https://i.pravatar.cc/150?img=4",
    name: "Ali",
    role: "Frontend",
  },
  {
    image: "https://i.pravatar.cc/150?img=5",
    name: "Omar",
    role: "Backend",
  },
],
    projectPDF: "Smart_Farming_Proposal.pdf",
    category : "IoT & Embedded Systems"
    },
  ];

  return (
    <Box p={3}>
      <ProjectTabs projects={projects} />
    </Box>
  );
};

export default JoinRequests;