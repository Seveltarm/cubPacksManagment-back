//GraphQL
const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;

//Queries
const user = require('../queries/user');
const badge = require('../queries/badge');
const star = require('../queries/star');

//Mutations
const userMutations = require('../mutations/user');
const addUser = userMutations.addUser;
const removeUser = userMutations.removeUser;
const updateUser = userMutations.updateUser;

const badgeMutations = require('../mutations/badge');
const addBadge = badgeMutations.addBadge;

const starMutations = require('../mutations/star');
const addStar = starMutations.addStar;

const queries = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      user,
      badge,
      star
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
      addBadge,
      addStar
    }
  }
});

module.exports = new GraphQLSchema({ query: queries, mutation: mutations });
