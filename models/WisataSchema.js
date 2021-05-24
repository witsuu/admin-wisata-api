const mongoose = require("mongoose");

const WisataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Images.chunks",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const chunkSchema = new mongoose.Schema(
  {
    files_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Images.files",
    },
    data: {
      type: Buffer,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const filesSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    contentType: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

WisataSchema.virtual("images", {
  ref: "Images.chunks",
  localField: "image_id",
  foreignField: "files_id",
  justOne: false,
});

module.exports = {
  chunks: mongoose.model("Images.chunks", chunkSchema),
  files: mongoose.model("Images.files", filesSchema),
  Wisata: mongoose.model("Destinations", WisataSchema),
};
