const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const UserType = require('../types/userType');
const UserModel = require('../models/user');

const userMutations = {
  addUser: {
    type: UserType,
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
    type: UserType,
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
    type: UserType,
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
  }
}

module.exports = userMutations;