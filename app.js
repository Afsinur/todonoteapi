const express = require("express");
const app = express();
const port = process.env.port || `1000`;
const listen = () => {
  console.log(`listening on port: ${port}`);
};
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
let cors = require("cors");
let API_Routes = require("./routes/api");
//app uses
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", cors(), API_Routes);
//dbURI
const dbURI = `mongodb://127.0.0.1:27017/noteusers`;
const dbURIoptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//connection function
(async () => {
  await mongoose.connect(dbURI, dbURIoptions);
  console.log(`DB connected!`);

  app.listen(port, listen);
})();
