import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Nav = () => {
  const location = useLocation();

  const links = [
    { name: 'TDX', path: '/' },
    { name: 'Works', path: '/works' },
    { name: 'Prices', path: '/prices' },
    { name: 'Feedback', path: '/testimonials' }
  ];

  return (
    <nav style={{ padding: '2rem 0', borderBottom: '1px solid #222', marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.name}
            to={link.path}
            style={{
              position: 'relative',
              padding: '0.5rem 1rem',
              color: isActive ? '#fff' : '#888',
              textDecoration: 'none',
              fontWeight: isActive ? 700 : 500,
              borderRadius: '8px',
              transition: 'color 0.2s',
            }}
            className="nav-link"
          >
            <span style={{ position: 'relative', zIndex: 10 }}>{link.name}</span>
            {isActive && (
              <motion.div
                layoutId="nav-outline"
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid #fff',
                  borderRadius: '8px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
