import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from '../../assets/logo2.png';
import Auth from "../../Services/Auth.model"; 
import Student from "../../Services/student.model";
const styles = {
  mainContainer: {
    minHeight: "100vh",
    backgroundColor: "#f3f3f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "#fff",
    p: 4,
    borderRadius: 3,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoBox: {
    width: "160px",
    mb: 4,
  },
  formWrapper: {
    width: "100%",
    textAlign: "center",
  },
  label: {
    color: "#1a4fa3",
    fontWeight: "bold",
    mb: 1,
  },
  input: {
    mb: 3,
    "& .MuiOutlinedInput-input": { textAlign: "center" },
  },
  forgetPassword: {
    textAlign: "center",
    color: "red",
    fontSize: "12px",
    mb: 3,
    cursor: "pointer",
  },
  loginBtn: {
    backgroundColor: "#1a4fa3",
    py: 1.2,
    mb: 3,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: "bold",
    ":hover": { backgroundColor: "#163d82" },
  },
  guestLink: {
    fontSize: "13px",
    color: "#1a4fa3",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
};
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState(""); // تخزين الـ National ID
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleLogin = async () => {
  if (!id || !password) {
    alert("Please enter both ID and Password");
    return;
  }
  setLoading(true);
  try {
    const loginResponse = await Auth.Login({
      national_id: id,
      password: password,
    });
    if (loginResponse?.token) {
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("user", JSON.stringify(loginResponse.user));
      navigate("/");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.card}>
        {/* Logo */}
        <Box sx={styles.logoBox}>
          <img src={logo} alt="logo" style={{ width: "100%" }} />
        </Box>

        {/* Form */}
        <Box sx={styles.formWrapper}>
          <Typography sx={styles.label}>ID</Typography>
          <TextField
            fullWidth
            placeholder="Enter National ID"
            variant="outlined"
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={styles.input}
          />

          <Typography sx={styles.label}>Password</Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="********"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ ...styles.input, mb: 1 }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <Typography sx={styles.forgetPassword}>
            Forget Password ?
          </Typography>

          <Button 
            fullWidth 
            variant="contained" 
            sx={styles.loginBtn}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Typography sx={styles.guestLink}>
            Don't have an account? Continue as a Guest
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}