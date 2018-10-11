const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const toDos = require('./controller.js/toDoController')
const massive = require('massive');
require('dotenv').config();


app.use(bodyParser.json());



massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("database connected")
})
app.route('/api/to_do')
.get(toDos.read)
.post(toDos.create)


const PORT = 4000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));