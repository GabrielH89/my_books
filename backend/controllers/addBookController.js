const Book = require('../models/booksModel');
const path = require('path');

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

module.exports = saveBooks;