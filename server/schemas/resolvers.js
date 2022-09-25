const analyticsQueries = require("./analytics/analyticsQueries.js");
const journalMutations = require("./journal/journalMutations.js");
const journalQueries = require("./journal/journalQueries")
const mutations = require("./mutations");
const { notesMutations } = require("./notes/notesMutations.js");
const queries = require("./queries");
const settingQueries = require("./settingQueries");
const toDoQueries = require("./toDoQueries");
const tutorialMutations = require("./tutorial/tutorialMutations.js");

const resolvers = {
    Query:{
        ...queries,...settingQueries,...journalQueries,...analyticsQueries
    },
    Mutation:{
        ...mutations,...journalMutations,...notesMutations,...tutorialMutations
    }
}


module.exports = {resolvers}