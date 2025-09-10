import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", formData);
      alert("Registration Successful!");
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Register
        </h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <span
            className="text-indigo-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}

export default register;
