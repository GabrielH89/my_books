const express = require('express');
const cors = require('cors');
const FileUpload = require('express-fileupload')
const port = 4000;
const app = express();
const bookRoute = require('./routes/bookRoutes');


const corsOptions = {
    origin: 'http://localhost:3000', // Substitua pelo seu URL de origem
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(FileUpload({}));
app.use(express.static("public"));
app.use(bookRoute)

app.listen(port, () => console.log("Server running at port " + port));




