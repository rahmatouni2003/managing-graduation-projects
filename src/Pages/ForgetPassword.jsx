import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // empty check
    if (!id.trim()) {
      setError("ID is required");
      return;
    }

    // numbers only check
    if (!/^\d+$/.test(id)) {
      setError("ID must contain numbers only");
      return;
    }

    setError("");
    navigate("/verify-otp");
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
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-6 md:mb-0" />
      </div>

      <div className="flex justify-center items-center md:items-start w-full mt-20 md:mt-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg md:max-w-xl lg:max-w-2xl md:mt-10"
        >
          <h2 className="text-2xl font-semibold mb-2">Forget Password</h2>

          <p className="text-gray-500 mb-6">
            Please enter your ID to receive a verification code.
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-6">
            <label className="block text-blue-600 font-medium mb-2">
              Enter your ID :
            </label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              placeholder="221"
              className="w-full border border-gray-300 rounded-md px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md 
                       font-medium hover:bg-blue-700 transition mb-4"
          >
            Submit
          </button>

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
