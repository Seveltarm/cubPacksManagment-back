const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLDate = require('graphql-date');

const userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      surname: {
        type: GraphQLString
      },
      pack: {
        type: GraphQLString
      },
      registrationDate: {
        type: GraphQLDate
      },
      updatedDate: {
        type: GraphQLDate
      }
    }
  }
});

module.exports = userType;

