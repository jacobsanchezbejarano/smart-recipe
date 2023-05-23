let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');

const getAll_recipes = async (req, res) => {
  try {
    const result = await mongodb.getCluster().db().collection('Recipes').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSingle_recipes = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getCluster().db().collection('Recipes').find({ _id: recipeId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSingle_recipes_by_recipe_title = async (req, res) => {
  try {
    const recipeTitle = req.params.recipe_title;
    const result = await mongodb
      .getCluster()
      .db()
      .collection('Recipes')
      .find({ recipe_title: recipeTitle });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const post_recipes = async (req, res) => {
  console.log(req.body);
  //const data = req.body;
  const data = {
    recipe_title: req.body.recipe_title,
    description: req.body.description,
    'ingredients ': req.body.ingredients,
    instructions: req.body.instructions,
    prep_time: req.body.prep_time,
    serving_size: req.body.serving_size,
    cook_time: req.body.cook_time
  };

  const response = await mongodb.getCluster().db().collection('Recipes').insertOne(data);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const update_recipes = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const data = {
    recipe_title: req.body.recipe_title,
    description: req.body.description,
    'ingredients ': req.body.ingredients,
    instructions: req.body.instructions,
    prep_time: req.body.prep_time,
    serving_size: req.body.serving_size,
    cook_time: req.body.cook_time
  };
  const response = await mongodb
    .getCluster()
    .db()
    .collection('Recipes')
    .replaceOne({ _id: recipeId }, data);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
  }
};

const delete_recipes = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const response = await mongodb
    .getCluster()
    .db()
    .collection('Recipes')
    .deleteOne({ _id: recipeId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll_recipes,
  getSingle_recipes,
  getSingle_recipes_by_recipe_title,
  post_recipes,
  update_recipes,
  delete_recipes
};
