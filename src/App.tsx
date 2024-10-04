import NavBar from "./components/NavBar"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Product from "./pages/Products.tsx/Product";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import Footer from "./components/Footer";
import ProductDetailsPage from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import CartProvider from "./context/Cart";
import SearchResultsPage from "./pages/SearchResultPage";

const App: React.FC = () => {
  return (
    // eslint-disable-next-line no-use-before-define
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Product />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product" element={<ProductDetailsPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;
