const GraphQLString = require('graphql').GraphQLString;

const UserType = require('../types/userType');
const UserModel = require('../models/user');

const userQuery = {
  type: UserType,
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
}

module.exports = userQuery;