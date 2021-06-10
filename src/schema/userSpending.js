import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    dailyInfo(date: String!): SpendingResponse!
    insight(from: String!, to: String!): SpendingResponse!
  }

  extend type Mutation {
    addDailyInfo(input: AddDailyInput!): DailyInfoResponse!
    updateDailyInfo(input: UpdateDailyInput!): DailyInfoResponse!
  }

  type Log {
    title: String!
    money: Float!
    details: String!
  }

  input LogInput {
    title: String!
    money: Float!
    details: String!
  }

  type SpendingResponse {
    id: ID!
    date: String!
    logs: [Log]
    income: Float
    notes: String
  }

  type DailyInfoResponse {
    isSuccess: Boolean!
    message: String
  }

  input UpdateDailyInput {
    id: ID!
    logs: [LogInput]
    income: Float
    notes: String
  }

  input AddDailyInput {
    date: String!
    logs: [LogInput]
    income: Float
    notes: String
  }

`;
