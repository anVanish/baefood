const mongoose = require("mongoose");

const Categories = new mongoose.Schema(
    {
        name: { type: String, required: true },
        isOther: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("categories", Categories);
