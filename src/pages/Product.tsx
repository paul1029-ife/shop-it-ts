import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Product from '../types/product';

// Define the type for the API response
interface ProductResponse {
  products: Product[];
}

function Products() {
  const [data, setData] = useState<Product[] | null>(null);  // Store the product data
  const [loading, setLoading] = useState<boolean>(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null);    

      try {
        const response = await axios.get<ProductResponse>('https://dummyjson.com/products');
        setData(response.data.products);  // Store the fetched data
      } catch (err) {
        setError('Failed to fetch data.');  // Handle any errors
      } finally {
        setLoading(false);  // Set loading to false once finished
      }
    };

    fetchData();
  }, []);  // Empty dependency array means this runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;  // Display a loading state
  }

  if (error) {
    return <div>{error}</div>;  // Display an error message
  }

  // Render the data once loading is complete and no errors occurred
  return (
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold mb-8 text-blue-800">Our Products</h2>
          {/* Add product listing here */}
        
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          </div>
  );
}

export default Products;

