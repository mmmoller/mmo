import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   username: "",
   email: "",
   password: "",
   rpassword: ""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    
   if (form.password !== form.rpassword){
    window.alert("Password does not match")
    return
   }
   //else window.alert("Success")
   //window.alert(form.username)

   //return

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("/register_user", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ username: "", email: "", password: "" , rpassword: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New User</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="username">Username</label>
         <input
           type="text"
           className="form-control"
           id="username"
           value={form.username}
           onChange={(e) => updateForm({ username: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="rpassword">Repeat Password</label>
         <input
           type="password"
           className="form-control"
           id="rpassword"
           value={form.rpassword}
           onChange={(e) => updateForm({ rpassword: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create User"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}