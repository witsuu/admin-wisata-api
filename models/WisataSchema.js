const mongoose = require("mongoose");

const WisataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pathFile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Destinations", WisataSchema);
