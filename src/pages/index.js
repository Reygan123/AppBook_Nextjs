// pages/index.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import Image from 'next/image'

const Home = ({ books, isLoggedIn }) => {
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleLogout = () => {
    // Clear token from cookies or perform other logout actions
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setLogoutMessage('Logout successful! Redirecting to home page...');
    // Redirect to the home page or perform other actions as needed
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="bg-[#0B2447] text-white min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="mx-24 my-10">
        <HeroSection />
      </div>
      <div className="flex flex-grow p-24 justify-around">
        <div className="grid grid-cols-3 gap-10">
          {books.map(book => (
            <div key={book.id} className="mb-4">
              <Link href={`/books/${book.id}`}>
                <p className="cursor-pointer text-white uppercase font-bold">{book.title}</p>
                <p className="text-sm text-gray-500">{book.author} - <span className="text-sm text-gray-500">{book.year}</span></p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token || '';

  // Fetch books data from the API
  const res = await axios.get('http://localhost:3000/api/books');
  const data = res.data;

  return {
    props: {
      books: data.books,
      isLoggedIn: !!token, // Check if the user is logged in
    },
  };
}

export default Home;
