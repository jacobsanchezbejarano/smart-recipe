let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll_transactions = async (req, res, next) => {
  try {
    const result = await mongodb.getCluster().db().collection('transactions').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const getSingle_transactions = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getCluster().db().collection('transactions').find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(lists[0]);
      });
    }catch(error){
      res.status(400).json({message: error});
    }
};

const post_transactions = async (req, res, next) => {
  console.log(req.body);
  //const data = req.body;
  const timestamp = new Date().toJSON();
  const data = {
        "cod_tra": req.body.cod_tra,
        "cod_account": req.body.cod_account,
        "date": timestamp,
        "debe": req.body.debe,
        "haber": req.body.haber,
        "status": req.body.status
  };

    const response = await mongodb.getCluster().db().collection('transactions').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
}

const update_transactions = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const timestamp = new Date().toJSON();
  const data = {
        "cod_tra": req.body.cod_tra,
        "cod_account": req.body.cod_account,
        "date": timestamp,
        "debe": req.body.debe,
        "haber": req.body.haber,
        "status": req.body.status
  };
  const response = await mongodb.getCluster().db().collection('transactions')
  .replaceOne({ _id: userId }, data);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
  }
}

const delete_transactions = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getCluster().db().collection('transactions').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = {
    getAll_transactions,
    getSingle_transactions,
    post_transactions,
    update_transactions,
    delete_transactions
}