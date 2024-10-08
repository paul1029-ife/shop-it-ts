import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Product from '../types/product';


const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>(); // Retrieve the category parameter
  const [products, setProducts] = useState<Product[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch products when the component mounts or when the category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://dummyjson.com/products');
        const allProducts = response.data.products;

        // Filter products by category if the category is provided
        const filteredProducts = allProducts.filter((product: any) =>
          product.category.toLowerCase() === category?.toLowerCase()
        );

        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='mt-14 w-full'>
    <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white text-3xl uppercase text-center p-3"> {category} Products</h1>
    <div className='px-3 pb-4'>
    {products.length > 0 ? (
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </ul>
    ) : (
      <p>No products found in this category.</p>
    )}
  </div>
  </div>
  )
}

export default CategoryPage