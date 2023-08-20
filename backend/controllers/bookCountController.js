const bookModel = require('../models/booksModel');

const countBook = async (req, res) => {
    try{
        const bookCount = bookModel.count();
        res.status(200).json({msg: bookCount});
    }catch(err) {
        console.log("Erro: " + err);
    }
}

module.exports = countBook;