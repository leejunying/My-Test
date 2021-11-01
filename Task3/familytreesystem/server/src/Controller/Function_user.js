const Users_Model = require("../Models/Users");

const get = async () => {
  try {
    let results = await Users_Model.find().sort({ create_date: -1 });

    if (results) return { status: 200, data: results };
  } catch (err) {
    return { status: 500, message: err.toString() };
  }
};

const update = async (query, data) => {
  try {
    console.log(query, data);

    let result = await Users_Model.updateOne(
      { _id: query },
      { familytree: data }
    );

    if (result) {
      if (result.acknowledged == true && result.modifiedCount >= 1) {
        return { status: 200, message: "Update OK" };
      }
    }
  } catch (err) {
    return { status: 500, message: err.toString() };
  }
};

const remove = async (id) => {
  try {
    let result = await Users_Model.deleteOne({ _id: id });

    if (result) return { status: 200, message: "Delete successfully" };
    else return { status: 500, message: "Can't delete" };
  } catch (err) {
    return { status: 500, message: err.toString() };
  }
};

const add = async (data) => {
  try {
    let result = await Users_Model.create({
      username: data[0].name,
      familytree: data,
    });

    if (result) {
      console.log("created");
      return { status: 200, data: result };
    } else return { status: 500, message: "Can't create data" };
  } catch (err) {
    return { status: 500, message: err.toString() };
  }
};

module.exports = {
  add,
  update,
  get,
  remove,
};
