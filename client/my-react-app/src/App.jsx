import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "jwtToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNjc4MTQwMywiZXhwIjoxNzI2Nzg1MDAzfQ.Bn4I-KIj_eSGWMo3ry6vKo7QKNV5B45aRtOpwJ7BNwQ"
    );
    const token = localStorage.getItem("jwtToken");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/players", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlayers(response.data.data);
      } catch (err) {
        setError("Erreur lors de la récupération des joueurs");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des Joueurs</h1>
      <ul>
        {players.length > 0 ? (
          players.map((player) => <li key={player.id}> {player.name} </li>)
        ) : (
          <p>aucun joueurs trouver</p>
        )}
      </ul>
    </div>
  );
};

export default PlayersList;
