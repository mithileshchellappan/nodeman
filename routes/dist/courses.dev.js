"use strict";

var express = require("express");

var router = express.Router();
var courses = [{
  id: 1,
  name: "Angular"
}, {
  id: 2,
  name: "Node"
}, {
  id: 3,
  name: "React"
}];
router.get("/", function (req, res) {
  res.send(courses);
});
router["delete"]("/:id", function (req, res) {
  var course = courses.find(function (c) {
    return c.id.toString() === req.params.id;
  });

  if (course) {
    courses.splice(courses.indexOf(course), 1);
    return res.sendStatus(200);
  } else {
    return res.status(404).send("Not found");
  }
});
router.get("/:id", function (req, res) {
  var course = courses.find(function (c) {
    return c.id.toString() === req.params.id;
  });
  if (!course) return res.status(404).send("Not found");
  res.send(course);
});
router.put("/:id", function (req, res) {
  var course = courses.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!course) return res.status(404).send("Not found");

  var _validateCourse = validateCourse(req.body),
      error = _validateCourse.error;

  if (error) return res.status(400).send(error);
  course.name = req.body.name;
  res.send(course);
});
router.post("/", function (req, res) {
  var _validateCourse2 = validateCourse(req.body),
      error = _validateCourse2.error;

  if (error) return res.send(400).send(error.details[0].message);
  var course = {
    name: req.body.name,
    id: courses.length + 1
  };
  courses.push(course);
  res.send(course);
});

function validateCourse(course) {
  var schema = {
    name: Joi.string().min(3).max(50).required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;