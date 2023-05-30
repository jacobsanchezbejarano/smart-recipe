let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');

const schema = Joi.object({
  ingredient_name: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The ingredient_name field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'ingredient_name field cannot be empty'
    }),
  category: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The category field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'category field cannot be empty'
    }),

  measure_type: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The measure_type field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'measure_type field cannot be empty'
    })
});

const getAll_ingredients = async (req, res) => {
  try {
    const result = await mongodb.getCluster().db().collection('Ingredients').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSingle_ingredients = async (req, res) => {
  try {
    const ingredientId = new ObjectId(req.params.id);
    
    const existingIngredients = await mongodb
      .getCluster()
      .db()
      .collection('Ingredients')
      .findOne({ _id: ingredientId });

    if (!existingIngredients) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const result = await mongodb
      .getCluster()
      .db()
      .collection('Ingredients')
      .find({ _id: ingredientId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSingle_ingredients_by_name = async (req, res) => {
  try {
    const ingredientName = req.params.ingredient_name;
    const result = await mongodb
      .getCluster()
      .db()
      .collection('Ingredients')
      .find({ ingredient_name: ingredientName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const post_ingredients = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    console.log(req.body);
    //const data = req.body;
    const data = {
      ingredient_name: req.body.ingredient_name,
      category: req.body.category,
      measure_type: req.body.measure_type
    };

    const response = await mongodb.getCluster().db().collection('Ingredients').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update_ingredients = async (req, res) => {
  try {
    const ingredientId = new ObjectId(req.params.id);
    // validate exist id
    const existingIngredients = await mongodb
      .getCluster()
      .db()
      .collection('Ingredients')
      .findOne({ _id: ingredientId });

    if (!existingIngredients) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    const data = {
      ingredient_name: req.body.ingredient_name,
      category: req.body.category,
      measure_type: req.body.measure_type
    };
    const response = await mongodb
      .getCluster()
      .db()
      .collection('Ingredients')
      .replaceOne({ _id: ingredientId }, data);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_ingredients = async (req, res) => {
  try {
    const ingredientId = new ObjectId(req.params.id);
    // validate exist id
    const existingIngredients = await mongodb
      .getCluster()
      .db()
      .collection('Ingredients')
      .findOne({ _id: ingredientId });

    if (!existingIngredients) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const response = await mongodb
      .getCluster()
      .db()
      .collection('Ingredients')
      .deleteOne({ _id: ingredientId });
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
  getAll_ingredients,
  getSingle_ingredients,
  getSingle_ingredients_by_name,
  post_ingredients,
  update_ingredients,
  delete_ingredients
};
