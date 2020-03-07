var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var BadgeModel = require('../models/badge');

var badgeType = new GraphQLObjectType({
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

var getBadges = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      badges: {
        type: new GraphQLList(badgeType),
        resolve: function () {
          const badges = BadgeModel.find().exec();
          if (!badges) {
            throw new Error('UNEXPECTED_ERROR');
          }
          return badges;
        }
      },
      badge: {
        type: badgeType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const badgeDetail = BadgeModel.findById(params.id).exec();
          if (!badgeDetail) {
            throw new Error('UNEXPECTED_ERROR');
          }
          return badgeDetail;
        }
      }
    }
  }
});

var badgeMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addBadge: {
        type: badgeType,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
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
        },
        resolve: function (root, params) {
          const badgeModel = new BadgeModel(params);
          const newBadge = badgeModel.save();
          if (!newBadge) {
            throw new Error('UNEXPECTED_ERROR');
          }
          return newBadge
        }
      },
      updateBadge: {
        type: badgeType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
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
        },
        resolve(root, params) {
          return BadgeModel.findByIdAndUpdate(params.id, { 
            title: params.title, 
            description: params.description, 
            surname: params.surname, 
            logo: params.logo,
            packId: params.packId,
            category: params.category 
          }, 
          function (err) {
            if (err) return next(err);
          });
        }
      },
      removeBadge: {
        type: badgeType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const removeBadge = BadgeModel.findByIdAndRemove(params.id).exec();
          if (!removeBadge) {
            throw new Error('UNEXPECTED_ERROR');
          }
          return removeBadge;
        }
      }

    }
  }
});

module.exports = new GraphQLSchema({ query: getBadges, mutation: badgeMutation });
