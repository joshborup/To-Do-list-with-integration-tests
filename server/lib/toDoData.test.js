const toDoData = require('./toDoData');
const sinon = require('sinon');
const testDb = require('../../test/init');

describe('Unit tests', () => {

    describe('Create',()=> {
        it('Should pass in created at time stamp automatically', () => {
            const toDo = {
                name: 'Finish Lecture',
                description: 'Finish up the lecture without hiccups!'
            }

            const fakeDb = {
                query: sinon.mock()
                .withArgs(
                    sinon.match.string,
                    sinon.match({
                        name: toDo.name,
                        description: toDo.description,
                        createdAt: sinon.match.date
                    })
                )
            }
            return toDoData.createToDo(fakeDb, {
                name: toDo.name, 
                description: toDo.description
                }
            )

        })
    })
    
})

describe('Integration Test', () => {
    let db;

    function clearDatabase(){
        return db.query('DELETE FROM todos');
    }

    beforeAll(() => {
        return testDb.initDb().then(database => {
            db = database; 
           
        })
    });

    beforeEach(() => {
        return clearDatabase()
    })

    afterAll(() => {
        return clearDatabase()
    })

    describe('create', () => {
        it('inserts a todo into the database with a created_at date', () => {

            //create an object to test

            const toDo = {
                name: 'Finish Lecture',
                description: 'Finish up the lecture without hiccups!'
            }

            return toDoData.createToDo(db, toDo).then(myAddedToDo => {

                // check to see if we are returning a value
                expect(myAddedToDo.length).not.toEqual(0);
                
                //check to see if the object that was created is the same as the one we get back
                expect(myAddedToDo[0]).toMatchObject({
                    id: expect.any(Number),
                    created_at: expect.any(Date),
                    description: toDo.description,
                    name: toDo.name,
                })
            })
        })
    })
})

