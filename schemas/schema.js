//GraphQL
const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLDate = require('graphql-date');

//Models
const UserModel = require('../models/user');
const BadgeModel = require('../models/badge');

//Types
const userType = require('../types/userType');
const badgeType = require('../types/badgeType');

var queries = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      user: {
        type: userType,
        args: {
          email: {
            name: 'email',
            type: GraphQLString
          },
          password: {
            name: 'password',
            type: GraphQLString
          }
        },
        resolve: async (parent, { email, password }) => {
          const user = await UserModel.findOne({ email, password })
          if (!user) {
            throw new Error('USER_NOT_FOUND');
          }
          return user;
        }
      },
      badges: {
        type: badgeType,
        resolve: async () => {
          const user = await BadgeModel.find()
          if (!user) {
            throw new Error('USER_NOT_FOUND');
          }
          return user;
        }
      }
    }
  }
});

var mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addUser: {
        type: userType,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            type: GraphQLString
          },
          surname: {
            type: GraphQLString
          },
          pack: {
            type: GraphQLString
          }
        },
        resolve: async (root, params) => {
          const email = params.email
          const isMailAlreadyRegistered = await UserModel.findOne({ email })
          if (isMailAlreadyRegistered) {
            throw new Error('MAIL_ALREADY_REGISTERED');
          }
          const userModel = new UserModel(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error('UNEXPECTED_ERROR');
          }
          return newUser
        }
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
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
          }
        },
        resolve(root, params) {
          return BookModel.findByIdAndUpdate(params.id, { password: params.password, name: params.name, surname: params.surname, pack: params.pack, updated_date: new Date() }, function (err) {
            if (err) return next(err);
          });
        }
      },
      removeUser: {
        type: userType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const removeUser = UserModel.findByIdAndRemove(params.id).exec();
          if (!removeUser) {
            throw new Error('UNEXPECTED_ERROR');
          }
          return removeUser;
        }
      },
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
  }
});

module.exports = new GraphQLSchema({ query: queries, mutation: mutations });
