const journalMutations = require("./journal/journalMutations.js");
const journalQueries = require("./journal/journalQueries")
const mutations = require("./mutations");
const { notesMutations } = require("./notes/notesMutations.js");
const queries = require("./queries");
const settingQueries = require("./settingQueries");

const resolvers = {
    Query:{
        ...queries,...settingQueries,...journalQueries
    },
    Mutation:{
        ...mutations,...journalMutations,...notesMutations
    }
}


module.exports = {resolvers}