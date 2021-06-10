import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    insight(from: Date!, to: Date!): [SpendingResponse]
  }
`;
