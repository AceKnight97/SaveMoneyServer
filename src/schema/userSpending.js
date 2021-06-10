import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    dailyInfo(date: Date!): SpendingResponse!
  }

  extend type Mutation {
    updateDailyInfo(dailyInput: DailyInput!): UpdateDailyInfoResponse!
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
    date: Date!
    logs: [Log]
    income: Float
    notes: String
  }

  type UpdateDailyInfoResponse {
    isSuccess: Boolean!
    message: String
  }

  input DailyInput {
    id: ID!
    date: Date!
    logs: [LogInput]
    income: Float
    notes: String
  }

`;
