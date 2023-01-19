const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

//schema object
const obj = {
  email: {
    type: String,
    required: [true, "email required"],
    lowercase: true,
    unique: true,
    validate: [isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: [true, "invalid password"],
    minlength: [8, "password, minimum 8 characters long"],
  },
  data: {
    type: Object,
  },
};

//schema setup
const noteUserSchema = new Schema(obj);
//static function
noteUserSchema.statics.login = async function (email, password) {
  const user = await NoteUser.findOne({ email, password });

  if (user) {
    return user;
  }
  throw Error("invalid email or password");
};

//model setup
const NoteUser = mongoose.model("noteuser", noteUserSchema);

//exports
module.exports = NoteUser;
