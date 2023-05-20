let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll_users = async (req, res, next) => {
  try {
    const result = await mongodb.getCluster().db().collection('Users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const getSingle_users = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getCluster().db().collection('Users').find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(lists[0]);
      });
    }catch(error){
      res.status(400).json({message: error});
    }
};

const post_users = async (req, res, next) => {
  console.log(req.body);
  //const data = req.body;
  const data = {
    "username": req.body.username,
    "password": req.body.password,
    "address": req.body.address,
    "phone": req.body.phone,
    "email": req.bodyemail.email
  };

    const response = await mongodb.getCluster().db().collection('Users').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
}

const update_users = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const data = {
    "username": req.body.username,
    "password": req.body.password,
    "address": req.body.address,
    "phone": req.body.phone,
    "email": req.bodyemail.email
  };
  const response = await mongodb.getCluster().db().collection('Users')
  .replaceOne({ _id: userId }, data);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
  }
}

const delete_users = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getCluster().db().collection('Users').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = {
    getAll_users,
    getSingle_users,
    post_users,
    update_users,
    delete_users
}