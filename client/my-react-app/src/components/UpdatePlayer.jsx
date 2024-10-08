import axios from "axios";
import { useState } from "react";

export default function UpdatePlayer({ player, onEditSuccess }) {
    const [reqBody, setreqBody] = useState({
        name: "" || player.name,
        pays: "" || player.pays,
        club: "" || player.club,
        post: "" || player.post,
        age: "" || player.age,
        attributs_Physiques: {
            agilite: "" || player.attributs_Physiques.agilite,
            endurance: "" || player.attributs_Physiques.endurance,
            force: "" || player.attributs_Physiques.force,
            vitesse: "" || player.attributs_Physiques.vitesse
        },
        attributs_Techniques: {
            controle_de_balle: "" || player.attributs_Techniques.controle_de_balle,
            dribble: "" || player.attributs_Techniques.dribble,
            passes: "" || player.attributs_Techniques.passes,
            tir: "" || player.attributs_Techniques.tir
        }
    })

    const handleUpdatePlayer = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken')
        await axios.put(`http://localhost:3000/api/players/${player.id}`,
            reqBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
            console.log(response.data.data)
        }).catch((err) => {
            console.log("Une erreur s'est produite lors de la modification", err)
        })
    }

    return (
        <div className="UpdatePlayer">
            <form onSubmit={handleUpdatePlayer} className="form-control w-75 bg-dark">
                <label>Pays:{" "}
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="Pays"
                        value={reqBody.pays}
                        onChange={(e) => setreqBody({ ...reqBody, pays: e.target.value })}
                    />
                </label><br />
                <label>Club:{" "}
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="Club"
                        value={reqBody.club}
                        onChange={(e) => setreqBody({ ...reqBody, club: e.target.value })}
                    />
                </label><br />
                <label>Post:{" "}
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="Post"
                        value={reqBody.post}
                        onChange={(e) => setreqBody({ ...reqBody, post: e.target.value })}
                    />
                </label><br />
                <label>Âge:{" "}
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="Âge"
                        value={reqBody.age}
                        onChange={(e) => setreqBody({ ...reqBody, age: e.target.value })}
                    />
                </label><br />
                <label className="">attributs Physiques:{" "}
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="agilite"
                        value={reqBody.attributs_Physiques.agilite}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, agilite: parseInt(e.target.value) } })}
                    />
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="endurance"
                        value={reqBody.attributs_Physiques.endurance}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, endurance: parseInt(e.target.value) } })}
                    />
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="force"
                        value={reqBody.attributs_Physiques.force}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, force: parseInt(e.target.value) } })}
                    />
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="vitesse"
                        value={reqBody.attributs_Physiques.vitesse}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, vitesse: parseInt(e.target.value) } })}
                    />
                </label><br />
                <label>attributs Techniques:{" "}
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="controle_de_balle"
                        value={reqBody.attributs_Techniques.controle_de_balle}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, controle_de_balle: parseInt(e.target.value) } })}
                    />
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="dribble"
                        value={reqBody.attributs_Techniques.dribble}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, dribble: parseInt(e.target.value) } })}
                    />
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="passes"
                        value={reqBody.attributs_Techniques.passes}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, passes: parseInt(e.target.value) } })}
                    />
                    <input
                        type="text"
                        className="input-group-text w-100"
                        placeholder="tir"
                        value={reqBody.attributs_Techniques.tir}
                        onChange={(e) => setreqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, tir: parseInt(e.target.value) } })}
                    />
                </label><br /><br />
                <button className="btn btn-success ps-5 pe-5" type="submit" onClick={handleUpdatePlayer}>Envoyez</button>
            </form>

        </div>
    )
}