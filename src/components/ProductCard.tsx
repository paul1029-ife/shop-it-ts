import { Eye, ShoppingCart } from "lucide-react";
import Product from "../types/product";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const navigate = useNavigate();
    const {addToCart} = useCart()
  
    const handleViewClick = () => {
      navigate(`/product?id=${product.id}`);
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:scale-105">
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
        <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
        <p className="text-blue-600 font-bold mb-4">${product.price.toFixed(2)}</p>
        <div className="flex justify-between">
          <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
          <button 
            onClick={handleViewClick}
            className="bg-gray-200 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-300 transition duration-300 flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </button>
        </div>
      </div>
    );
  };
  
  
  export default ProductCard