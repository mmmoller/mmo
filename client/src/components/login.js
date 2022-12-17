import React, { useState, useContext, useEffect} from "react";
import { UserContext } from "../context/userContext";
 
export default function Login() {

    console.log("At Login")
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        rpassword: ""
    });

    const {user, setUser} = useContext(UserContext)

    const [signUp, setSignUp] = useState(false)

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function ChangeSignUp(){
        setSignUp(!signUp)
    }

    async function onSubmitLogin(e) {
        e.preventDefault();
        
        const loginForm = {
            username: form.username,
            password: form.password
        };
    
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
    }

    async function onSubmitRegister(e) {
        e.preventDefault();
         
        if (form.password !== form.rpassword){
            window.alert("Password does not match")
            return
        }

        const newPerson = { ...form };
      
        let response = await fetch("/register_user", {
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

        let data = await response.json()
    
        console.log(response.status)
        console.log(data)
    
        if (response.status === 200){
            
            localStorage.setItem('JWT', data.token);
            setUser(data.user)
            console.log(user)
            console.log(data.message)
        }


      
        setForm({ username: "", email: "", password: "" , rpassword: ""});
      }

    const [token, setToken] = useState(localStorage.getItem("JWT")) 

    useEffect(() =>{
        //return 
        async function fetchTokenLogin(){
            //console.log(token)
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

                    //console.log(response)

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
    },[token, setUser])


    function Text(str){
        return str ? "Sign Up" : "Login"
    }

    if (token) {
        return (
        <div className="before-pop-up">
            
            <div className="default-wrapper pop-up">
                <span className="pop-up-span">Loading ...</span>
                
            </div>
        </div>
        )
    }
        // <div className="container">
        //             <div className="row">
        //                 <div className="col">
        //                     <Login></Login>
        //                 </div>
                        
        //             </div>
        //         </div>

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {!signUp
                    ?<div>
                        <h3>Login User</h3>
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
                                style={{ marginTop:"10px", marginBottom:"10px"}}
                                />
                            </div>
                        </form>
                    </div>
                    : <div>
                        <h3>Create New User</h3>
                        <form onSubmit={onSubmitRegister}>
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
                                style={{ marginTop:"10px", marginBottom:"10px"}}
                                className="btn btn-primary"
                                />
                            </div>
                        </form>
                    </div>
                    }
                
                <span style={{color:"blue", textDecoration:"underline"}} onClick={ChangeSignUp}>{"Go " + Text(!signUp)}</span>
                </div>
                <div className="col" >
                    <div style={{marginTop: '70px'}}>Google Login</div>
                            
                </div>
            </div>
        </div>
      );
        

}