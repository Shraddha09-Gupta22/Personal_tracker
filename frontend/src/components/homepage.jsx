import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
        Welcome to Personal Expense Tracker 💸
      </h1>
      <p className="text-lg md:text-xl text-center mb-8 max-w-xl">
        Track your income, expenses, and set your monthly budgets with ease!
      </p>

      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-100 transition-all duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-purple-100 transition-all duration-200"
        >
          Register
        </button>
      </div>

      <footer className="mt-16 text-sm text-indigo-200">
        Built with 💜 by Shraddha Gupta
      </footer>
    </div>
  );
};

export default HomePage;
