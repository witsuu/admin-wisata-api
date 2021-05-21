const Wisata = require("../models/WisataSchema");
const Categories = require("../models/KategoriSchema");
const { storeDestinations } = require("../validation/wisataValidation");

const storeWisata = async (req, res) => {
  const { error } = storeDestinations(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.file === undefined)
    return res.status(400).send({ message: "Please upload a image" });

  const destination = new Wisata({
    name: req.body.name,
    description: req.body.description,
    pathFile: req.file.path,
  });

  try {
    const savedDestination = await destination.save();

    try {
      await Categories.findByIdAndUpdate(req.body.category_id, {
        $push: { destinations: savedDestination._id },
      });
    } catch (err) {
      return res.sendStatus("Error:" + err);
    }

    return res.send({ message: "Added destination successfully" });
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
};

const getWisataById = async (req, res) => {
  const wisata = await Wisata.findById(req.params.id);

  res.send(wisata);
};

const getAllWisata = async (req, res) => {
  const destinations = await Wisata.find();

  res.send(destinations);
};

const getWisataWithPaging = async (req, res, next) => {
  const { page, limit } = req.query;

  try {
    const destinations = await Wisata.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();
    const totalDestiny = await Wisata.find().countDocuments();

    res.status(200).json({
      message: "Fetch data destination with pagination",
      destinations: destinations,
      currentPage: page,
      maxPage: Math.ceil(totalDestiny / limit),
    });
  } catch (error) {
    res.send("" + error);
  }
};

module.exports = {
  storeWisata,
  getWisataById,
  getAllWisata,
  getWisataWithPaging,
};
