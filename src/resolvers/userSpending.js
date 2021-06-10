import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";
import moment from "moment";

const fromCursorHash = (string) =>
  Buffer.from(string, "base64").toString("ascii");
const toCursorHash = (string) => Buffer.from(string).toString("base64");

const SPENDING_MESSAGES = {
  DUPLICATED_DATE: "DUPLICATED_DATE",
  NO_INFO: "NO_INFO",
};
const { DUPLICATED_DATE, NO_INFO } = SPENDING_MESSAGES;

export default {
  Query: {
    dailyInfo: async (parent, { date }, { models, me }) => {
      const data = await models.UserSpending.findOne({
        date,
        user: me.id,
      });

      const tempObj = {
        id: data._id,
        date: data.date,
        logs: data.logs,
        income: data.income,
        notes: data.notes,
      };

      return tempObj;
    },
    insight: async (parent, { from, to }, { models, me }) => {
      const data = await models.UserSpending.find({
        date,
        user: me.id,
      });

      const tempObj = {
        id: data._id,
        date: data.date,
        logs: data.logs,
        income: data.income,
        notes: data.notes,
      };

      return tempObj;
    },
  },

  Mutation: {
    addDailyInfo: combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, me }) => {
        const { date } = input;
        const data = await models.UserSpending.findOne({
          date,
          user: me.id,
        });
        if (data) {
          return {
            isSuccess: false,
            message: DUPLICATED_DATE,
          };
        }
        input.user = me.id;
        const userSpending = await models.UserSpending.create({
          ...input,
        });
        return { isSuccess: true };
      }
    ),

    updateDailyInfo: combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, me }) => {
        const { id, logs, income, notes } = input;
        try {
          await models.UserSpending.findOneAndUpdate(
            { user: me.id, _id: id },
            { logs, income, notes }
          );
          return { isSuccess: true };
        } catch (error) {
          return {
            isSuccess: false,
            message: NO_INFO,
          };
        }
      }
    ),

  },
};
