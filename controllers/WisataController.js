const { Wisata } = require("../models/WisataSchema");
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
    image_id: req.file.id,
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
  const wisata = await Wisata.findById(req.params.id).populate({
    path: "images",
    populate: { path: "files_id" },
  });

  res.send(wisata);
};

const getAllWisata = async (req, res) => {
  const { page, limit } = req.query;

  const destinations = await Wisata.find()
    .populate({
      path: "images",
      populate: { path: "files_id" },
    })
    .sort({ date: "desc" })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .exec();

  const totalDestination = await Wisata.find().countDocuments();

  res.send({
    message: "data with pagination",
    destinations: destinations,
    currentPage: page,
    maxPage: Math.ceil(totalDestination / limit),
  });
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

const editWisataById = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  console.log(id);

  try {
    await Wisata.findOneAndUpdate(
      { _id: id },
      {
        description: description,
        name: name,
      }
    );

    return res.send("updated successfull");
  } catch (err) {
    return res.send(err);
  }
};

const deleteWisata = async (req, res) => {
  const id = req.params.id;

  try {
    await Wisata.findByIdAndDelete(id);

    return res.send("delete sucessfull");
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  storeWisata,
  getWisataById,
  getAllWisata,
  getWisataWithPaging,
  editWisataById,
  deleteWisata,
};
