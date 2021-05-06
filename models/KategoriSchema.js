const mongoose = require("mongoose");

const KategoriSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  destinations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destinations",
    },
  ],
});

module.exports = mongoose.model("Categories", KategoriSchema);
