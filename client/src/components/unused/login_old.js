import React, { useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
 
export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext)

  //let userContext = useContext(UserContext)

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.

  async function onSubmitLogin(e) {
    e.preventDefault();
    
    //else window.alert("Success")
    //window.alert(form.username)

    //return

    // When a post request is sent to the create url, we'll add a new record to the database.
    const loginForm = { ...form };

    let response = await fetch("/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
    .catch(error => {
      window.alert(error);
      return;
    });


    let data = await response.json()

    console.log(response.status)
    console.log(data)

  if (response.status === 200){
    
    localStorage.setItem('JWT', data.token);
    setUser(data.user)
    console.log(user)
    console.log(data.message)
  }

    setForm({ username: "", password: "" });
    //navigate("/");
  }

  async function onSubmitToken(e){
  e.preventDefault();
  try {
    let response = await fetch("/login_token_user",{
      method: "POST",
      headers:{
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).catch(error => {
      window.alert(error);
      return;
    });

    console.log(response)

    

    let data = await response.json()

    if (response.status === 200){
      setUser(data.user)
      
    } else {
      

      console.log("removing token")
      localStorage.removeItem("JWT")
      setToken(undefined)
    }
    navigate("/");


  } catch (err){
    console.log("removing token")
    localStorage.removeItem("JWT")
    setToken(undefined)
  }
  }


  const [token, setToken] = useState(localStorage.getItem("JWT")) //
  //let token = localStorage.getItem("JWT")

  useEffect(() =>{

    async function fetchTokenLogin(){

      //console.log("sleeping 1 sec")
      //await new Promise(r => setTimeout(r, 1000))

      console.log(token)
      if (token){
        try {
        let response = await fetch("/login_token_user",{
          method: "POST",
          headers:{
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          }
        }).catch(error => {
          window.alert(error);
          return;
        });

        console.log(response)

        let data = await response.json()

        if (response.status === 200){
          localStorage.setItem('JWT', data.token);
          setUser(data.user)
          
        } else {
          

          console.log("removing token")
          localStorage.removeItem("JWT")
          setToken(undefined)
        }


      } catch (err){
        console.log("removing token")
        localStorage.removeItem("JWT")
        setToken(undefined)
      }

      }
    }

    fetchTokenLogin();
  },[token])

  // This following section will display the form that takes the input from the user.
  //  if (token){
  //   return (
  //     <div>
  //      <h3>Token Login</h3>
  //      <form onSubmit={onSubmitToken}>
  //        <div className="form-group">
  //          <input
  //            type="submit"
  //            value="Login User from Token"
  //            className="btn btn-primary"
  //          />
  //        </div>
  //      </form>
  //    </div>
  //   )
  //  } 
  return (
  <div>
    <h3>Login User {user?.username}</h3>
    <form onSubmit={onSubmitLogin} >
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
        <input
          type="submit"
          value="Login User"
          className="btn btn-primary"
        />
      </div>
      <a href="javascript:Change()">Teste</a>
    </form>
  </div>
);
}