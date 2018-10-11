const toDoData = require('../lib/toDoData');


module.exports = {
    read: (req, res) => {

        const db = req.app.get('db');

        toDoData.getToDos(db).then((response) => {
            res.send(response)
        })
    },
    create: (req, res) => {

        const db = req.app.get('db');

        toDoData.createToDo(db, req.body).then(response => {
                res.status(200).send(response)
        }).catch(err => {
            res.status(500).send({ message: 'There was an error on the server' })
        })
    }
}