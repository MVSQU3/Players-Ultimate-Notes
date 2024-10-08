import { useEffect, useState } from "react";
import axios from "axios";
import PlayersCard from "./PlayersCard";
import SearchBarre from "./SearchBarre";
import AddPlayer from "./AddPlayer";
import UpdatePlayer from "./UpdatePlayer";

export default function PlayersList({ onLogout }) {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatePlayerShow, setupdatePlayerShow] = useState(false)


  useEffect(() => {
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

  const handleUpdatePlayerShow = () => {
    setupdatePlayerShow(!updatePlayerShow)
  }
  const handleDeleteSuccess = (deletedPlayerId) => {
    setPlayers(players.filter((player) => player.id !== deletedPlayerId));
  };

  const handleSearchSuccess = (playerSearchName) => {
    setPlayers(playerSearchName)
  }



  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="PlayersList container">
      <h1 className="h1">Liste des Joueurs</h1>
      <button className="btn btn-outline-danger p-1 p-md-2" onClick={onLogout}>
        Se déconnecter
      </button>
      <button className="btn btn-outline-secondary p-1 p-md-2" onClick={handleUpdatePlayerShow}>Modifier Joureur</button>
      <SearchBarre onSearchSuccess={handleSearchSuccess} />
      <div className="row">
        {players.map((player) => (
          <PlayersCard
            key={player.id}
            player={player}
            onDelete={handleDeleteSuccess}
          />
        ))}
      </div>
      <br />
      <div className="AddPlayer && UpdatePlayer">
        {updatePlayerShow ? players.map(player => <UpdatePlayer key={player.id} player={player} />) : <AddPlayer />}
      </div>
    </div>
  );
};