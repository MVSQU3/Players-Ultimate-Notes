import { useState } from "react"
import DeletePlayer from "./DeletePlayer"

export default function PlayerCard({ player, onDelete }) {
    const [showAttributs, setShowAttributs] = useState(false)
    const handleShowAttributs = () => {
        setShowAttributs(!showAttributs)
    }
    return (
        <div className="PlayerCard border p-2 col-md-4 col-lg-3 col-xxl-2">
            <ul className="list-inline m-0">
                <li>note: {player.note} </li>
                <li>name: {player.name} </li>
                <li>pays: {player.pays} </li>
                <li>club: {player.club} </li>
                <li>post: {player.post} </li>
                <li>age: {player.age} </li>
                <div className="d-flex justify-content-start">
                    <DeletePlayer playerId={player.id} onDeleteSuccess={onDelete} />
                    <button className="btn btn-primary ms-2" onClick={handleShowAttributs}>Voir</button>
                </div>

                {showAttributs && (
                    <>
                        <ul>
                            <h5>Attributs Physiques</h5>
                            <li>Agilité : {player.attributs_Physiques.agilite}</li>
                            <li>Endurance : {player.attributs_Physiques.endurance}</li>
                            <li>Force : {player.attributs_Physiques.force}</li>
                            <li>Vitesse : {player.attributs_Physiques.vitesse}</li>
                        </ul>
                        <ul>
                            <h5>Attributs Techniques</h5>
                            <li>Contrôle de balle : {player.attributs_Techniques.controle_de_balle}</li>
                            <li>Dribble : {player.attributs_Techniques.dribble}</li>
                            <li>Passes : {player.attributs_Techniques.passes}</li>
                            <li>Tir : {player.attributs_Techniques.tir}</li>
                        </ul>
                    </>
                )}
            </ul>
        </div>
    )
}