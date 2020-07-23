const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;

const starType = new GraphQLObjectType({
  name: 'star',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      tasks: {
        type: GraphQLString
      },
      packId: {
        type: GraphQLString
      },
      category: {
        type: GraphQLInt
      }
    }
  }
});

module.exports = starType;
