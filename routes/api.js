const { Router } = require("express");
let router = Router();
let {
  post_signup,
  post_login,
  post_save,
  get_data,
} = require("../controllers/api");

//API routes
router.post("/signup", post_signup);

router.post("/login", post_login);

router.post("/save", post_save);

router.get("/data/:email", get_data);

//exports
module.exports = router;
