const Player = require('../../models/player')
const User = require('../../models/user');

var players = [
    {
        name: "Harry Potter",
        house: "Gryffindor",
        position: "Seeker",
    },
    {
        name: "Oliver Wood",
        house: "Gryffindor",
        position: "Goalkeeper",
    },
    {
        name: "Cho Chang",
        house: "Ravenclaw",
        position: "Chaser",
    },
    {
        name: "Cedric Diggory",
        house: "Hufflepuff",
        position: "Chaser",
    },
    {
        name: "Draco Malfoy",
        house: "Slytherin",
        position: "Chaser",
    },
    {
        name: "Terry Boot",
        house: "Ravenclaw",
        position: "Beater",
    },
    {
        name: "Marcus Flint",
        house: "Slytherin",
        position: "Beater",
    }
]

module.exports = function (done) {
    if (process.env.NODE_ENV === 'test') {


        let user = {
            email: 'rubhi@email.com',
            password: '12345678'
        }
        User.create(user)
            .then(result => {
                players.forEach(player => {
                    player.userId = result._id
                })
                return Player.insertMany(players)
            })
            .then(results => {
                done()
            })
            .catch(done)
    }
};

