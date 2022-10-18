const analyticsQueries = require("./analytics/analyticsQueries.js");
const journalMutations = require("./journal/journalMutations.js");
const journalQueries = require("./journal/journalQueries")
const mutations = require("./mutations");
const { notesMutations } = require("./notes/notesMutations.js");
const queries = require("./queries");
const settingQueries = require("./settingQueries");
const toDoQueries = require("./toDoQueries");
const tutorialMutations = require("./tutorial/tutorialMutations.js");
const mailMutations = require("./mail/mailMutations.js");
const themeQueries = require("./tutorial/themeQueries.js");
const habitMutations = require("./habits/habitsMutations.js");
const authenticationMutations = require("./authentication/authenticationMutations.js");

const resolvers = {
    Query:{
        ...queries,...settingQueries,...journalQueries,...analyticsQueries,...themeQueries
    },
    Mutation:{
        ...mutations,...journalMutations,...notesMutations,...tutorialMutations,...mailMutations,...habitMutations,...authenticationMutations
    
    }
}


module.exports = {resolvers}