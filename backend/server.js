const express = require('express');
const cors = require('cors');
const FileUpload = require('express-fileupload')
const port = 4000;
const app = express();
const bookRoute = require('./routes/bookRoutes');
  
app.use(cors());
app.use(express.json());
app.use(FileUpload({}));
app.use(express.static("public"));
app.use(bookRoute)

app.listen(port, () => console.log("Server running at port " + port));




