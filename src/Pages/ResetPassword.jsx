import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("password reset");
    navigate("/");
  };

  return (
    <div className="bg-white px-4 min-h-screen flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-24 h-24" />
      </div>

      {/* Content */}
      <div className="flex flex-1 justify-center items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg md:max-w-xl lg:max-w-2xl"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-2">Forget Password</h2>

          <p className="text-gray-500 mb-6">
            Please Enter a new password for your account.
          </p>

          {/* Success Box */}
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex gap-3">
            <span className="text-green-600">✔</span>
            <p className="text-sm text-gray-700">
              The verification code is correct <br />
              You can now reset your password
            </p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* New Password */}
          <div className="mb-5">
            <label className="block text-blue-600 font-medium mb-2">
              New Password :
            </label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNew ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-7">
            <label className="block text-blue-600 font-medium mb-2">
              Confirm Password :
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md
                       font-medium hover:bg-blue-700 transition mb-4"
          >
            Reset Password
          </button>

          {/* Back */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-500 text-sm hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
