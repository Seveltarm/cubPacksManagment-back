const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;

const StarType = require('../types/starType');
const StarModel = require('../models/star');

const starMutations = {
  addStar: {
    type: StarType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: new GraphQLNonNull(GraphQLString)
      },
      tasks: {
        type: new GraphQLNonNull(GraphQLString)
      },
      comment: {
        type: GraphQLString
      },
      packId: {
        type: GraphQLString
      },
      category: {
        type: GraphQLString
      }
    },
    resolve: async (root, params) => {
      const starModel = new StarModel(params);
      const newStar = starModel.save();
      if (!newStar) {
        throw new Error('UNEXPECTED_ERROR');
      }
      return newStar;
    }
  }
}

module.exports = starMutations;