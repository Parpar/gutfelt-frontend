import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

function LoginPage() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://gutfelt-backend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login fejlede. Tjek email og password.');
      }
      const userData = await response.json();
      login(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="widget" style={{ margin: '2rem', textAlign: 'center' }}>
      <h2>Velkommen til Gutfelt Intranet</h2>
      <p>Log venligst ind for at fortsætte.</p>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label><br/>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width: '300px', padding: '8px'}}/>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width: '300px', padding: '8px'}}/>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</button>
      </form>
      <div style={{marginTop: '2rem', fontSize: '0.9rem', color: '#666'}}>
        <p><strong>Test-logins:</strong><br/>
        HR-redaktør: susanne@gutfelt.com (password: 123)<br/>
        Medarbejder: peter@gutfelt.com (password: 123)</p>
      </div>
    </div>
  );
}

export default LoginPage;