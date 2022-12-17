import React, { useContext, useEffect }/*, { useEffect, useState, useContext }*/ from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";

//import Login from "./login"
//import { Link } from "react-router-dom";

export default function Home() {
    // const [users, setUsers] = useState([]);

    const navigate = useNavigate()

    let userContext = useContext(UserContext)

    useEffect(() =>{
        if (userContext && userContext.data && userContext.data.username){
            console.log("OK")
        } else {
            navigate("/login")
        }
    });
    //let hasUserContext = localStorage.getItem("JWT");
    //console.log(hasUserContext)

    //console.log(hasToken)
    
    // This method fetches the records from the database.
    // useEffect(() => {
    //   async function getUsers() {
    //     const response = await fetch("/get_user/");
    
    //     if (!response.ok) {
    //       const message = `An error occurred: ${response.statusText}`;
    //       window.alert(message);
    //       return;
    //     }
    
    //     const users = await response.json();
    //     setUsers(users);
    //   }
    
    //   //getUsers();
    
    //   return;
    // }, []);//[users.length]);
    
    // This method will delete a record
    // async function deleteUser(id) {
    //   await fetch(`/delete_user/${id}`, {
    //     method: "DELETE"
    //   });
    
    //   const newUsers = users.filter((el) => el._id !== id);
    //   setUsers(newUsers);
    // }
    
    // // This method will map out the records on the table
    // function userList() {
    //   return users.map((user) => {
    //     return (
    //       <User
    //         user={user}
    //         deleteUser={() => deleteUser(user._id)}
    //         key={user._id}
    //       />
    //     );
    //   });
    // }

    
    if (userContext && userContext.data && userContext.data.username){
        return (
            <div>
                Welcome {userContext.data.username} !
            </div>
        );
    } else {
        return (
            <div>
                Não era para estar aqui
            </div>
        );
    }
    // This following section will display the table with the records of individuals.
    // return (
    //   <div>
    //     <h3>User List</h3>
    //     <table className="table table-striped" style={{ marginTop: 20 }}>
    //       <thead>
    //         <tr>
    //           <th>Username</th>
    //           <th>Email</th>
    //           <th>Password</th>
    //           <th>Id</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>{userList()}</tbody>
    //     </table>
    //   </div>
    // );
   }