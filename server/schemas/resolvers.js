const mutations = require("./mutations");
const queries = require("./queries");
const settingQueries = require("./settingQueries");

const resolvers = {
    Query:{
        ...queries,...settingQueries
    },
    Mutation:{
        ...mutations
    }
}


module.exports = {resolvers}