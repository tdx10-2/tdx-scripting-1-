import React from 'react';
import { Heading } from '../components/Heading';

export const Prices = () => (
  <div style={{ maxWidth: '900px', margin: '0 auto' }}>
    <Heading>PAYMENT & TERMS</Heading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
      <div className="box">
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>ACCEPTED</h3>
        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>$15+ / R$3950+</div>
        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>ROBUX | PAYPAL</p>
        <p style={{ marginTop: '10px', fontSize: '0.7rem', color: '#444' }}>I work both long term & short term. Long term preferred per-task.</p>
      </div>
      <div className="box" style={{ borderColor: '#200' }}>
        <h3 style={{ color: '#f55', marginBottom: '1rem' }}>UNACCEPTED</h3>
        <p style={{ textDecoration: 'line-through', color: '#444' }}>PERCENTAGE</p>
        <p style={{ textDecoration: 'line-through', color: '#444' }}>NITRO</p>
      </div>
    </div>

    <div className="box">
      <h3 style={{ marginBottom: '1.5rem' }}>TERMS OF SERVICE</h3>
      <ol style={{ paddingLeft: '20px', display: 'grid', gap: '10px', color: '#888', fontSize: '0.9rem' }}>
        <li>You'll most likely be ignored if you DM me with no details.</li>
        <li>Refunds are not accepted if the commission has been finished in high quality.</li>
        <li>I'm responsible for any bug I caused and I'll make sure to fix it with no extra pay.</li>
        <li>I will take extra pay for any bugs that I didn't cause.</li>
        <li>I will not work on NSFW or any kind of inappropriate content.</li>
        <li>I will not work on gambling or music.</li>
      </ol>
    </div>
  </div>
);
