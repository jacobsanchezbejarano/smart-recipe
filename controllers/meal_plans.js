let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');

const schema = Joi.object({
  date: Joi.string()
    .pattern(/^(\d{2}\/\d{2}\/\d{4})|(\d{2}\/\d{2}\/\d{2})$/)
    .required()
    .messages({
      'string.pattern.base': 'The date field must be in DD/MM/YYYY or MM/DD/YYYY format'
    })
    .empty()
    .messages({
      'string.empty': 'date field cannot be empty'
    }),
  recipe: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The recipe field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'recipe field cannot be empty'
    }),

  user_name: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The user_name field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'user_name field cannot be empty'
    })
});

const getAll_meal_plans = async (req, res) => {
  try {
    const result = await mongodb.getCluster().db().collection('Meal_Plans').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSingle_meal_plans = async (req, res) => {
  try {
    const mealPlanId = new ObjectId(req.params.id);

    // validate exist id
    const existingmeal = await mongodb
      .getCluster()
      .db()
      .collection('Meal_Plans')
      .findOne({ _id: mealPlanId });

    if (!existingmeal) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const result = await mongodb
      .getCluster()
      .db()
      .collection('Meal_Plans')
      .find({ _id: mealPlanId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSingle_meal_plans_by_recipe_name = async (req, res) => {
  try {
    const recipeName = req.params.recipe;

     // validate exist recipe
     const existinrecipename = await mongodb
     .getCluster()
     .db()
     .collection('Meal_Plans')
     .findOne({ recipe: recipeName });

   if (!existinrecipename) {
     return res.status(404).json({ error: 'Record not found' });
   }
    const result = await mongodb
      .getCluster()
      .db()
      .collection('Meal_Plans')
      .find({ recipe: recipeName })
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const post_meal_plans = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    console.log(req.body);
    //const data = req.body;
    // const timestamp = new Date().toJSON();
    const data = {
      user_name: req.body.user_name,
      recipe: req.body.recipe,
      date: req.body.date
    };

    const response = await mongodb.getCluster().db().collection('Meal_Plans').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update_meal_plans = async (req, res) => {
  try {
    const mealPlanId = new ObjectId(req.params.id);
    // validate exist id
    const existingmeal = await mongodb
      .getCluster()
      .db()
      .collection('Meal_Plans')
      .findOne({ _id: mealPlanId });

    if (!existingmeal) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    // const timestamp = new Date().toJSON();
    const data = {
      user_name: req.body.user_name,
      recipe: req.body.recipe,
      date: req.body.date
    };
    const response = await mongodb
      .getCluster()
      .db()
      .collection('Meal_Plans')
      .replaceOne({ _id: mealPlanId }, data);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_meal_plans = async (req, res) => {
  try {
    const mealPlanId = new ObjectId(req.params.id);
    // validate exist id
    const existingmeal = await mongodb
      .getCluster()
      .db()
      .collection('Meal_Plans')
      .findOne({ _id: mealPlanId });

    if (!existingmeal) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const response = await mongodb
      .getCluster()
      .db()
      .collection('Meal_Plans')
      .deleteOne({ _id: mealPlanId });
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
  getAll_meal_plans,
  getSingle_meal_plans,
  getSingle_meal_plans_by_recipe_name,
  post_meal_plans,
  update_meal_plans,
  delete_meal_plans
};
