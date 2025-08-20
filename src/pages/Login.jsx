import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex">

      <div
        className="hidden md:flex flex-1 justify-center items-center p-8 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            Shop with your favourite brands now!!
          </h2>
          <p className="text-sm max-w-sm mx-auto">
            Ecommerce Shopping-website created by Sheetal
          </p>
        </div>
      </div>



      <div className="flex flex-1 flex-col justify-center items-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-center text-3xl font-bold mb-2">Sheetal's Ecommerce</h1>
          <p className="text-center text-gray-600 mb-6">
            Welcome to Ecommerce!
          </p>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Username or Email</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right mt-1">
                <a href="#" className="text-xs text-gray-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm">Sign in with Google</span>
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            New to Ecommerce?{" "}
            <a href="#" className="text-green-600 hover:underline">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


