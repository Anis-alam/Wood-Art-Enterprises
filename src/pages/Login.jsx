import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";
import toast from "react-hot-toast";

import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid Email or Password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10">
        {/* Home Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#8B5E3C] px-4 py-2 text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white transition-all duration-300"
          >
            <Home size={18} />
            Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center text-[#8B5E3C]">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Wood Art Enterprises
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#8B5E3C] text-white py-4 rounded-xl hover:bg-[#6b4326] transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
