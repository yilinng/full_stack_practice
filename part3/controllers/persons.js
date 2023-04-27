const personsRouter = require("express").Router();
const Person = require("../models/person");

personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

personsRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).send({ error: "unknown endpoint" });
      }
    })
    .catch((error) => next(error));
});

personsRouter.post("/", (request, response, next) => {
  const { name, number } = request.body;

  if (name === undefined || number === undefined) {
    return response.status(400).json({ error: "name or number missing" });
  }

  Person.find({ name: name }).then((persons) => {
    if (persons.length) return response.json({ error: "name must be unique" });
  });

  const new_person = new Person({
    name,
    number,
  });

  new_person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

personsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  console.log("id", id);
  try {
    await Person.deleteOne({ _id: id });
    response.json("delete success.");
  } catch (error) {
    next(error);
  }
});

personsRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  console.log("id put", id);

  const person = {
    name: request.body.name,
    number: request.body.number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
