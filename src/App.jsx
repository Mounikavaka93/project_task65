import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MallProvider } from './context/MallContext';
import FloorRail from './components/FloorRail';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Offers from './pages/Offers';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Stores from './pages/Stores';

function Shell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Loader />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <FloorRail />
      <main id="content" key={pathname} className={`page-in flex-1 ${pathname === '/' ? '' : 'pt-16 md:pt-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Auth mode="signin" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MallProvider>
        <Shell />
      </MallProvider>
    </BrowserRouter>
  );
}
