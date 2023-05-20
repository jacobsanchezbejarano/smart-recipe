let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll_ingredients = async (req, res, next) => {
  try {
    const result = await mongodb.getCluster().db().collection('Ingredients').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const getSingle_ingredients = async (req, res, next) => {
    try {
      const ingredientId = new ObjectId(req.params.id);
      const result = await mongodb.getCluster().db().collection('Ingredients').find({ _id: ingredientId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(lists[0]);
      });
    }catch(error){
      res.status(400).json({message: error});
    }
};

const getSingle_ingredients_by_name = async (req, res, next) => {
  try {
    const ingredientName = req.params.ingredient_name;
    const result = await mongodb.getCluster().db().collection('Ingredients').find({ ingredient_name: ingredientName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const post_ingredients = async (req, res, next) => {
  console.log(req.body);
  //const data = req.body;
  const data = {
        "ingredient_name": req.body.ingredient_name,
        "category": req.body.category,
        "measure_type": req.body.measure_type
  };

    const response = await mongodb.getCluster().db().collection('Ingredients').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
}

const update_ingredients = async (req, res, next) => {
  const ingredientId = new ObjectId(req.params.id);
  const data = {
    "ingredient_name": req.body.ingredient_name,
    "category": req.body.category,
    "measure_type": req.body.measure_type
  };
  const response = await mongodb.getCluster().db().collection('Ingredients')
  .replaceOne({ _id: ingredientId }, data);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
  }
}

const delete_ingredients = async (req, res, next) => {
  const ingredientId = new ObjectId(req.params.id);
  const response = await mongodb.getCluster().db().collection('Ingredients').deleteOne({ _id: ingredientId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = {
    getAll_ingredients,
    getSingle_ingredients,
    getSingle_ingredients_by_name,
    post_ingredients,
    update_ingredients,
    delete_ingredients
}