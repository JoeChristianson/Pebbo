import boringTheme from "./boring.ts"
import happyElfTheme from "./happyelf.ts"
import starshipTheme from "./starship.ts"

type Theme = {
    name:String,
    css:any
}


const themes:Theme[] = [
    boringTheme,
    happyElfTheme,
    starshipTheme
]

export default themes