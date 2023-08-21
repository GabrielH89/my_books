const {Sequelize} = require('sequelize');
require('dotenv').config();
const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql' 
  });

  try{
    db.authenticate();
    console.log("Athenticated");
  }catch(err) {
    console.log("This error: " + err);
  };

module.exports = db;




