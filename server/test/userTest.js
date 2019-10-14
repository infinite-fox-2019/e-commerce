// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const app = require('../app')
// const User = require('../models/user')
// const asert = require('assert');


// chai.use(chaiHttp)

// after(function() {
//     User.deleteMany({})
//     .then(_=>{
//         console.log('sulses delete');
//     })
//     .catch(console.log)
// })
// describe('User Test', () => {
//     describe('/register', function() {
//         let body = {
//             username: 'RizkiAiman',
//             password: 'RizkiAiman',
//             email: 'rizkiaiman@mail.com',
//             address: ''
//         }
//         chai.request(app)
//             .post('/register')
//             .send(body)
//             .end (function (err, res) {
//                 expect(err).to.be.null
//                 expect(res.body.password).to.not.equal(body.password)
//                 expect(res.body).to.have.property('username');
//                 expect(res.body).to.have.property('password');
//                 expect(res.body).to.have.property('email');
//                 expect(res.body).to.have.property('address');
//             })
//     })
//     describe('/login', function() {
//         it('test',function(){
//             let body = {
//                 username: 'ericsudhartio',
//                 password: 'sudhartioeric'
//             }
//             chai.request(app)
//                 .post('/login')
//                 .send(body)
//                 .end(function(err,res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                 })
//         })
//     })
// })
