import axios from "axios";

export default function DeletePlayer({ playerId, onDeleteSuccess }) {
    const handleDeletePlayer = async () => {
        const token = localStorage.getItem("jwtToken");
        try {
            await axios.delete(`http://localhost:3000/api/players/${playerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            alert("Joueur supprimé avec succès !");
            // Appeler la fonction de callback pour mettre à jour la liste des joueurs
            onDeleteSuccess(playerId);
        } catch (error) {
            alert("Erreur lors de la suppression du joueur.");
        }
    };

    return (
        <button className="btn btn-danger" onClick={handleDeletePlayer}>
            Supprimer
        </button>
    );
};