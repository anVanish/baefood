const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.getSuccessOrderMessage = function (order) {
    const serveDateStr = order.serveDate
        ? new Date(order.serveDate).toLocaleDateString("vi-VN")
        : "Không xác định";

    const serveTimeStr =
        order.serveTime === "breakfast"
            ? "Buổi sáng"
            : order.serveTime === "lunch"
            ? "Buổi trưa"
            : order.serveTime === "dinner"
            ? "Buổi tối"
            : "Không xác định";

    const foodList =
        order.foodIds?.length > 0
            ? order.foodIds.map((i) => `🍱 ${i.name}`).join("\n")
            : "❌ Không có món nào";

    return {
        username: "Order Notifier",
        avatar_url: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        embeds: [
            {
                title: "🛎️ Có đơn mới admin ơi!",
                color: 0x00ff00,
                description: `Một đơn hàng mới vừa được đặt trên hệ thống 💚`,
                fields: [
                    {
                        name: "🕒 Thời gian phục vụ",
                        value: `**${serveTimeStr}**, ${serveDateStr}`,
                        inline: false,
                    },
                    {
                        name: "🍽️ Danh sách món ăn",
                        value: foodList,
                        inline: false,
                    },
                    {
                        name: "📝 Ghi chú từ bé",
                        value: order.note?.trim() || "_(Không có ghi chú)_",
                        inline: false,
                    },
                ],
                footer: {
                    text: "Bếp iu – Thông báo đơn hàng mới",
                    icon_url:
                        "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
                },
                timestamp: new Date().toISOString(),
            },
        ],
    };
};

exports.getExpiredOrderMessage = function (order) {};

exports.sendDiscordMessage = async function (message) {
    try {
        await axios.post(process.env.WEBHOOK_URL, message);
        console.log("✅ Discord notification sent successfully!");
    } catch (error) {
        console.log("❌ Error sending Discord notification: " + error.message);
    }
};
