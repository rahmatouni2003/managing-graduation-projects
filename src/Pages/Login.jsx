import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id.trim() || !password.trim()) {
      setError("Please enter ID and Password");
      return;
    }

    setError("");
    login();
    navigate("/doctor");
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
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="mb-6">
            <label className="block text-blue-600 font-medium mb-2">ID</label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              placeholder="221"
              className="w-full border border-gray-300 rounded-md px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2">
            <label className="block text-blue-600 font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="text-right mb-6">
            <button
              type="button"
              onClick={() => navigate("/forget-password")}
              className="text-red-500 text-sm hover:underline"
            >
              Forget Password ?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md 
                       font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
