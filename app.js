const express = require("express");
const app = express();
const port = process.env.PORT || `1000`;
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
const dbURI = `mongodb+srv://a_01794642816:a_01794642816@afsinurcluster1.e2eue.mongodb.net/noteusers?retryWrites=true&w=majority`;
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
