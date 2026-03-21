const express = require("express");
const router = express.Router();
const Person = require("../models/persons");

router.get("/", async (req, res, next) => {
  try {
    const person = await Person.find({});
    res.json(person);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: "name or number missing" });
  }

  try {
    const existing = await Person.findOne({ name: name });
    if (existing) {
      return res.status(400).send({ error: "name must be unique" });
    }

    const person = new Person({ name, number });
    const result = await person.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',async (req,res,next)=>{
    const id = req.params.id;

    console.log(id);
    
    const updates = req.body;
    try {
        const updatedPerson = await Person.findByIdAndUpdate(id,updates,{new:true,runValidators:true});
        if(!updatedPerson){
            return res.status(404).json({ error: "Person not found" })
        }

    return res.status(201).json(updatedPerson);
  } catch (error) {
    next(error);
  }
    
})

module.exports = router;
