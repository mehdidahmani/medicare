import React, { useState } from 'react';
import axios from 'axios';
import { logoImage } from '../assets';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [Num_Tel, setNum_Tel] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const data = { Num_Tel: Num_Tel, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        setError(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data.token);
        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    });
  };

  const redirect = () => {
    navigate("/registration");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        <div className="flex justify-center mb-8">
          <img src={logoImage} alt="logo" className="w-32 h-auto drop-shadow-lg" />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg animate-pulse">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={Num_Tel}
              onChange={(event) => setNum_Tel(event.target.value)}
              className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
            />
          </div>

          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Login
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Don't have an account?</span>
            </div>
          </div>

          <button
            onClick={redirect}
            className="w-full bg-white border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;