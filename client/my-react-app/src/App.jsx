import React, { useState, useEffect } from "react";
import PlayersList from "./components/PlayersList";
import Login from "./components/Login";
import Logup from "./components/Logup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignupSuccess = () => {
    // Après une inscription réussie, on peut rediriger vers le login ou le rendre connecté directement
    setShowSignup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  const handleOnupdate = () => {
    setIsAuthenticated(false);
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <PlayersList onLogout={handleLogout} />
      ) : showSignup ? (
        <Logup onSignupSuccess={handleSignupSuccess} />
      ) : (
        <div className="">
          <Login onLoginSuccess={handleLoginSuccess} />
          <p className="w-50 m-auto">
            Pas encore inscrit ?{" "}
            <button className="btn btn-primary my-1 ps-1 pe-1" onClick={() => setShowSignup(true)}>Créer un compte</button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
