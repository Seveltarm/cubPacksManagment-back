//GraphQL
const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;

//Queries
const user = require('../queries/user');
const badges = require('../queries/badge');

//Mutations
const userMutations = require('../mutations/user');
const addUser = userMutations.addUser;
const removeUser = userMutations.removeUser;
const updateUser = userMutations.updateUser;

const badgeMutations = require('../mutations/badge');
const addBadge = badgeMutations.addBadge;

const queries = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      user,
      badges
    }
  }
});

var mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addUser,
      removeUser,
      updateUser,
      addBadge
    }
  }
});

module.exports = new GraphQLSchema({ query: queries, mutation: mutations });
