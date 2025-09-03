import React, { createContext, useState } from 'react';

// Opretter en "Context" - en global databeholder til bruger-information
export const UserContext = createContext(null);

// Dette er en "Provider"-komponent. Den vil "pakke" hele vores app ind
// og gøre bruger-informationen tilgængelig for alle under-komponenter.
export const UserProvider = ({ children }) => {
  
  // "useState" er Reacts måde at huske information på.
  // Her husker vi, hvem den "nuværende bruger" er.
  // "null" betyder, at ingen er logget ind fra start.
  const [currentUser, setCurrentUser] = useState(null);

  // En funktion til at logge en bruger ind.
  // Den modtager et bruger-objekt og opdaterer vores "hukommelse".
  const login = (user) => {
    setCurrentUser(user);
  };

  // En funktion til at logge brugeren ud.
  // Den sætter den nuværende bruger tilbage til "null".
  const logout = () => {
    setCurrentUser(null);
  };

  // Vi samler den information (currentUser) og de funktioner (login, logout),
  // som vi vil gøre tilgængelige for resten af app'en.
  const value = { currentUser, login, logout };

  // UserContext.Provider er den magiske del, der sender "value" ned til alle børn.
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};