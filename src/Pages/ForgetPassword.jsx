import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      {/* Logo */}
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-6 md:mb-0" />
      </div>

      {/* Form */}
      <div className="flex justify-center items-center md:items-start w-full mt-20 md:mt-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg md:max-w-xl lg:max-w-2xl md:mt-10"
        >
          <h2 className="text-2xl font-semibold mb-2">Forget Password</h2>

          <p className="text-gray-500 mb-6">
            Please enter your ID to receive a verification code.
          </p>

          {/* ID */}
          <div className="mb-6">
            <label className="block text-blue-600 font-medium mb-2">
              Enter your ID :
            </label>
            <input
              type="text"
              placeholder="221"
              className="w-full border border-gray-300 rounded-md px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md 
                       font-medium hover:bg-blue-700 transition mb-4"
          >
            Submit
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
