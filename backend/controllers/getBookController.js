const Book = require('../models/booksModel');
const path = require('path');

const getBooks = async (req, res) => {
    try{
        const response = await Book.findAll();
        res.status(200).json(response);
    }catch(err) {
        console.log("Erro: " + err);
    }
}

const getBooksById = async (req, res) => {
    try{
        const response = await Book.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }catch(err) {
        console.log("Erro: " + err);
    }
}


module.exports = {getBooks, getBooksById} 



