import axios from "axios";
import { useState } from "react";

const Logup = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = (e) => {
    e.preventDefault();

    // Envoi des informations d'inscription à l'API
    axios
      .post(`http://localhost:3000/api/logup`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("Inscription réussie :", response.data);
        onSignupSuccess(); // Notifie App.jsx du succès de l'inscription
      })
      .catch((err) => {
        console.error("Erreur lors de l'inscription :", err);
        setError("Échec de l'inscription. Veuillez réessayer.");
      });
  };

  return (
    <form className="Logup" onSubmit={handleSignup}>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label className="">Nom d'utilisateur:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <br />
      <label>Mot de passe:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />{" "}
      <br />
      <br />
      <button className="" type="submit">
        S'inscrire
      </button>
    </form>
  );
};

export default Logup;
