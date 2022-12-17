import React from "react";

let UserContext = React.createContext({
    user: {},
    setUser: () => {}
})

export { UserContext }