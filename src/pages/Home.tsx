import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Product from "../types/product";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products.slice(0, 6)); // Get first 4 products
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Shop-it</h2>
          <p className="text-xl mb-8">
            Discover amazing products at unbeatable prices!
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-blue-800">
            Featured Products
          </h3>
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
        <div className="px-10 py-3">
          <Link
            to={"/products"}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            View More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
