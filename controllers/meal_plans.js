let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll_meal_plans = async (req, res, next) => {
  try {
    const result = await mongodb.getCluster().db().collection('Meal_Plans').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const getSingle_meal_plans = async (req, res, next) => {
    try {
      const mealPlanId = new ObjectId(req.params.id);
      const result = await mongodb.getCluster().db().collection('Meal_Plans').find({ _id: mealPlanId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(lists[0]);
      });
    }catch(error){
      res.status(400).json({message: error});
    }
};

const getSingle_meal_plans_by_recipe_name = async (req, res, next) => {
  try {
    const mealPlanRecipe = req.params.recipe;
    const result = await mongodb.getCluster().db().collection('Meal_Plans').find({ recipe: mealPlanRecipe });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const post_meal_plans = async (req, res, next) => {
  console.log(req.body);
  //const data = req.body;
  const timestamp = new Date().toJSON();
  const data = {
        "user_name": req.body.user_name,
        "recipe": req.body.recipe,
        "date": timestamp,
  };

    const response = await mongodb.getCluster().db().collection('Meal_Plans').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
}

const update_meal_plans = async (req, res, next) => {
  const mealPlanId = new ObjectId(req.params.id);
  const timestamp = new Date().toJSON();
  const data = {
        "user_name": req.body.user_name,
        "recipe": req.body.recipe,
        "date": timestamp,
  };
  const response = await mongodb.getCluster().db().collection('Meal_Plans')
  .replaceOne({ _id: mealPlanId }, data);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
  }
}

const delete_meal_plans = async (req, res, next) => {
  const mealPlanId = new ObjectId(req.params.id);
  const response = await mongodb.getCluster().db().collection('Meal_Plans').deleteOne({ _id: mealPlanId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = {
    getAll_meal_plans,
    getSingle_meal_plans,
    getSingle_meal_plans_by_recipe_name,
    post_meal_plans,
    update_meal_plans,
    delete_meal_plans
}