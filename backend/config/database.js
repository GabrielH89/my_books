const {Sequelize} = require('sequelize');

const db = new Sequelize('crud_books', 'root', 'gm7102@L', {
    host: 'localhost',
    dialect: 'mysql' 
  });

  try{
    db.authenticate();
    console.log("Athenticated");
  }catch(err) {
    console.log("This error: " + err);
  };

module.exports = db;




