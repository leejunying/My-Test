const mongoose = require("mongoose");

const { Schema } = mongoose;

const Users_Model = new Schema(
  {
    create_date: {
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: true,
    },

    familytree: {
      type: Array,
      default: {
        name: "Root",
        attributes: {
          title: "Your family",
        },
        children: [],
      },
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("Users", Users_Model);
