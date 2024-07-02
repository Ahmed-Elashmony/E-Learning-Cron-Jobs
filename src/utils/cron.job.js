import { scheduleJob } from "node-schedule";
import orderModel from "../../DB/model/order.model.js";
import tokenModel from "../../DB/model/token.model.js";
import userModel from "../../DB/model/user.model.js";

export const cronJob = function () {
  console.log("Cron job initialized");

  scheduleJob("32 * * * *", async function () {
    console.log("Cron job running");
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    try {
      await userModel.deleteMany({
        isConfirm: false,
        createdAt: { $lt: threeDaysAgo },
      });
      await userModel.deleteMany({
        isDeleted: true,
        updatedAt: { $lt: threeDaysAgo },
      });
      await tokenModel.deleteMany({ valid: false });
      await tokenModel.deleteMany({
        createdAt: {
          $lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      });
      await orderModel.deleteMany({
        createdAt: {
          $lt: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        },
      });
      console.log("Successfully Deleted");
    } catch (error) {
      console.error("Error running cron job:", error);
    }
  });
};
