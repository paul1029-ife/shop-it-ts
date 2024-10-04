import { Link } from "react-router-dom";

const Footer: React.FC = () => (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Shop-it. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link to="/privacy" className="hover:text-blue-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-300">Terms of Service</Link>
          <Link to="/contact" className="hover:text-blue-300">Contact Us</Link>
        </div>
      </div>
    </footer>
  );

export default Footer