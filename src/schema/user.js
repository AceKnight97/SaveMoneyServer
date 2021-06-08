import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): SignUpData!

    signIn(login: String!, password: String!): SignInData!
    updateUser(firstname: String!, lastname: String!): User!
    deleteUser(id: ID!): Boolean!
    verifiedEmail(verificationToken: String!): Boolean!
    changePassword(password: String!, newPassword: String): Token!
    resetPassword(password: String!): Token!
    forgotPass(email: String!): Boolean!
  }

  type Token {
    token: String!
    srp: Boolean
  }

  type SignUpData {
    token: String!
    isSuccess: Boolean
  }

  type SignInData{
    token: String!
    isSuccess: Boolean
    user: User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    firstname: String
    lastname: String
    messages: [Message!]
  }
`;
