const Route = require("express").Router();
const {
  getAllCategori,
  storeCategory,
  getCategoryById,
} = require("../controllers/CategoriesController");
const {
  storeWisata,
  getWisataById,
  getAllWisata,
  getWisataWithPaging,
} = require("../controllers/WisataController");

Route.post("/destination/categories", storeCategory);
Route.get("/destination/categories", getAllCategori);
Route.get("/destination/categories/:id", getCategoryById);
Route.post("/destination", storeWisata);
Route.get("/destination/:id", getWisataById);
Route.get("/destination", getAllWisata);
Route.get("/destinations", getWisataWithPaging);

module.exports = Route;
