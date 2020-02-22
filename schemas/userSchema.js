var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var UserModel = require('../models/user');

var userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      mail: {
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

var getUserByMail = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      user: {
        type: userType,
        args: {
          mail: {
            name: 'mail',
            type: GraphQLString
          },
          password: {
            name: 'password',
            type: GraphQLString
          }
        },
        resolve: async (parent, {mail, password}) => {
          const user = await UserModel.findOne({ mail, password })
          console.log('user',user);
          return user;
        }
      }
    }
  }
});

var userMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addUser: {
        type: userType,
        args: {
          mail: {
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
        resolve: function (root, params) {
          const userModel = new UserModel(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error('Error');
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
            throw new Error('Error')
          }
          return removeUser;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: getUserByMail, mutation: userMutation });
