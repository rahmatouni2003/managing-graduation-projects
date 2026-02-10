import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
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
        <img src={logo} alt="Logo" className="w-24 h-24 mb-6 md:mb-0" />
      </div>

      {/* Form */}
      <div className="flex justify-center items-center md:items-start w-full mt-20 md:mt-0">
        <form
          onSubmit={handleVerify}
          className="w-full max-w-lg md:max-w-xl lg:max-w-2xl md:mt-10"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-2">Forget Password</h2>

          <p className="text-gray-500 mb-6">
            We have sent a verification code to your email.
            <br />
            Please Enter the OTP below.
          </p>

          {/* Info box */}
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex gap-3">
            <span className="text-green-600">✔</span>
            <p className="text-sm text-gray-700">
              We have sent a code to :
              <br />
              <span className="font-medium">
                ahmedkhaled.bsu@fcis.bsu.edu.eg
              </span>
            </p>
          </div>

          {/* OTP Header */}
          <div className="flex justify-between items-start mb-3">
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

              <div
                className="bg-gray-100 px-4 py-2 rounded-md 
                           text-gray-500 text-sm inline-block mt-2"
              >
                00:45
              </div>
            </div>
          </div>

          {/* OTP Inputs */}
          <div className="flex gap-4 mb-8">
            {[1, 2, 3, 4].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
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
                       font-medium hover:bg-blue-700 transition mb-4"
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
