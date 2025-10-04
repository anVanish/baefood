const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Categories = require("../models/Categories");
const Foods = require("../models/Foods");

// /categories
//GET /
exports.listCategories = async (req, res, next) => {
    try {
        const categories = await Categories.aggregate([
            {
                $lookup: {
                    from: "foods",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "foods",
                },
            },
            {
                $addFields: {
                    foodCount: { $size: "$foods" },
                },
            },
            {
                $project: {
                    foods: 0,
                },
            },
            { $sort: { isOther: 1 } },
        ]);
        res.json(
            new ApiResponse()
                .setData("total", categories.length)
                .setData("categories", categories)
        );
    } catch (error) {
        next(error);
    }
};

//POST /
exports.addCategory = async (req, res, next) => {
    try {
        const category = new Categories(req.body);
        await category.save();
        res.json(
            new ApiResponse()
                .setSuccess("Category added")
                .setData("category", category)
        );
    } catch (error) {
        next(error);
    }
};

//PUT /:categoryId
exports.updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        const category = await Categories.findOne({ _id: categoryId });
        if (!category) throw new ApiError("Category not found", 404);
        if (category.isOther)
            throw new ApiError(`Cannot update category '${category.name}'`);

        await Categories.findOneAndUpdate({ _id: categoryId }, req.body, {
            new: true,
        });
        res.json(
            new ApiResponse()
                .setSuccess("Category updated")
                .setData("category", category)
        );
    } catch (error) {
        next(error);
    }
};

//DELETE /:categoryId
exports.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Categories.findOne({ _id: categoryId });
        if (!category) throw new ApiError("Category not found", 404);
        if (category.isOther)
            throw new ApiError(`Cannot delete category '${category.name}'`);

        const otherCategory = await Categories.findOne({ isOther: true });
        await Foods.updateMany(
            { categoryId },
            { $set: { categoryId: otherCategory._id } }
        );

        await Categories.findOneAndDelete({ _id: categoryId });

        await res.json(
            new ApiResponse()
                .setSuccess(
                    `Category deleted, all products move to ${otherCategory.name}`
                )
                .setData("category", category)
        );
    } catch (error) {
        next(error);
    }
};
