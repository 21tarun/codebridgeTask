// Dog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Dog = sequelize.define('Dog', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tail_length: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize.sync().then(() => {
    console.log('Dog table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 


module.exports = Dog;
