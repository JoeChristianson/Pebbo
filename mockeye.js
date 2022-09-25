const {write} = require("mockeye")

const schema = [{
    name:"string",
    onValue:"number",
    offValue:"number"
},4]

write("./client/src/fakeData/onOffComparison.json",schema)