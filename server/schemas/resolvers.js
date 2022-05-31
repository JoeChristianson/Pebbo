const mutations = require("./mutations");
const queries = require("./queries")

const resolvers = {
    Query:{
        ...queries
    },
    Mutation:{
        ...mutations
    }
}

console.log(resolvers)

module.exports = {resolvers}