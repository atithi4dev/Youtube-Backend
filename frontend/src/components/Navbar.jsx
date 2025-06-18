import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "PLaylist", path: "/playlist" },
    { name: "Tweets", path: "/tweets" },
  ];

  const authLinks = [
        { name: "Sign Up", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
  ]

  return (
    <nav className="bg-slate-200 shadow-md w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 h-full flex items-center overflow-hidden">
            <Link
            key="youtube"
                to="/"
                className="text-black hover:text-blue-500 font-medium transition">
               <span className="text-red-600 font-semibold text-3xl font-mono">Youtube</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-black hover:text-blue-500 font-medium transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4">
            <button className="border px-4 py-1.5 rounded-xl hover:bg-gray-100 border-slate-400 transition">
              <Link to='/signin'>Sign in</Link>
            </button>
            <button className="bg-black text-white px-4 py-1.5 rounded-xl hover:opacity-90 transition">
              <Link to='/freetier'>Start for free</Link>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-100 px-4 pt-4 pb-6 space-y-4 shadow">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-black font-medium hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-4">
            <button className="border px-4 py-2 rounded-xl border-slate-400 hover:bg-gray-200 transition">
              Sign in
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 transition">
              Start for free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;