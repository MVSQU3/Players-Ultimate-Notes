import axios from "axios"
import { useState } from "react"

export default function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)


    function handleLogin(e) {
        e.preventDefault()

        axios.post("http://localhost:3000/api/login", {
            username: username,
            password: password
        }).then((response) => {
            const receivedToken = response.data.token
            if (receivedToken) {
                localStorage.setItem('jwtToken', receivedToken)
                onLoginSuccess()
            } else {
                setError("Erreur lors de la réception du jeton.");
            }
        }).catch((err) => {
            console.error("Erreur de connexion :", err);
            // Affiche un message d'erreur spécifique basé sur la réponse de l'API
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Ex: "Mot de passe incorrect"
            } else {
                setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
            }
        });
    }

    return (
        <div className="Login">
            <form onSubmit={handleLogin} className="w-75 m-auto">
                <h2 className="w-50 m-auto">Connexion</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input className="input-group-text w-50 m-auto" type="text" placeholder="Nom" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                <input className="input-group-text w-50 m-auto" type="text" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <div className="w-50 m-auto">
                    <button type="submit" className="btn btn-primary">Se connectez</button>
                </div>

            </form>
        </div>
    )
}