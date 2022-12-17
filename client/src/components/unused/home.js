import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const User = (props) => (
    <tr>
      <td>{props.user.username}</td>
      <td>{props.user.local.email}</td>
      <td>{props.user.local.password}</td>
      <td>{props.user._id}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.user._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteUser(props.user._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
   );

export default function Home() {
 const [users, setUsers] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getUsers() {
     const response = await fetch("/get_user/");
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const users = await response.json();
     setUsers(users);
   }
 
   getUsers();
 
   return;
 }, []);//[users.length]);
 
 // This method will delete a record
 async function deleteUser(id) {
   await fetch(`/delete_user/${id}`, {
     method: "DELETE"
   });
 
   const newUsers = users.filter((el) => el._id !== id);
   setUsers(newUsers);
 }
 
 // This method will map out the records on the table
 function userList() {
   return users.map((user) => {
     return (
       <User
         user={user}
         deleteUser={() => deleteUser(user._id)}
         key={user._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>User List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Username</th>
           <th>Email</th>
           <th>Password</th>
           <th>Id</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{userList()}</tbody>
     </table>
   </div>
 );
}