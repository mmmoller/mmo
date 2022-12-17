import React, {useState} from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Index from "./components/index";
//import Edit from "./components/edit";
import Heroes from "./components/heroes";
import { UserContext } from "./context/userContext";
import { GoldContext } from "./context/goldContext";
require("./style.css")

const App = () => {

  const [user, setUser] = useState({})
  const user_value = {user, setUser}

  const [gold, setGold] = useState(0)
  const gold_value = {gold, setGold}
  // console.log(user)
  // console.log(user && true)
 return (
  <UserContext.Provider value = {user_value}>
    <GoldContext.Provider value = {gold_value}>
      <Navbar />
    
      <Routes>
        <Route exact path="/" element={<Index />} />
        {user?.username && <Route path="/heroes" element={<Heroes />} />}
        {(!user || !user.username) && <Route path="/heroes" element={<Index />} />}
        
      </Routes>
      </GoldContext.Provider>
  </UserContext.Provider>
 );
};
 
export default App;