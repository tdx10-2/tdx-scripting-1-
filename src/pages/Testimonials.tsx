import React, { useState, useEffect } from 'react';
import { Heading } from '../components/Heading';

export const Testimonials = () => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', email: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const result = await res.json();
      if (result.data) setData(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchComments(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (!res.ok) {
        setStatusMsg(`Error: ${data.error || 'Failed to submit'}`);
      } else {
        setForm({ name: '', email: '', content: '' });
        setStatusMsg(data.message || 'Sent for approval! Thank you.');
        setTimeout(() => setStatusMsg(''), 5000);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatusMsg('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Heading>COMMUNITY FEEDBACK</Heading>
      </header>
      
      <div className="responsive-grid" style={{ display: 'grid', gap: '40px' }}>
        <div style={{ order: 2 }}>
          {data.map(c => (
            <div key={c.id} className="box" style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '15px', background: '#050505', color: '#555', padding: '0 10px', fontSize: '2rem', lineHeight: 1 }}>"</div>
              <p style={{ color: '#eee', fontSize: '1.1rem', marginTop: '1rem', fontStyle: 'italic', lineHeight: '1.8' }}>{c.content}</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>{c.name}</strong>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Client</span>
                </div>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div style={{ textAlign: 'center', color: '#555', padding: '3rem', border: '1px dashed #222', borderRadius: '12px' }}>
              No testimonials have been approved yet.
            </div>
          )}
        </div>
        <div style={{ order: 1 }}>
          <div className="box" style={{ position: 'sticky', top: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #222', paddingBottom: '0.8rem' }}>LEAVE A REVIEW</h3>
            <form onSubmit={submit} style={{ display: 'grid', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', fontWeight: 600 }}>DISPLAY NAME</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ background: '#1a1a1a' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', fontWeight: 600 }}>EMAIL (PRIVATE)</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ background: '#1a1a1a' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', fontWeight: 600 }}>YOUR MESSAGE</label>
                <textarea required rows={5} value={form.content} onChange={e => setForm({...form, content: e.target.value})} style={{ background: '#1a1a1a', resize: 'vertical' }} />
              </div>
              <button className="primary" disabled={loading} style={{ marginTop: '0.5rem', padding: '1rem', background: loading ? '#555' : '#fff' }}>
                {loading ? 'SENDING...' : 'SUBMIT REVIEW'}
              </button>
              {statusMsg && (
                <div style={{ marginTop: '0.5rem', padding: '1rem', borderRadius: '8px', background: statusMsg.includes('Error') ? '#ff444422' : '#44ff4422', color: statusMsg.includes('Error') ? '#ff6b6b' : '#4ade80', fontSize: '0.9rem', textAlign: 'center' }}>
                  {statusMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
