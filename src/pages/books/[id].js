// pages/books/[id].js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image'

const BookDetail = ({ book: initialBook }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({
        title: initialBook.title,
        author: initialBook.author,
        publisher: initialBook.publisher,
        year: initialBook.year,
        pages: initialBook.pages,
    });
    const [currentBook, setCurrentBook] = useState(initialBook);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleEdit = async () => {
        try {
            // Call API to save book changes
            await axios.put(`http://localhost:3000/api/books/${initialBook.id}`, editedBook);
            // Set editing mode back to false
            setIsEditing(false);
            // Update the book state used for display
            setCurrentBook(editedBook);
        } catch (error) {
            console.error('Error editing book:', error);
        }
    };

    const handleDelete = async () => {
        try {
            // Call API to delete the book
            await axios.delete(`http://localhost:3000/api/books/${initialBook.id}`);
            // Redirect back to the main page after deletion
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleCancel = () => {
        // Set editing mode back to false without saving changes
        setIsEditing(false);
        // Set the edited book back to the original book value
        setEditedBook({
            title: initialBook.title,
            author: initialBook.author,
            publisher: initialBook.publisher,
            year: initialBook.year,
            pages: initialBook.pages,
        });
    };

    return (
        <div className="bg-[#19376D] text-white h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-4">
                {isLoggedIn ? (
                    <div>
                        {isEditing ? (
                            <div>
                                <h1 className="text-3xl mb-4">Edit Book</h1>
                                <label className="block text-white text-sm font-bold mb-4">Title:</label>
                                <input
                                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={editedBook.title}
                                    onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                                />
                                <br />
                                <label className="block text-white text-sm font-bold mb-4">Author:</label>
                                <input
                                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={editedBook.author}
                                    onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                                />
                                <br />
                                <label className="block text-white text-sm font-bold mb-4">Publisher:</label>
                                <input
                                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={editedBook.publisher}
                                    onChange={(e) => setEditedBook({ ...editedBook, publisher: e.target.value })}
                                />
                                <br />
                                <label className="block text-white text-sm font-bold mb-4">Year:</label>
                                <input
                                    className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={editedBook.year}
                                    onChange={(e) => setEditedBook({ ...editedBook, year: e.target.value })}
                                />
                                <br />
                                <label className="block text-white text-sm font-bold mb-4">Pages:</label>
                                <input
                                    className="mb-10 shadowappearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={editedBook.pages}
                                    onChange={(e) => setEditedBook({ ...editedBook, pages: e.target.value })}
                                />
                                <button
                                    className="bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleEdit}
                                >
                                    Save Changes
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="text-xl">
                                <h1 className="text-3xl mb-4">{currentBook.title}</h1>
                                <p className="py-2"><span className="font-bold mr-2">Title:</span>{currentBook.title}</p>
                                <p className="py-2"><span className="font-bold mr-2">Author:</span>{currentBook.author}</p>
                                <p className="py-2"><span className="font-bold mr-2">Publisher:</span>{currentBook.publisher}</p>
                                <p className="py-2"><span className="font-bold mr-2">Year:</span>{currentBook.year}</p>
                                <p className="pt-2 mb-4"><span className="font-bold mr-2">Pages:</span> {currentBook.pages}</p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl mb-4">{currentBook.title}</h1>
                        <p className="py-2"><span className="font-bold mr-2">Title:</span>{currentBook.title}</p>
                        <p className="py-2"><span className="font-bold mr-2">Author:</span>{currentBook.author}</p>
                        <p className="py-2"><span className="font-bold mr-2">Publisher:</span>{currentBook.publisher}</p>
                        <p className="py-2"><span className="font-bold mr-2">Year:</span>{currentBook.year}</p>
                        <p className="pt-2 mb-4"><span className="font-bold mr-2">Pages:</span> {currentBook.pages}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export async function getServerSideProps({ params }) {
    const res = await axios.get(`http://localhost:3000/api/books/${params.id}`);
    const data = res.data;

    return {
        props: {
            book: data.book,
        },
    };
}

export default BookDetail;
