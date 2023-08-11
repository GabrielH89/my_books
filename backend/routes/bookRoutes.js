const express = require('express');
 
const {
    getBooks, getBooksById, saveBooks, updateBooks, deleteBooks
} = require("../controllers/bookControllers")
const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBooksById);
router.post("/books", saveBooks);
router.patch("/books/:id", updateBooks);
router.delete("/books/:id", deleteBooks);

module.exports = router;





