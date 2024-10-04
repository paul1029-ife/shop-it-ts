import { useEffect, useState } from "react";
import Product from "../types/product";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const SearchResultsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');
  
    useEffect(() => {
      const fetchSearchResults = async () => {
        if (!searchQuery) {
          setError('No search query provided');
          setLoading(false);
          return;
        }
  
        try {
          const response = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`);
          setProducts(response.data.products);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch search results. Please try again later.');
          setLoading(false);
        }
      };
  
      fetchSearchResults();
    }, [searchQuery]);
  
    if (loading) return <p className="text-center py-8">Loading search results...</p>;
    if (error) return <p className="text-center text-red-500 py-8">{error}</p>;
  
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8 text-blue-800">Search Results for "{searchQuery}"</h2>
        {products.length === 0 ? (
          <p className="text-center">No products found for your search query.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  };

  export default SearchResultsPage