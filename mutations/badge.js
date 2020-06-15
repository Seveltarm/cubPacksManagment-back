const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;

const BadgeType = require('../types/badgeType');
const BadgeModel = require('../models/badge');

const badgeMutations = {
  addBadge: {
    type: BadgeType,
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
      logo: {
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
      const badgeModel = new BadgeModel(params);
      const newBadge = badgeModel.save();
      if (!newBadge) {
        throw new Error('UNEXPECTED_ERROR');
      }
      return newBadge;
    }
  }
}

module.exports = badgeMutations;