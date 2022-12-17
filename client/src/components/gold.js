import React, { useContext, useEffect} from "react";
import { GoldContext } from "../context/goldContext";
 
export default function Gold(props) {

    console.log("At Gold")

    //console.log(props)

    const {gold, setGold} = useContext(GoldContext) //useState(0)//
    
    //const [gold, setGold] = useState(0)//

    //console.log(gold)

    useEffect(() =>{
        async function fetchGold(){
            
            try {
                let response = await fetch("/get_gold")
                let data = await response.json()

                if (response.status === 200){
                    //console.log(data.gold)
                    setGold(data.gold)
                    //console.log(gold)
                    
                } else {
                    console.log(data.message)
                }

                
            } catch (err){
                console.log(err)
            }

        }
        fetchGold();

        //console.log(gold)
    },[setGold])

    async function addGold(amount) {

        try {

            let form = {
                userId: props.userId,
                gold: amount,
            }

            let response = await fetch("/add_gold", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            //console.log(response)

            let data = await response.json()

            if (response.status === 200){
                console.log(data.gold)
                setGold(data.gold)
                
            } else {
                console.log(data.message)
                console.log(data)
            }


        } catch (err){
            console.log(err)
        }
    }

    return (<div>
            
            <button 
                onClick={() => addGold(10000)}
                className="btn btn-primary">
                +
            </button>
            <button 
                onClick={() => addGold(-10000)}
                className="btn btn-primary">
                -
            </button>
            <span> Gold: {gold}</span>
        </div>
    )
}