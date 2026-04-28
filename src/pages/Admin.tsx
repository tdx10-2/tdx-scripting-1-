import React, { useState, useEffect } from 'react';
import { Heading } from '../components/Heading';

export const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const load = async (passcode: string) => {
    setLoading(true);
    const res = await fetch(`/api/testimonials/admin?pass=${encodeURIComponent(passcode)}`);
    const result = await res.json();
    if (res.ok) {
      setReviews(result.data || []);
      setErrorMsg('');
      setAuthed(true);
    } else {
      setAuthed(false);
      localStorage.removeItem('adminPass');
    }
    setLoading(false);
  };

  useEffect(() => {
    const savedPass = localStorage.getItem('adminPass');
    if (savedPass) {
      setPass(savedPass);
      setRemember(true);
      load(savedPass);
    }
  }, []);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pass })
      });
      const data = await res.json();
      if (res.ok) {
        setAuthed(true);
        if (remember) {
          localStorage.setItem('adminPass', pass);
        } else {
          localStorage.removeItem('adminPass');
        }
        await load(pass);
      } else {
        setErrorMsg(data.error || 'Incorrect passcode.');
      }
    } catch {
      setErrorMsg('Error contacting server');
    }
    setLoading(false);
  };

  const action = async (id: number, status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pass, status })
      });
      if (!res.ok) {
        alert('Action failed');
      }
    } catch (e) {
      console.error(e);
    }
    await load(pass);
  };

  const logout = () => {
    setAuthed(false);
    setPass('');
    localStorage.removeItem('adminPass');
  };

  if (!authed) return (
    <div style={{ maxWidth: '400px', margin: '150px auto' }}>
      <form onSubmit={check} className="box" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700 }}>ADMIN LOGIN</h3>
        {errorMsg && <div style={{ color: '#ff6b6b', background: '#ff444422', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>{errorMsg}</div>}
        <input type="password" placeholder="Enter Secret Passcode" value={pass} onChange={e => setPass(e.target.value)} style={{ padding: '1rem', background: '#1a1a1a' }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
          <span style={{ fontSize: '0.9rem', color: '#ccc' }}>Remember me</span>
        </label>
        <button className="primary" style={{ padding: '1rem' }} disabled={loading}>{loading ? 'LOGGING IN...' : 'ENTER DASHBOARD'}</button>
      </form>
    </div>
  );

  const pending = reviews.filter(r => r.status === 'pending');
  const approved = reviews.filter(r => r.status === 'approved');

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>
        <Heading>ADMIN DASHBOARD</Heading>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="secondary" onClick={() => load(pass)} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh Data'}</button>
          <button className="secondary" onClick={logout}>Logout</button>
        </div>
      </header>
      
      {errorMsg && <div style={{ marginBottom: '2rem', color: '#ff6b6b', background: '#ff444422', padding: '15px', borderRadius: '8px' }}>{errorMsg}</div>}

      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#fba918', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#fba918' }}></span>
          PENDING APPROVAL ({pending.length})
        </h3>
        
        {pending.length === 0 && <p style={{ color: '#555', fontStyle: 'italic', padding: '2rem', border: '1px dashed #222', borderRadius: '12px', textAlign: 'center' }}>Hooray! No pending reviews.</p>}
        {pending.map(r => (
          <div key={r.id} className="box" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem' }}>{r.name}</strong> 
                <span style={{ color: '#555', fontSize: '0.85rem' }}>{r.email}</span>
              </div>
              <p style={{ color: '#eee', background: '#1a1a1a', padding: '1rem', borderRadius: '6px', fontStyle: 'italic' }}>"{r.content}"</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: 'max-content' }}>
              <button className="primary" style={{ background: '#4ade80', color: '#000' }} onClick={() => action(r.id, 'approved')}>✔️ APPROVE</button>
              <button className="secondary" style={{ color: '#ff6b6b', border: '1px solid #331111' }} onClick={() => action(r.id, 'delete')}>❌ DISCARD</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 style={{ marginBottom: '1.5rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }}></span>
          APPROVED REVIEWS ({approved.length})
        </h3>
        {approved.length === 0 && <p style={{ color: '#555', fontStyle: 'italic', padding: '2rem', border: '1px dashed #222', borderRadius: '12px', textAlign: 'center' }}>No reviews approved yet.</p>}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {approved.map(r => (
            <div key={r.id} className="box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8, background: '#0a0a0a' }}>
              <div>
                <strong>{r.name}</strong> <span style={{ color: '#444' }}>({r.email})</span>
                <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>{r.content}</p>
              </div>
              <button className="secondary" style={{ color: '#ff6b6b', fontSize: '0.8rem', padding: '0.5rem' }} onClick={() => action(r.id, 'delete')}>DELETE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
