module.exports = {
    getToDos(db){
       return db.query('SELECT * FROM todos')
    },
    createToDo(db, toDo){
        return db.query('INSERT INTO todos (name, description, created_at) VALUES (${name}, ${description}, ${createdAt}) RETURNING *;', {
            name: toDo.name,
            description: toDo.description,
            createdAt: new Date()
        })
    }
}