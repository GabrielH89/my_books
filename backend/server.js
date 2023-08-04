const express = require('express');
const port = 4000;
const cors = require('cors');
const app = express();
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "gm7102@L",
    database: "crud_products"
})

app.use(express.json());
app.use(cors());

app.get("/books", (req, res) => {
    const sqlQuery = "SELECT * FROM books";
    db.query(sqlQuery, (err, data) => {
        if(err){
            res.json(err);
        }else{
            res.json(data)
        }
    })
})

app.post("/books", (req, res) => {
    const sqlQuery = "INSERT INTO books (title, description, cover) VALUES (?, ?, ?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ];

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
})

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const sqlQuery = "SELECT * FROM books WHERE id = ?";

    db.query(sqlQuery, [bookId], (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (data.length === 0) {
                res.status(404).json({ error: "Book not found." });
            } else {
                res.json(data[0]);
            }
        }
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = 'UPDATE books SET `title` = ?, `description` = ?, `cover` = ? WHERE id = ?';

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        bookId,
    ];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (data.affectedRows === 0) {
                res.status(404).json({ error: "Book not found." });
            } else {
                res.json({ message: "Livro atualizado com sucesso." });
            }
        }
    });
});


app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [bookId], (err, data) => {
        if(err) {
            res.json(err)
        }else{
            console.log("Livro excluído com sucesso.")
        }
    })
})

app.listen(port, () => {
    console.log("Server running at port " + port)
})









