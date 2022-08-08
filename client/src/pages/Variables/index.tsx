
// TYPES
import React, { FunctionComponent, useEffect, useState } from "react"

// QUERIES & MUTATIONS
import { GET_VARIABLES } from "../../utils/queries"
import { useMutation, useQuery } from "@apollo/client"
import AddableList from "../../components/generics/addableList/index.tsx"
import { ADD_SETTING } from "../../utils/mutations"

type QueryObject = {
    data:any,
    loading:boolean,
    error?:Error|undefined
}

type EnvironmentalVariable = {
    id:string,
    name:string,
    __typename:string
}

type Variables = {
    userId:string
}


const VariablesPage:FunctionComponent = ({userId}):JSX.Element=>{

    const variables:Variables = {userId: "62ea8b67b1a2a28cb4d760e3"}
    const {data,loading,error}:QueryObject = useQuery(GET_VARIABLES,{variables})
    const [addSetting,{data:addData,loading:addLoading,error:addError}] = useMutation(ADD_SETTING)
    const [environmentalVariables,setEnvironmentalVariables]:[EnvironmentalVariable[],any] = useState([])

    useEffect(()=>{
        setEnvironmentalVariables(data?.getAllSettings||[])
    },[loading])

    const handleAddVariableToList = async (e:React.FormEvent)=>{
        console.log(e)
        const settingName = e.target[0].value
        const variables = {userId,settingName}

        const resp = await addSetting({variables})
        console.log(resp)
    }


    if(loading){
        return(<div>
            "loading"
        </div>
        )
    }

    return(
        <div>
            <AddableList
            handleAddToList={handleAddVariableToList}
            items={environmentalVariables.map(v=>v.name)}
            buttons={[{name:"delete"}]}
            />
        </div>
    )
}

export default VariablesPage