import {createContext,useState} from "react"

const Context = createContext()

export function ContextProvider({children}){
    return (<Context.Provider value={{working:true}}>
        {children}
    </Context.Provider>)
}

export default Context