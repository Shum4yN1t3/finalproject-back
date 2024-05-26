const categoriesRouter = require("express").Router();
const { checkAuth } = require("../middlewares/auth.js");
const {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName,
} = require("../middlewares/categories");
const {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryById,
  sendCategoryUpdated,
  sendCategoryDeleted,
} = require("../controllers/categories");

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.post(
  "/categories",
  checkAuth,
  checkEmptyName,
  findAllCategories,
  checkIsCategoryExists,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.put(
  "/catagories/:id",
  checkAuth,
  checkEmptyName,
  updateCategory,
  sendCategoryUpdated
);
categoriesRouter.delete(
  "/categories/:id",
  checkAuth,
  deleteCategory,
  sendCategoryDeleted
);

module.exports = categoriesRouter;
