const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  console.log("GET /api/categories");
  req.categoriesArray = await categories.find({});
  next();
};

const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Error creating category");
  }
};

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Введите название категории" });
  } else {
    next();
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  if (isInArray) {
    res.status(400).send({ message: "Категория с таким названием уже существует" });
  } else {
    next();
  }
};

const findCategoryById = async (req, res, next) => {
  console.log("GET /api/categories/:id");
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.status(404).send("Category not found");
  }
};

const updateCategory = async (req, res, next) => {
  console.log("PUT /api/categories/:id");
  try {
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send("Error updating category");
  }
};

const deleteCategory = async (req, res, next) => {
  console.log("DELETE /api/categories/:id");
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.status(400).send("Error deleting category");
  }
};

module.exports = {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName,
};
