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
    <div className="w-auto h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1.5 border border-black rounded-md px-10 flex flex-col items-center bg-white justify-center ">
      <img src={logoImage} alt="logo" className="w-28 h-auto mt-4 mx-auto" />
      <div className="w-auto h-auto rounded-md px-10 flex flex-col items-center bg-white mt-10">
        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}
        <input
          type="text"
          placeholder="Numero telephone"
          value={Num_Tel}
          onChange={(event) => setNum_Tel(event.target.value)}
          className="block w-64 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-5"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="block w-64 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-5"
        />
        <button onClick={login} className="bg-teal-400 px-4 py-2 border border-black hover:bg-red-700 hover:text-white rounded-lg mb-2 mt-3 w-64">Login</button>
        <button onClick={redirect} className="bg-teal-400 px-4 py-2 border border-black hover:bg-red-700 hover:text-white rounded-lg mb-4 w-64">Sign Up</button>
      </div>
    </div>
  );
}

export default Login;