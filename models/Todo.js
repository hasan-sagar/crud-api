const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    task: {
      type: String,
      require: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
