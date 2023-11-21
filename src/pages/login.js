// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });

      const token = response.data.token;
      Cookies.set('token', token);

      console.log(response.data);

      // Set login success message
      setLoginMessage('Login successful! Redirecting to home page...');

      // Redirect to the home page or perform other actions as needed
      window.location.href = '/';
    } catch (error) {
      console.error(error.response.data.message);
      // Set login error message
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Login Page</h1>
        <label className="block text-sm text-gray-600">Email:</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-sm text-gray-600">Password:</label>
        <input
          type="password"
          className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Display login message */}
        {loginMessage && <p className="text-green-500 mt-2">{loginMessage}</p>}
      </div>
    </div>
  );
}
