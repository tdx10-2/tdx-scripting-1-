import React from 'react';

export const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', letterSpacing: '-0.05em' }}>{children}</h2>
);
