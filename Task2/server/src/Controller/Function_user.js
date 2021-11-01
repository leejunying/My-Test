const Users_Model = require("../Models/Users");

const checkdata = async (queryobj, model) => {
  try {
    // queryobj= {search value}
    const results = await model.findOne(queryobj);

    if (results) return { status: true, data: results };
    else return { status: false };
  } catch (err) {
    return err;
  }
};

const get = async (name) => {
  try {
    if (name == undefined) {
      let get = await Users_Model.find();

      if (get) return { status: 200, data: get };
      else return { status: 404, message: "Not Found" };
    } else {
      console.log(name);
      let get = await Users_Model.find({
        username: { $regex: ".*" + name + ".*", $options: "i" },
      });

      if (get) return { status: 200, data: get };
      else return { status: 404, message: "Not Found" };
    }
  } catch (err) {
    return { status: 500, message: err.toString() };
  }
};

const add = async (input) => {
  try {
    const userdata = await checkdata({ username: input.username }, Users_Model);
    if (userdata.status == false) {
      let addnew = await Users_Model.create(input);
      if (addnew) return { status: 200, message: "Add new user successfully" };
      else return { status: 500, message: "Failed to create user" };
    } else {
      return { status: 406, message: "User name already exists" };
    }
  } catch (err) {
    return { status: 500, message: err.toString() };
  }
};

const update = async (update) => {
  try {
    //  request =[{obj1,obj2,obj3....}]

    let notfound = [];
    let found = [];
    let Alldata = (await get()).data;
    Alldata = Alldata.map((data) => {
      return data._id.toString();
    });

    update.map((data) => {
      if (Alldata.includes(data._id.trim()) == true) {
        found.push(data);
      } else notfound.push(data);
    });

    console.log(found);

    found.map(async (data) => {
      let results = await Users_Model.updateOne({ _id: data._id.trim() }, data);
    });

    found = found.map((data) => {
      return data.username;
    });
    notfound = notfound.map((data) => {
      return data.username;
    });

    return {
      status: 200,
      updated: found.toString(),
      notfound: notfound.toString(),
      message: "Update successful",
    };

    // console.log(found);
    // console.log(notfound);

    console.log(found);
  } catch (err) {
    return { status: 500, message: err.toString() };
  }
};

module.exports = {
  add,
  update,
  get,
};
