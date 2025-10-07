const cron = require("node-cron");
const Orders = require("../../models/Orders");

async function updateExpiredOrder() {
    try {
        const now = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Ho_Chi_Minh",
        });
        const result = await Orders.updateMany(
            {
                isExpired: false,
                isDone: false,
                serveDate: { $lt: now },
            },
            {
                isExpired: true,
            }
        );
        console.log(`Updated ${result.modifiedCount} expired orders.`);
    } catch (error) {
        console.error("Error updating expired orders:", error);
    }
}

cron.schedule("0 * * * *", () => {
    updateExpiredOrder();
});
