const Categories = require("../models/KategoriSchema");

const getAllCategori = async (req, res) => {
  const kategori = await Categories.find();

  res.send(kategori);
};

const storeCategory = async (req, res) => {
  const kategori = new Categories({
    category: req.body.kategori,
  });

  try {
    const savedCategories = await kategori.save();

    res.send(savedCategories);
  } catch (error) {
    res.status(400).send(error + "");
  }
};

const getCategoryById = async (req, res) => {
  const kategori = await Categories.findById(req.params.id).populate(
    "destinations"
  );

  res.send(kategori);
};

module.exports = {
  getAllCategori,
  storeCategory,
  getCategoryById,
};
