let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');
const bcrypt = require('bcrypt');
const passwordRegex = /^(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*[a-záéíóúüñ])(?=.*\d)(?=.*[!@#$%^&*().,_]).{8,}$/;

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email format. Please enter a valid email address.'
    })
    .empty()
    .messages({
      'string.empty': 'date field cannot be empty'
    }),
  address: Joi.string()
    .pattern(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The address field does not accept special characters'
    })
    .empty()
    .messages({
      'string.empty': 'address field cannot be empty'
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
    }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.pattern.base': 'The phone field only accepts numbers'
    })
    .empty()
    .messages({
      'string.empty': 'phone field cannot be empty'
    }),
  password: Joi.string()
    .regex(passwordRegex)
    .required()
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character.'
    })
    .empty()
    .messages({
      'string.empty': 'Password field cannot be empty'
    })
});

const getAll_users = async (req, res) => {
  try {
    const result = await mongodb.getCluster().db().collection('Users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getSingle_users = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // validate exist id
    const existingUser = await mongodb
      .getCluster()
      .db()
      .collection('Users')
      .findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const result = await mongodb.getCluster().db().collection('Users').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const post_users = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    console.log(req.body);
    //const data = req.body;
    const password = req.body.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = {
      user_name: req.body.user_name,
      password: hashedPassword,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email
    };

    const response = await mongodb.getCluster().db().collection('Users').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update_users = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // validate exist id
    const existingUser = await mongodb
      .getCluster()
      .db()
      .collection('Users')
      .findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    const password = req.body.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = {
      user_name: req.body.user_name,
      password: hashedPassword,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email
    };
    const response = await mongodb
      .getCluster()
      .db()
      .collection('Users')
      .replaceOne({ _id: userId }, data);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_users = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // validate exist id
    const existingUser = await mongodb
      .getCluster()
      .db()
      .collection('Users')
      .findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const response = await mongodb.getCluster().db().collection('Users').deleteOne({ _id: userId });
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
  getAll_users,
  getSingle_users,
  post_users,
  update_users,
  delete_users
};
