const chai =  require('chai')
const chaiHttp = require ('chai-http')
const server = require('../app')
const expect = chai.expect
const User = require('../models/user')

chai.use(chaiHttp)

describe('User test' , () => {

  before((done) => {
    User.deleteMany({})
      .then(() => {done()})
  })

  describe('POST register users', () => {

    it("expect get right data from server after register",(done) => {
      let user = {
        name: "dipadana",
        email:"dipadana@gmail.com",
        password:"123456"
      }
      chai.request(server)
      .post("/users/register")
      .send(user)
      .end((err,res) => {
        expect(res).have.status(201)
        expect(res.body.name).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.password).to.be.a('string')
        expect(res.body.role).to.be.a('string')
      })
      done()
    })

    it("throw error if register with same email", (done) => {
      let user = {
        email:"dipadana@gmail.com",
        password:"123456",
        name: "dipadana"
      }
      chai.request(server)
      .post("/users/register")
      .send(user)
      .end((err,res) => {
        expect(res).have.status(400)
      })
      done()
    })

    // it("expect get right data from server after register as admin",(done) => {
    //   User.deleteMany({})
    //     .then(() => {})
    
    //   let user = {
    //     name: "dipadana",
    //     email:"dipadana@gmail.com",
    //     password:"123456"
    //   }

    //   chai.request(server)
    //   .post("/users/register")
    //   .send(user)
    //   .end((err,res) => {
    //     expect(res).have.status(201)
    //     expect(res.body.name).to.be.a('string')
    //     expect(res.body.email).to.be.a('string')
    //     expect(res.body.password).to.be.a('string')
    //     expect(res.body.role).to.be.a('string')
    //     expect(res.body.role).to.equal('admin')
    //   })
    //   done()
    // })
  })

  describe('POST login user', () => {
    it("Expect get token from server",(done) => {

      let user = {
        email:"dipadana@gmail.com",
        password:"123456"
      }

      chai.request(server)
      .post("/users/login")
      .send(user)
      .end((err,res) => {
        expect(res).have.status(200)
        expect(res.body).to.be.a('object')
      })
      done()
    })
  })
})

