import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Product from "../types/product";
import ProductCard from "../components/ProductCard";

const SearchResultsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const [ref, inView] = useInView();

  const LIMIT = 20; // Number of products per page

  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery || !hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://dummyjson.com/products/search`, {
        params: {
          q: searchQuery,
          limit: LIMIT,
          skip: page * LIMIT
        }
      });
      const newProducts = response.data.products;
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length === LIMIT);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      setError('Failed to fetch search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, hasMore, loading]);

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchSearchResults();
    }
  }, [inView, hasMore, fetchSearchResults]);

  if (!searchQuery) return <p className="text-center py-8">No search query provided</p>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-blue-800">Search Results for "{searchQuery}"</h2>
      {products.length === 0 && !loading ? (
        <p className="text-center">No products found for your search query.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {loading && <p className="text-center py-4">Loading more results...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}
      {!loading && !error && hasMore && <div ref={ref} className="h-10" />}
    </div>
  );
};

export default SearchResultsPage;