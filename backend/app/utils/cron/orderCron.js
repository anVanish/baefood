const cron = require("node-cron");
const Orders = require("../../models/Orders");
const {
    sendDiscordMessage,
    getUpcomingExpiredOrderMessage,
} = require("../DiscordNotifier");

async function updateExpiredOrder() {
    try {
        const now = new Date();
        const timeInVietnam = new Date(
            now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        );

        //auto mark isExpired for expired orders
        const result = await Orders.updateMany(
            {
                isExpired: false,
                isDone: false,
                serveDate: { $lt: timeInVietnam },
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

async function checkUpcomingExpiredOrder() {
    try {
        const now = new Date();
        const timeInVietnam = new Date(
            now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        );

        //send notification about order will expired within the next 30 minutes
        const thirtyMinutesLater = new Date(
            timeInVietnam.getTime() + 30 * 60 * 1000
        );

        const upcomingExpiredOrders = await Orders.find({
            isExpired: false,
            isDone: false,
            serveDate: {
                $gte: timeInVietnam,
                $lt: thirtyMinutesLater,
            },
        });

        if (upcomingExpiredOrders.length > 0) {
            console.log(
                `⚠️ ${upcomingExpiredOrders.length} orders will expire within the next 30 minutes:`
            );
            const message = getUpcomingExpiredOrderMessage(
                upcomingExpiredOrders
            );
            await sendDiscordMessage(message);

            console.log("✅ Notifications sent for upcoming expired orders.");
        }
    } catch (error) {
        console.error("Error checking expired orders:", error);
    }
}

cron.schedule("*/30 * * * *", () => {
    updateExpiredOrder();
    checkUpcomingExpiredOrder();
});
