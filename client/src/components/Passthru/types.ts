import { MutationResult } from "@apollo/client/react"
import { Habit,QueueItem } from "client/src/context/types"


// we are going to put these things in the context folder
export type ReviewItems = {
    habits:Habit[],
    queueItems:QueueItem[]
}

export type PassThrus = {
    orientated:boolean,
    assessments:any[],
    reviewItems:ReviewItems
}


export type PassThruProps = {
    userId:string,
    passThrus:PassThrus,
    setPassThrus:Function
}