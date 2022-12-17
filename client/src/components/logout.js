import React, { useContext} from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";

export default function Logout(){


    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();

    async function logout(){

        let response = await fetch("/logout_user", {
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
            onClick={logout}
            className="btn btn-primary">
            - Logout -
        </button>
    )
}