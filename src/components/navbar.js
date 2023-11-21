// components/Navbar.js
import Link from 'next/link';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="bg-[#19376D] px-2 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link href="/">
                        <p className="text-white text-2xl font-bold">BooM</p>
                    </Link>
                </div>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link href="/add-book">
                                <button className="rounded-md px-4 py-2 bg-blue-500">Create Book</button>
                            </Link>
                            <button className="rounded-md px-4 py-2 bg-red-500" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="rounded-md px-4 py-2 bg-blue-500">Login</button>
                            </Link>
                            <Link href="/register">
                                <button className="rounded-md px-4 py-2 bg-green-500">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
