import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { name, email, password });
      console.log(response.data);
      setRegistrationMessage('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error(error.response.data.message);

      setRegistrationMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-2/5">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Register</h1>

        {/* Display registration message */}
        {registrationMessage && <p className="text-green-500 mt-2">{registrationMessage}</p>}

        <label className="block text-sm text-gray-600">Name:</label>
        <input
          type="text"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block text-sm text-gray-600">Email:</label>
        <input
          type="text"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-sm text-gray-600">Password:</label>
        <input
          type="password"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
