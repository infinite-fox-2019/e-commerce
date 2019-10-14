const chai =  require('chai')
const chaiHttp = require ('chai-http')
const server = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

describe('User test' , () => {

  describe('POST register users', () => {
    it("Expect get all user ",(done) => {
  
      let user = {
        name: "dipadana",
        email:"dipadana@gmail.com",
        password:"123456",
        role:"user"
      }
  
      chai.request(server)
      .post("/users")
      .send(user)
      .end((err,res) => {
        // console.log(res.body)
        expect(res).have.status(201)
        expect(res.body.username).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.password).to.be.a('string')
        expect(res.body.role).to.be.a('string')
        done()
      })

    })
  })
  
  describe('POST login user', () => {
    it("Expect get token from server",(done) => {
      chai.request(server)
      .get("/books")
      .end((err,res) => {
        //console.log(res.body)
        expect(res).have.status(200)
        expect(res.body).to.be.a('object')
        done()
      })
    })
  })

})

