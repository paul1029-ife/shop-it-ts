
import axios from 'axios';
import { useState, useEffect } from 'react';
import Product from '../types/product';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/Cart';

const ProductDetailsPage: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart()
    const { search } = useLocation();  // Get query string, including "?"
     const id = new URLSearchParams(search).get('id'); 
    console.log(id)
    useEffect(() => {
      const fetchProductDetails = async () => {
        console.log(id)
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
  
    if (loading) return <p className="text-center py-8">Loading product details...</p>;
    if (error) return <p className="text-center text-red-500 py-8">{error}</p>;
    if (!product) return <p className="text-center py-8">Product not found</p>;
  
    return (
        <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8 text-blue-800">{product.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={product.thumbnail} alt={product.title} className="w-full h-auto rounded-lg shadow-md" />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <img key={index} src={image} alt={`${product.title} - ${index + 1}`} className="w-full h-24 object-cover rounded" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>
            <ul className="space-y-2">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Rating:</strong> {product.rating}/5</li>
              <li><strong>Stock:</strong> {product.stock}</li>
              <li><strong>Discount:</strong> {product.discountPercentage}%</li>
            </ul>
            <button 
              onClick={() => addToCart(product)}
              className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export  default ProductDetailsPage;
