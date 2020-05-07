const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;

const badgeType = new GraphQLObjectType({
  name: 'badge',
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
      logo: {
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

module.exports = badgeType;
