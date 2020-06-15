const GraphQLList = require('graphql').GraphQLList;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLString = require('graphql').GraphQLString;

const BadgeType = require('../types/badgeType');
const BadgeModel = require('../models/badge');

const badgeQuery = {
    type: new GraphQLList(BadgeType),
    args: {
      category: {
        name: 'category',
        type: GraphQLInt
      },
      searchedPhrase: {
        name: 'searchedPhrase',
        type: GraphQLString
      },
    },
    resolve: async (parent, { category, searchedPhrase }) => {
      const badges = await BadgeModel.find({ category: category });
      if (!badges) {
        throw new Error('BADGES_NOT_FOUND');
      }

      if (searchedPhrase) {
        let filteredBadges = badges.filter((badge) => {
          if (badge.title.toLowerCase().includes(searchedPhrase.toLowerCase()) || 
              badge.description.toLowerCase().includes(searchedPhrase.toLowerCase()) ||
              badge.tasks.toLowerCase().includes(searchedPhrase.toLowerCase()) ||
              badge.comment.toLowerCase().includes(searchedPhrase.toLowerCase())) {
            return badge;
          }
        })
        return filteredBadges;
      }  
      return badges;
    }
  }

module.exports = badgeQuery;