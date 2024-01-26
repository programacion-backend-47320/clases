import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')

describe('Testing Adopt Me', () => {
    describe('Test de Mascotas', () => {
        it('En endpoint POST /api/pets debera registrar una mascota', async() => {
            const petMock = {
                name: 'Firulais',
                specie: 'dog',
                birthDate: '10-10-2020'
            }

            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response

            expect(_body.payload).to.have.property('_id')
        })

        it('En endpoint /api/pets no deberia crear una mascota con datos vacios', async() => {
            const petMock = {}

            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response

            expect(ok).to.be.eq(false)
        })
    })
})

describe('Registro, Login & Current', () => {
    let cookie;
    const mockUser = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    it('Debe registar un usuario', async () => {
        const { _body } = await requester.post('/api/sessions/register').send(mockUser)
        expect(_body.payload).to.be.ok
    })

    it('Debe Loguear un user y DEVOLVER UNA COOKIE', async () => {
        const result = await requester.post('/api/sessions/login').send({
            email: mockUser.email,
            password: mockUser.password
        })

        const cookieResult = result.headers['set-cookie'][0]
        
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1].split(';')[0]
        }
        
        expect(cookie.name).to.be.ok.and.eql('coderCookie')
        expect(cookie.value).to.be.ok
    })

    it('Enviar cookie para ver el contenido del user', async () => {
        const { _body } = await requester
            .get('/api/sessions/current')
            .set('Cookie', [`${cookie.name}=${cookie.value}`])
        
        expect(_body.payload.email).to.be.eql(mockUser.email)
    })

})

describe('Test upload file', async () => {
    it('Debe subir un archivo al crear mascotas', async () => {
        const petMock = {
            name: 'Firulais',
            specie: 'dog',
            birthDate: '10-10-2020'
        }

        const result = await requester.post('/api/pets/withimage')
            .field('name', petMock.name)
            .field('specie', petMock.specie)
            .field('birthDate', petMock.birthDate)
            .attach('image', './src/test/obelisco.jpg')
        
        expect(result.status).to.be.eql(200)
        expect(result._body.payload).to.have.property('_id')
        expect(result._body.payload.image).to.be.ok
    })
})