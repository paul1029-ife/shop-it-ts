
import axios from 'axios';
import { useState, useEffect } from 'react';
import Product from '../types/product';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { Star, StarHalf, StarOff } from 'lucide-react';

const ProductDetailsPage: React.FC = () => {
  
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const { search } = useLocation();  
    const id = new URLSearchParams(search).get('id');

    useEffect(() => {
      const fetchProductDetails = async () => {
        if (!id) {
          setError('Product ID is missing');
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(`https://dummyjson.com/products/${id}`);
          setProduct(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch product details. Please try again later.');
          setLoading(false);
        }
      };

      fetchProductDetails();
    }, [id]);

    // Loading State
    if (loading) {
      return <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600"></div>
      </div>;
    }

    // Error State
    if (error) {
      return <p className="text-center text-red-500 py-8">{error}</p>;
    }

    // No Product Found State
    if (!product) {
      return <p className="text-center py-8">Product not found</p>;
    }

    return (
      <div className="container mx-auto py-12 px-4 md:px-12">
        {/* Product Title */}
        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">{product.title}</h2>

        {/* Grid for Image and Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img src={product.thumbnail} alt={product.title} className="w-full h-auto rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300" />
            <div className="mt-6 grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((image, index) => (
                <img key={index} src={image} alt={`${product.title} - ${index + 1}`} className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-300" />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <p className="text-2xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>

            <ul className="space-y-3 text-gray-700">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li className='flex gap-2'><strong>Rating:</strong> <StarRating rating={product.rating}/></li>
              <li><strong>Stock:</strong> {product.stock}</li>
              <li><strong>Discount:</strong> {product.discountPercentage}%</li>
            </ul>

            {/* Buttons for Add to Cart and Buy Now */}
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => addToCart(product)} 
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button 
                className="bg-slate-100 text-black px-6 py-3 rounded-full hover:bg-slate-200 transition-colors duration-300"
                onClick={() => {
                  addToCart(product); 
                  alert('Redirecting to checkout page'); 
                  // You could programmatically route to a checkout page here
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductDetailsPage;

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = (rating: number) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(<Star key={i} className="text-yellow-500 inline-block" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Half star for decimal values
        stars.push(<StarHalf key={i} className="text-yellow-500 inline-block" />);
      } else {
        // Empty star
        stars.push(<StarOff key={i} className="text-gray-400 inline-block" />);
      }
    }

    return stars;
  };

  return <div>{renderStars(rating)}</div>;
};
