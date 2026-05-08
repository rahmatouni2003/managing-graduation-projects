import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete OTP code");
      return;
    }

    setError("");
    navigate("/reset-password");
  };

  return (
    <div
      className="bg-white px-4 
                 h-auto
                 md:min-h-screen
                 flex flex-col 
                 justify-center md:justify-start
                 overflow-hidden"
    >
      {/* Logo */}
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
      </div>

      {/* Form */}
      <div className="flex justify-center items-center md:items-start w-full mt-10 md:mt-0">
        <form
          onSubmit={handleVerify}
          className="w-full max-w-lg md:max-w-xl lg:max-w-2xl md:mt-6"
        >
          <h2 className="text-2xl font-semibold mb-1">Forget Password</h2>

          <p className="text-gray-500 mb-4">
            We have sent a verification code to your email.
            <br />
            Please Enter the OTP below.
          </p>

          {/* Info box */}
          <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex gap-3">
            <span className="text-green-600">✔</span>
            <p className="text-sm text-gray-700">
              We have sent a code to :
              <br />
              <span className="font-medium">
                ahmedkhaled.bsu@fcis.bsu.edu.eg
              </span>
            </p>
          </div>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          {/* OTP Header */}
          <div className="flex justify-between items-start mb-2">
            <label className="text-blue-600 font-medium">
              Enter OTP Code :
            </label>

            <div className="text-right">
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline block"
              >
                Reset Code
              </button>

              <div className="bg-gray-100 px-3 py-1 rounded-md text-gray-500 text-sm inline-block mt-1">
                00:45
              </div>
            </div>
          </div>

          {/* OTP Inputs */}
          <div className="flex gap-4 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-14 h-14 text-center text-xl 
                           border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Verify */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md 
                       font-medium hover:bg-blue-700 transition mb-3"
          >
            Verify
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
