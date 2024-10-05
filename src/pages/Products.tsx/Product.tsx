import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import ProductCard from "../../components/ProductCard";
import Product from "../../types/product";
import { useInView } from "react-intersection-observer";

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

  const LIMIT = 20; // Number of products per page

  const fetchData = useCallback(async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    setError(null);
   
    try {
      const response = await axios.get<ProductResponse>('https://dummyjson.com/products', {
        params: { limit: LIMIT, skip: page * LIMIT }
      });
      const { products, total } = response.data;
      
      setData(prevData => [...prevData, ...products]);
      setHasMore((page + 1) * LIMIT < total);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch initial data on mount

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchData();
    }
  }, [inView, hasMore, loading, fetchData]);

  const groupedProducts = data.reduce((acc: { [key: string]: Product[] }, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-blue-500">Our Products</h2>

      <div className="container mx-auto py-8">
        {Object.keys(groupedProducts).map((category) => (
          <section key={category} className="mb-12">
            <div className="bg-blue-500 text-white p-6 rounded-lg mb-6 flex items-center justify-between">
              <h2 className="text-4xl font-bold">{category}</h2>
              <button className="bg-slate-200 text-black py-2 px-4 rounded hover:bg-slate-300">
                Explore {category}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groupedProducts[category].map((product) => (
               <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {loading && (
        <div className="col-span-full flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {!loading && !error && hasMore && (
        <div ref={ref} className="h-10" />
      )}
    </div>
  );
}

export default Products;