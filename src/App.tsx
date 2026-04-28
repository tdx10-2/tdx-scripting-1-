import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { Prices } from './pages/Prices';
import { Testimonials } from './pages/Testimonials';
import { Admin } from './pages/Admin';
import { AnimatePresence, motion } from 'motion/react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const PersistentWorks = () => {
  const location = useLocation();
  const isWorks = location.pathname === '/works';

  // We keep it mounted, but animate its display and opacity
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isWorks ? 1 : 0,
        y: isWorks ? 0 : 15,
        display: isWorks ? 'block' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <Works />
    </motion.div>
  );
};

const Content = () => {
  const location = useLocation();

  return (
    <>
      <PersistentWorks />
      
      <AnimatePresence mode="wait">
        {location.pathname !== '/works' && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/prices" element={<PageWrapper><Prices /></PageWrapper>} />
            <Route path="/testimonials" element={<PageWrapper><Testimonials /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="animated-bg" />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 5rem 2rem', position: 'relative', zIndex: 1 }}>
        <Nav />
        <Content />
      </div>
    </BrowserRouter>
  );
}

