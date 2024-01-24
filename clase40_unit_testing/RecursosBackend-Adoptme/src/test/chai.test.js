import mongoose from 'mongoose'
import User from '../dao/Users.dao.js'
import Assert from 'assert'
import chai from 'chai'

mongoose.connect('mongodb://admin:admin@127.0.0.1:27017', {dbName: 'clase40_47'})

// Modulo Nativo de Node para validar los test
const assert = Assert.strict
// Expect de chai es mas utilizado en la industria
const expect = chai.expect

describe('Testing Users Dao', () => {

    before(async function(done) {
        mongoose.connection.collections.users.drop()
        done()
    })

    after(function() {
        console.log('Done!!')
    })

    it('El dao debe poder obtener los usuarios', async () => {
        const usersDao = new User()
        const result = await usersDao.get()

        assert.strictEqual(Array.isArray(result), true)
        expect(result).to.be.deep.equal([])
    })

    it('El dao debe poder crear usuarios', async () => {
        let mockUser = {
            first_name: 'Luis',
            last_name: 'Fernandez Rocha',
            email: 'luis@google.com',
            password: 'secret'
        }

        const usersDao = new User()
        const result = await usersDao.save(mockUser)

        assert.deepStrictEqual(result.pets, [])
        expect(result.pets).to.be.equal([])
    })

    it('El dao debe poder buscar por email', async() => {
        let mockUser = {
            first_name: 'Luis',
            last_name: 'Fernandez Rocha',
            email: 'otroemail@google.com',
            password: 'secret'
        }

        const usersDao = new User()
        const result = await usersDao.save(mockUser)

        const user = await usersDao.getBy({email: 'otroemail@google.com' })

        assert.strictEqual(typeof(user), 'object')
        
    })

})