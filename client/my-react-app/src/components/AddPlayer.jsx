import axios from "axios";
import { useState } from "react";

export default function AddPlayer({ }) {
    const [reqBody, setReqBody] = useState({
        name: "",
        pays: "",
        club: "",
        post: "",
        age: "",
        attributs_Physiques: {
            agilite: "",
            endurance: "",
            force: "",
            vitesse: ""
        },
        attributs_Techniques: {
            controle_de_balle: "",
            dribble: "",
            passes: "",
            tir: ""
        }
    });

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');

        await axios.post(`http://localhost:3000/api/players/`,
            reqBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(response => {
            console.log("Le Joueur a été ajouter", response.data.data);
        })
            .catch((err) => {
                console.log("Une erreur s'est produite", err.response);
            });
    };

    return (
        <div className="AddPlayer">
            <form onSubmit={handleAddPlayer} className="form-control bg-dark">
                <label>Name:{" "}
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="Name"
                        value={reqBody.name}
                        onChange={(e) => setReqBody({ ...reqBody, name: e.target.value })}
                    />
                </label><br />
                <label>Pays:{" "}
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="Pays"
                        value={reqBody.pays}
                        onChange={(e) => setReqBody({ ...reqBody, pays: e.target.value })}
                    />
                </label><br />
                <label>Club:{" "}
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="Club"
                        value={reqBody.club}
                        onChange={(e) => setReqBody({ ...reqBody, club: e.target.value })}
                    />
                </label><br />
                <label>Post:{" "}
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="Post"
                        value={reqBody.post}
                        onChange={(e) => setReqBody({ ...reqBody, post: e.target.value })}
                    />
                </label><br />
                <label>Âge:{" "}
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="Âge"
                        value={reqBody.age}
                        onChange={(e) => setReqBody({ ...reqBody, age: e.target.value })}
                    />
                </label><br />
                <label className="">attributs Physiques:{" "}
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="agilite"
                        value={reqBody.attributs_Physiques.agilite}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, agilite: parseInt(e.target.value) } })}
                    />
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="endurance"
                        value={reqBody.attributs_Physiques.endurance}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, endurance: parseInt(e.target.value) } })}
                    />
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="force"
                        value={reqBody.attributs_Physiques.force}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, force: parseInt(e.target.value) } })}
                    />
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="vitesse"
                        value={reqBody.attributs_Physiques.vitesse}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Physiques: { ...reqBody.attributs_Physiques, vitesse: parseInt(e.target.value) } })}
                    />
                </label><br />
                <label className="">attributs Techniques:{" "}
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="controle_de_balle"
                        value={reqBody.attributs_Techniques.controle_de_balle}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, controle_de_balle: parseInt(e.target.value) } })}
                    />
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="dribble"
                        value={reqBody.attributs_Techniques.dribble}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, dribble: parseInt(e.target.value) } })}
                    />
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="passes"
                        value={reqBody.attributs_Techniques.passes}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, passes: parseInt(e.target.value) } })}
                    />
                    <input
                    className="input-group-text border-primary"
                        type="text"
                        placeholder="tir"
                        value={reqBody.attributs_Techniques.tir}
                        onChange={(e) => setReqBody({ ...reqBody, attributs_Techniques: { ...reqBody.attributs_Techniques, tir: parseInt(e.target.value) } })}
                    />
                </label><br /><br />
                <button className="btn btn-success ps-5 pe-5" type="submit">Envoyez</button>
            </form>
            {console.log(reqBody)}
        </div>
    );
}
