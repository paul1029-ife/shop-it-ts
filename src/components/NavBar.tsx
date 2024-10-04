import { ShoppingCart, Search, Menu } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { useState } from 'react';

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm('')
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };
  return (
    <>
       <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold hover:text-blue-200">Shop-it</Link>
      <nav className="hidden md:flex space-x-4">
        <NavLink to="/" className={({ isActive }) => 
          isActive ? "text-blue-200 font-bold" : "hover:text-blue-200"
        }>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => 
          isActive ? "text-blue-200 font-bold" : "hover:text-blue-200"
        }>
          Products
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => 
          isActive ? "text-blue-200 font-bold" : "hover:text-blue-200"
        }>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => 
          isActive ? "text-blue-200 font-bold" : "hover:text-blue-200"
        }>
          Contact
        </NavLink>
      </nav>
      <div className="flex items-center space-x-4">
      {isSearchOpen && (
        <form onSubmit={handleSearchSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full relative bottom-2 px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </form>
      )}
      <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-blue-200">
            <Search className="w-6 h-6" />
          </button>
        <Link to="/cart" className="hover:text-blue-200 relative">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        <Menu className="w-6 h-6 md:hidden cursor-pointer hover:text-blue-200" />
      </div>
    </div>
  </header>
    </>
  );
}