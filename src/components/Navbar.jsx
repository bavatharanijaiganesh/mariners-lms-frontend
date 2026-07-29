import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { Menu, X, Ship, User, ShoppingCart } from 'lucide-react';
import { cn } from '../utils/cn';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'About Us', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const [user, setUser] = useState(null);

  useEffect(() => {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {

      setUser(loggedInUser);

    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Ship className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[var(--color-heading)] hidden sm:block">
                Mariners Learning System
              </span>
              <span className="font-bold text-xl tracking-tight text-[var(--color-heading)] sm:hidden">
                MLS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-[var(--color-primary)] bg-primary/10"
                      : "text-[var(--color-body)] hover:text-[var(--color-primary)] hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions Section */}
          <div className="hidden md:flex items-center gap-4">
            {user && (

              <p className="font-semibold text-blue-600">

                Welcome {user.full_name}

              </p>

            )}
            <button className="p-2 text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
            </button>
            {
              token ? (

                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[var(--color-primary)] border"
                  >
                    <User className="h-4 w-4" />

                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-xl text-white bg-red-500"
                  >
                    Logout
                  </button>
                </>

              ) : (

                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[var(--color-primary)] bg-white border-2 border-[var(--color-primary)]"
                  >
                    <User className="h-4 w-4" />

                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-xl font-medium text-white bg-[var(--color-primary)]"
                  >
                    Enroll Now
                  </Link>

                </>
              )
            }
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button className="p-2 text-[var(--color-body)]">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-body)] hover:text-[var(--color-primary)] hover:bg-gray-100 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-md text-base font-medium transition-colors",
                    isActive
                      ? "text-[var(--color-primary)] bg-primary/10"
                      : "text-[var(--color-body)] hover:text-[var(--color-primary)] hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-6 flex flex-col gap-3 px-3">
              {
                token ? (

                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[var(--color-primary)] border"
                    >
                      <User className="h-4 w-4" />

                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="px-5 py-2.5 rounded-xl text-white bg-red-500"
                    >
                      Logout
                    </button>
                  </>

                ) : (

                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[var(--color-primary)] bg-white border-2 border-[var(--color-primary)]"
                    >
                      <User className="h-4 w-4" />

                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="px-5 py-2.5 rounded-xl font-medium text-white bg-[var(--color-primary)]"
                    >
                      Enroll Now
                    </Link>

                  </>
                )
              }
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
