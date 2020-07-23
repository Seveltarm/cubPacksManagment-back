const GraphQLList = require('graphql').GraphQLList;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLString = require('graphql').GraphQLString;

const StarType = require('../types/starType');
const StarModel = require('../models/star');

const starQuery = {
    type: new GraphQLList(StarType),
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
      const stars = await StarModel.find({ category: category });
      if (!stars) {
        throw new Error('STARS_NOT_FOUND');
      }

      if (searchedPhrase) {
        let filteredStars = stars.filter((star) => {
          if (star.title.toLowerCase().includes(searchedPhrase.toLowerCase()) || 
              star.description.toLowerCase().includes(searchedPhrase.toLowerCase()) ||
              star.tasks.toLowerCase().includes(searchedPhrase.toLowerCase())) {
            return star;
          }
        })
        return filteredStars;
      }  
      return stars;
    }
  }

module.exports = starQuery;