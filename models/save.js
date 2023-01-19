const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

//schema object
const obj = {
  data: {
    type: Array,
  },
  email: {
    type: String,
  },
};

//schema setup
const saveNotesSchema = new Schema(obj);
//model setup
const SaveNote = mongoose.model("savenote", saveNotesSchema);

//exports
module.exports = SaveNote;
