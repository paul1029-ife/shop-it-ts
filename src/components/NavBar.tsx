import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { useState } from "react";

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm("");
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-300">
            Shop-it
          </Link>
          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden block focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white border-b-2 border-white" : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-white border-b-2 border-white" : "hover:text-gray-300"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-white border-b-2 border-white" : "hover:text-gray-300"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-white border-b-2 border-white" : "hover:text-gray-300"
              }
            >
              Contact
            </NavLink>
          </nav>
          {/* Right-side icons (Search & Cart) */}
          <div className="flex items-center space-x-4">
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            )}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-gray-300"
            >
              <Search className="w-6 h-6" />
            </button>
            <Link to="/cart" className="relative hover:text-gray-300">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-[-8px] right-[-5px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 py-4">
            <div className="space-y-4 text-center">
              <NavLink
                to="/"
                className="block text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="block text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className="block text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="block text-white hover:text-gray-300"
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
