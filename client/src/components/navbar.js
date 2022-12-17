import React, { useContext} from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import { UserContext } from "../context/userContext";

import Logout from "./logout";
import Gold from "./gold";
import Reset from "./reset";
 
// Here, we display our Navbar
export default function Navbar() {
  const {user} = useContext(UserContext)
  //console.log(user)

  // if (HasUserContext(userContext)){
  //   console.log("navbar has userContext")
  // } else {
  //   console.log("navbar no userContext")
  // }

 return (
   <div>
    {(user && user.username)
    ? <nav className="navbar navbar-expand-lg navbar-light bg-light ">
         <ul className="navbar-nav ml-auto container" >
            <li className="nav-item" display='inline'>
              <NavLink className="nav-link" to="/">
                Welcome, {user.username}!
              </NavLink>
            </li>
            <li className="nav-item" display='inline'>
              <NavLink className="nav-link" to="/heroes">
                Heroes
              </NavLink>
            </li>
            <li>Inventory</li>
            <li>
              <Gold userId={user._id}>
              </Gold>
            </li>
            <li>
              <Reset>
              </Reset>
            </li>
            <li>
              <Logout>
              </Logout>
            </li>
         </ul>
     </nav>
     : <div></div>
    }
   </div>
 );
}