const Book = require('../models/booksModel');
const fs = require('fs');
const path = require('path');

const deleteBooks = async (req, res) => {
    const book = await Book.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!book) return res.status(404).json({msg: "Não há livro para excluir. "});
        try{
            const filepath = `./public/images/${book.image}`;
            fs.unlinkSync(filepath);
            await Book.destroy({
                where: {
                    id: req.params.id
                }   
            })
            res.status(200).json({msg: "Livro deletado com sucesso"})
        }catch(err) {
            console.log("Erro: " + err);
        }
    
}

module.exports = deleteBooks