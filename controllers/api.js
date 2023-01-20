let api = {};
const NoteUser = require("../models/user");
const SaveNote = require("../models/save");

const handleErrors = (error, res) => {
  let Errors = { email: "", password: "" };

  //signup errors
  if (error._message === `noteuser validation failed`) {
    Object.values(error.errors).forEach(({ properties }) => {
      Errors[properties.path] = properties.message;
    });
  }

  if (error.code === 11000) {
    Errors.email = "email already exists";
  }

  //login error
  if (error.message === `invalid password`) {
    Errors.password = "invalid password";
  }

  if (error.message === `invalid email`) {
    Errors.email = "invalid email";
  }

  if (error.message === "invalid email or password") {
    Errors.msg = error.message;
  }

  res.json({ Errors });
};

api.post_signup = async (req, res) => {
  try {
    const user = await NoteUser.create(req.body);

    if (user) {
      res.send({ done: 1 });
    }
  } catch (error) {
    handleErrors(error, res);
  }
};

api.post_login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await NoteUser.login(email, password);
    if (user) {
      res.send({ done: 1 });
    }
  } catch (error) {
    handleErrors(error, res);
  }
};

api.post_save = async (req, res) => {
  const { data, email } = req.body;

  try {
    let found_ = await SaveNote.findOne({ email });

    if (found_) {
      let user_ = await SaveNote.findOneAndUpdate({ email }, { data, email });

      if (user_) {
        sendJson("data_saved agin");
      }
    } else {
      const saved = await SaveNote.create({ data, email });

      if (saved) {
        sendJson("data_saved");
      }
    }

    function sendJson(data) {
      res.json({ data });
    }
  } catch (error) {
    res.json({ error });
  }
};

api.get_data = async (req, res) => {
  let email = req.params.email;

  try {
    let found_ = await SaveNote.find({ email });

    if (found_) {
      sendJson(found_);
    } else {
      Error("no data found!");
    }

    function sendJson(data) {
      res.json({ data });
    }
  } catch (error) {
    res.json({ error });
  }
};

module.exports = api;
