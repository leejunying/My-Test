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

    email: {
      type: String,
      required: true,
    },

    birthdate: {
      type: Date,
      require: true,
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("Users", Users_Model);
