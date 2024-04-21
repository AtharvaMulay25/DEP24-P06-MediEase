const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");

// @desc    Get Category List
// route    GET /api/medicine/category/list
// @access  Private (Admin)
const getCategoryList = async (req, res, next) => {
  try {
    const categoryList = await prisma.category.findMany({
      where: {
        status: "ACTIVE",
      },
    });
    // console.log(categoryList);

    return res.status(200).json({
      ok: true,
      data: categoryList,
      message: "Category List retrieved successfully",
    });
  } catch (err) {
    console.log(`Category List Fetching Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: "Fetching Category List failed, Please try again later",
    });
  }
};

//I don't think it is used anywhere **********
// @desc    Get Single Category
// route    GET /api/medicine/category/:id
// @access  Private (Admin)
const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    // console.log(category);

    return res.status(200).json({
      ok: true,
      data: category,
      message: "Category retrieved successfully",
    });
  } catch (err) {
    console.log(`Category Fetching Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: "Fetching Category failed, Please try again later",
    });
  }
};

// @desc    Create Category Records
// route    POST /api/medicine/category/create
// @access  Private (Admin)
const createCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    const { categoryName, strengthType } = req.body;
    const categoryExists = await prisma.category.findFirst({
      where: {
        categoryName: categoryName.trim().toUpperCase(),
      },
    });

    let newCategory;
    if (categoryExists && categoryExists.status === "ACTIVE") {
      throw new ExpressError("Category already exists", 400);
    }
    if (categoryExists && categoryExists.status === "INACTIVE") {
      const restoredCategory = await prisma.category.update({
        where: {
          id: categoryExists.id,
        },
        data: {
          categoryName: categoryName.trim().toUpperCase(),
          strengthType,
          status: "ACTIVE",
        },
      });
      newCategory = restoredCategory;
    }

    if (!categoryExists) {
      const createdRecord = await prisma.category.create({
        data: {
          categoryName: categoryName.trim().toUpperCase(),
          strengthType,
        },
      });
      newCategory = createdRecord;
    }
    return res.status(200).json({
      ok: true,
      data: newCategory,
      message: "Category record created successfully",
    });
  } catch (err) {
    console.log(`Category Creating Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: `Creating Category record failed, Please try again later`,
    });
  }
};

// @desc    Update Category List Record
// route    PUT /api/medicine/category/
// @access  Private (Admin)
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRecord = await prisma.category.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });

    // console.log(updatedRecord);

    return res.status(200).json({
      ok: true,
      data: updatedRecord,
      message: "Category List record updated successfully",
    });
  } catch (err) {
    console.log(`Category List Updating Error : ${err.message}`);

    const errMsg =
      "Updating category list record failed, Please try again later";
    const errCode = 500;

    //record does not exist
    if (err.code === "P2025") {
      errMsg = "Record does not exist";
      errCode = 404;
    }

    return res.status(errCode).json({
      ok: false,
      data: [],
      message: errMsg,
    });
  }
};

// @desc    Delete Category List Record
// route    DELETE /api/medicine/category/delete
// @access  Private (Admin)
const deleteCategory = async (req, res, next) => {
  try {
    // console.log("req.body : ", req.body);
    const { id } = req.params;

    const deletedRecord = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        status: "INACTIVE",
      },
    });

    return res.status(200).json({
      ok: true,
      data: deletedRecord,
      message: "Category List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Category List Deletion Error : ${err.message}`);

    const errMsg =
      "Deleting category list record failed, Please try again later";
    const errCode = 500;

    //record does not exist
    if (err.code === "P2025") {
      errMsg = "Record does not exist";
      errCode = 404;
    }

    return res.status(errCode).json({
      ok: false,
      data: [],
      message: errMsg,
    });
  }
};

module.exports = {
  getCategory,
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategory,
};
