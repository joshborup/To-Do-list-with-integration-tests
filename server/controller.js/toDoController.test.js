const toDoContoller = require('./toDoController');
const testDb = require('../../test/init');
const toDoData = require('../lib/toDoData');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

describe('Integration test with controller', () => {
    let db;

    function clearDataBase() {
        return db.query('DELETE FROM todos')
    }

    beforeAll(()=> {
        // sandbox.stub(console, 'error');

        return testDb.initDb().then(database => {
            db = database;
            return db.query('DELETE FROM todos')
        })
    })

    afterAll(() => {
        sandbox.restore();
    })

    beforeEach(()=> {
        return clearDataBase();
    })

    describe('Create', () => {
      it('responds with success', done =>{
        const toDo = {
            name: 'Punch Computer',
            description: 'Make sure to put fist through computer!'
        }
        
        const req = {
            app: {
                get: () => db
            },
            body: {
                name: toDo.name,
                description: toDo.description
            }
        }

        const res = {
            status: (num) => {
                expect.any(Number)
                return {
                    send: (toDoList) => {
                        expect(toDoList[0]).toMatchObject({
                            name: toDo.name,
                            description: toDo.description,
                            created_at: expect.any(Date),
                            id: expect.any(Number)
                        })
                        done()
                    }
                }
            }
        }
        return toDoContoller.create(req, res)
      })

      it('Responds with an error on a duplicate movie name', done => {

        const toDo = {
            name: 'Punch Computer',
            description: 'Make sure to put fist through computer!'
        }
        toDoData.createToDo(db, toDo).then(() => {

        
        const req = {
            app: {
                get: () => db
            },
            body: {
                name: toDo.name,
                description: toDo.description
            }
        }
    
        const res = {
            status: (num) => {
                expect(num).toBe(500);
                return {
                    send: (toDoList) => {
                        expect(toDoList).toEqual({ message: 'There was an error on the server'})
                        done()
                    }
                }
            }
        }
        return toDoContoller.create(req, res)
        })
      })
    })
})

