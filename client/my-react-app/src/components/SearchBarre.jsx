import axios from "axios";
import { useState } from "react";

export default function SearchBarre({ onSearchSuccess }) {
    const [playerName, setPlayerName] = useState("")

    const handleSearchPlayer = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwtToken')
        axios.get(`http://localhost:3000/api/players/`, {
            params: { name: playerName },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response);
            onSearchSuccess(response.data.data)
        })
            .catch((err) => console.log(err, "une erreur est survenu verifier le nom"))
    }

    return (
        <div className="SearchBarre py-2">
            <form onSubmit={handleSearchPlayer}>
                <input
                    className="rounded border-primary p-1 p-md-2 me-2 me-md-0"
                    type="text"
                    placeholder="Search"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button className="btn btn-primary p-1 p-md-2 ms-md-2" type="submit">Search</button>
            </form>
        </div>
    )
}