const Book = require('../models/booksModel');
const path = require('path');
const fs = require('fs');

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

const saveBooks = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const title = req.body.title;
    const image = req.files.image; 
    const description = req.body.description;
    const imageSize = image.data.length;
    const ext = path.extname(image.name); 
    const imageTitle = image.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${imageTitle}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Images" });
    }

    if (imageSize > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    image.mv(`./public/images/${imageTitle}`, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }
        try {
            await Book.create({title: title, description: description, image: imageTitle, url: url})
            //await Book.create({ title, description, imageUrl: url}); // Change this line
            res.status(201).json({ msg: "Livro adicionado com sucesso!" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({msg: "Erro ao salvar imagem"});
        }
    });
};

const updateBooks = async (req, res) => {
    const book = await Book.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!book) return res.status(404).json({ msg: "Nenhum livro encontrado. " });

    let imageTitle = book.image;
    if (req.files && req.files.image) {
        const image = req.files.image;
        const imageSize = image.data.length;
        const ext = path.extname(image.name);
        imageTitle = image.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid Images" });
        }
        if (imageSize > 5000000) {
            return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }
       
        if(fs.existsSync(`./public/images/${book.image}`)){
            const filepath = `./public/images/${book.image}`;
            fs.unlinkSync(filepath);
        }
        
        image.mv(`./public/images/${imageTitle}`, (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
        });
    }

    const title = req.body.title;
    const description = req.body.description;
    const url = `${req.protocol}://${req.get("host")}/images/${imageTitle}`;

    try {
        await Book.update(
            { title: title, description: description, image: imageTitle, url: url },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(201).json({ msg: "Livro atualizado com sucesso. " });
    } catch (err) {
        console.log("Erro: " + err);
    }
}

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

module.exports = {
    getBooks, getBooksById, saveBooks, updateBooks, deleteBooks
}


