var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  res.redirect("/index");
});

router.get("/index", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burgers: data,
    };
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function (req, res) {
  burger.create(
    ["burger_name", "devoured"],
    [req.body.name, true],
    function (result) {
      res.redirect("/index");
    }
  );
});

router.put("/burgers/update/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  // console.log("condition", condition);

  burger.update(
    {
      devoured: req.body.devoured,
    },
    // condition,
    function (result) {
      if (result.changeRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

module.exports = router;
