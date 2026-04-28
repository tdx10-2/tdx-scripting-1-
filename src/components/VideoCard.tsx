import React from 'react';

export const VideoCard = ({ id }: { id: string }) => (
  <div className="box" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div style={{ borderRadius: '4px', overflow: 'hidden', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Showcase"
      ></iframe>
    </div>
  </div>
);
