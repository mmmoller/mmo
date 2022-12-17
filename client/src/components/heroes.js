import React, { useContext, useState, useEffect} from "react";
//import { UserContext } from "../context/userContext";
import { GoldContext } from "../context/goldContext";

const HeroIcon = (props) => {
    //console.log(props.hero.stats)
    //{Object.keys(props.hero.stats).forEach(function(obj, i){ console.log(obj + " " + i) })}

    function StatsList(){
        return Object.keys(props.hero.stats).map(function(key){
            return (<div className="col" key={props.hero._id + key}>{key + ": " + props.hero.stats[key]}</div>)
            })
    }

    return (
        <div className="hero-wrapper">
            <div className="row">
                <div className="col">
                    Name: {props.hero.name}
                </div>
                <div className="col">
                    Id: {props.hero._id}
                </div>
                
                
            </div>
            <div className="row">
                {StatsList()}
            </div>
        </div>
    
    )
}

export default function Heroes(){
    
    console.log("At Heroes")
    //const {user, setUser} = useContext(UserContext)
    const {gold, setGold} = useContext(GoldContext) //useState(0)//

    if (false){
        console.log(gold)
    }


    const [heroes, setHeroes] = useState([])
    //console.log(heroes)
    const [heroName, setHeroName] = useState("");

    // function logout(){
    //     return 
    //     localStorage.removeItem("JWT")
    //     console.log("Token removed")

    //     console.log("Logging out ", user?.username)
    //     setUser({})
    // }

    useEffect(() =>{

        //console.log(" here?")
        async function getHeroes() {

            let response = await fetch("/get_heroes/");
            let data = await response.json()

            if (response.status === 200){
                console.log(data)
                setHeroes(data)
            }
    
            //console.log(data)
        
            //const users = await response.json();
            //setUsers(users);
        }

        getHeroes()

    },[])

    

    async function createHero(e){
        e.preventDefault();
      
        let response = await fetch("/create_hero", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({name: heroName}),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        let data = await response.json()   
        console.log(data)

        if (response.status === 200){
            
            setGold(data.gold)
            setHeroes([...heroes, data.hero]) // I should just push the hero here
        }


        setHeroName("")
    }

    function heroList() {
        return heroes.map((hero) => {
            return (
                <HeroIcon
                hero={hero}
                key={hero._id}/>//</HeroIcon>
            );
        });
      }

    return (
        <div className="container">
            <div className="row hero-wrapper">
                <h3>Create Hero</h3>
                <form onSubmit={createHero} >
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Hero Name"
                        value={heroName}
                        onChange={(e) => setHeroName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="submit"
                        value="Create Hero"
                        className="btn btn-primary"
                        style={{ marginTop:"10px", marginBottom:"10px"}}
                        />
                    </div>
                </form>
            </div>

            <div >
                {heroList()}
            </div>
        </div>
    )
}