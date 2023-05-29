let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');

const schema = Joi.object({
  recipe_title: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The recipe_title field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'recipe_title field cannot be empty'
    }),
  description: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The description field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'description field cannot be empty'
    }),

  ingredients: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The ingredients field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'ingredients field cannot be empty'
    }),
  instructions: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The instructions field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'instructions field cannot be empty'
    }),
  prep_time: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The prep_time field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'prep_time field cannot be empty'
    }),
  serving_size: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The serving_size field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'serving_size field cannot be empty'
    }),
  cook_time: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The cook_time field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'cook_time field cannot be empty'
    })
});

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
    // validate exist id
    const existingRecipes = await mongodb
      .getCluster()
      .db()
      .collection('Recipes')
      .findOne({ _id: recipeId });

    if (!existingRecipes) {
      return res.status(404).json({ error: 'Record not found' });
    }
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
    // validate exist recipe title
    const existinrecipetitle = await mongodb
    .getCluster()
    .db()
    .collection('Recipes')
    .findOne({ recipe_title: recipeTitle });

  if (!existinrecipetitle) {
    return res.status(404).json({ error: 'Record not found' });
  }
   const result = await mongodb
     .getCluster()
     .db()
     .collection('Recipes')
     .find({ recipe_title: recipeTitle })
     .toArray();

   res.setHeader('Content-Type', 'application/json');
   res.statusCode = 200;
   res.json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const post_recipes = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    console.log(req.body);
    //const data = req.body;
    const data = {
      recipe_title: req.body.recipe_title,
      description: req.body.description,
      ingredients: req.body.ingredients,
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update_recipes = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);

    // validate exist id
    const existingRecipes = await mongodb
      .getCluster()
      .db()
      .collection('Recipes')
      .findOne({ _id: recipeId });

    if (!existingRecipes) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    const data = {
      recipe_title: req.body.recipe_title,
      description: req.body.description,
      ingredients: req.body.ingredients,
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_recipes = async (req, res) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    // validate exist id
    const existingRecipes = await mongodb
      .getCluster()
      .db()
      .collection('Recipes')
      .findOne({ _id: recipeId });

    if (!existingRecipes) {
      return res.status(404).json({ error: 'Record not found' });
    }
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
  } catch (err) {
    res.status(500).json({ message: err.message });
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
