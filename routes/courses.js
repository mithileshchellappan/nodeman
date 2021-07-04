const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "Angular" },
  { id: 2, name: "Node" },
  { id: 3, name: "React" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id.toString() === req.params.id);
  if (course) {
    courses.splice(courses.indexOf(course), 1);
    return res.sendStatus(200);
  } else {
    return res.status(404).send("Not found");
  }
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id.toString() === req.params.id);
  if (!course) return res.status(404).send("Not found");
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error);

  course.name = req.body.name;
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.send(400).send(error.details[0].message);

  const course = {
    name: req.body.name,
    id: courses.length + 1,
  };
  courses.push(course);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = router;
