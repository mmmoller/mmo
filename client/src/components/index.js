import React, { useContext, useEffect} from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
import Login from "./login"
//import Register from "./register"

export default function Index(props){

    console.log("At Index")
    
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    // console.log("Here")
    // console.log(props)
    // console.log(props.heroes)

    useEffect(() =>{
        if (user && user.username && props.heroes){
            console.log("AQUI!")
            navigate("/heroes")
        }
        //return 
    },)

    //console.log(user)

    return (
        
        //<UserContext.Provider value = {value}>
        <div align='center'>
            {user && user.username 
            ? "Profile: " + user.username
                
            :   <Login></Login>
            }
        </div>
        //</UserContext.Provider>
        

        // <div className="container">
        //     <div className="row">
        //         <div className="col">
        //             <Login></Login>
        //         </div>
        //         <div className="col">
        //             <Register></Register>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col">
        //             Google
        //         </div>
        //     </div>
        // </div>
    )
    
}