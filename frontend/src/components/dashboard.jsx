import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [recentExpenses, setRecentExpenses] = useState([]);

  // ✅ Fetch user profile + expenses after login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // if no token, redirect back to login
      return;
    }

    const fetchData = async () => {
      try {
        // get user profile
        const userRes = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userRes.data);

        // get all expenses
        const expenseRes = await axios.get(
          "http://localhost:5000/api/allExpense",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const expenses = expenseRes.data.expenses || [];
        setRecentExpenses(expenses.slice(0, 5)); // last 5

        // calculate stats
        const income = expenses
          .filter((e) => e.type === "income")
          .reduce((sum, e) => sum + e.amount, 0);

        const expense = expenses
          .filter((e) => e.type === "expense")
          .reduce((sum, e) => sum + e.amount, 0);

        setStats({
          totalIncome: income,
          totalExpense: expense,
          balance: income - expense,
        });
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        navigate("/login"); // if token invalid, back to login
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Welcome, {user?.name || "User"} 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Income</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">
            ₹ {stats.totalIncome}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Expense</h2>
          <p className="text-2xl font-bold text-red-500 mt-2">
            ₹ {stats.totalExpense}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Balance</h2>
          <p className="text-2xl font-bold text-indigo-500 mt-2">
            ₹ {stats.balance}
          </p>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-5xl">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Recent Transactions
        </h2>
        {recentExpenses.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentExpenses.map((exp) => (
              <li
                key={exp._id}
                className="flex justify-between py-3 px-2 hover:bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{exp.category}</span>
                <span
                  className={`${
                    exp.type === "income" ? "text-green-500" : "text-red-500"
                  } font-semibold`}
                >
                  {exp.type === "income" ? "+" : "-"}₹ {exp.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
