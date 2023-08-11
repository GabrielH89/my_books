const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Book = db.define('book', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  image: {
   type: DataTypes.STRING 
  },
  url: {
    type: DataTypes.STRING 
   }
}, {
  freezeTableName: true
});

module.exports = Book;

/*(async()=>{
    await db.sync();
})();*/








