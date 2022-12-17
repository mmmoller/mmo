import React, { useContext} from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";

export default function Reset(){


    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();

    async function reset(){

        console.log("posting to reset")
        let response = await fetch("/reset_db", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        let data = await response.json()
    
        console.log(response.status)
        console.log(data)
    
        if (response.status === 200){
            
            localStorage.removeItem("JWT")
            console.log("Token removed")

            console.log("Logging out ", user?.username)
            setUser({})
            navigate("/");
        } else {
            window.alert("Logout failed!")
        }



        
    }

    return (
        <button 
            onClick={reset}
            className="btn btn-primary">
            - Reset -
        </button>
    )
}