const express = require('express');
const {getBooks, getBooksById} = require('../controllers/getBookController');
const addBooks = require('../controllers/addBookController'); 
const updateBooks = require('../controllers/updateBookController');
const deleteBooks = require('../controllers/deleteBookController');

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBooksById);
router.post("/books", addBooks);
router.put("/books/:id", updateBooks);
router.delete("/books/:id", deleteBooks);

module.exports = router;





