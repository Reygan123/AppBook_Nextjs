// pages/create-book.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  const handleCreateBook = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await axios.post('/api/books', { title, author, publisher, year, pages }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Book Page</h1>
        <label className="block text-sm text-gray-600">Title:</label>
        <input
          type="text"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block text-sm text-gray-600">Author:</label>
        <input
          type="text"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label className="block text-sm text-gray-600">Publisher:</label>
        <input
          type="text"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <label className="block text-sm text-gray-600">Year:</label>
        <input
          type="text"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label className="block text-sm text-gray-600">Pages:</label>
        <input
          type="text"
          className="w-full text-black border border-gray-300 p-2 rounded mb-4"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleCreateBook}
        >
          Create Book
        </button>
      </div>
    </div>
  );
}
