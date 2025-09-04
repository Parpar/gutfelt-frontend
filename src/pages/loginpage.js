import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

function LoginPage() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    // Forhindrer siden i at genindlæse, når man trykker "Login"
    event.preventDefault(); 
    // Nulstil eventuelle gamle fejlmeddelelser
    setError('');

    try {
      // Send login-oplysningerne til din live back-end server på Render
      const response = await fetch('https://gutfelt-backend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Lav email og password om til en JSON-streng
      });

      // Hvis serveren svarer med en fejl (f.eks. "401 Unauthorized")...
      if (!response.ok) {
        // Prøv at læse fejlbeskeden fra serveren
        const errorData = await response.json();
        // Smid en fejl, der bruger serverens besked, hvis den findes
        throw new Error(errorData.message || 'Login fejlede. Tjek email og password.');
      }
      
      // Hvis alt gik godt, læs brugerdataen fra serverens svar
      const userData = await response.json();
      // Kald den globale login-funktion for at gemme brugeren i app'ens "hukommelse"
      login(userData);

    } catch (err) {
      // Hvis der skete en fejl undervejs, vis den til brugeren
      setError(err.message);
      // Log også fejlen i konsollen, så vi kan se den under udvikling
      console.error("Login error:", err);
    }
  };

  return (
    <div className="widget" style={{ margin: '2rem', textAlign: 'center' }}>
      <h2>Velkommen til Gutfelt Intranet</h2>
      <p>Log venligst ind for at fortsætte.</p>
      
      {/* Formularen kalder handleSubmit-funktionen, når den bliver "submitted" */}
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'inline-block', textAlign: 'left' }}>
        
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label><br/>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{width: '300px', padding: '8px'}}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label><br/>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{width: '300px', padding: '8px'}}
          />
        </div>

        {/* Viser kun fejlbeskeden, hvis der ER en fejl */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Knappen har type="submit", hvilket får den til at udløse formens onSubmit-event */}
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;