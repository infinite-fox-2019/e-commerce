const User = require('../../models/user')
const Product = require('../../models/product')

var products = [
    {
        name: "iPhone 11",
        image: "https://www.mobiledokan.co/wp-content/uploads/2019/08/Samsung-Galaxy-A50s.jpg",
        price: 500,
        stock: 10,
        brand: 'Apple'
    },
    {
        name: "Samsung NOTE 10",
        image: "https://www.mobiledokan.co/wp-content/uploads/2019/08/Samsung-Galaxy-A50s.jpg",
        price: 400,
        stock: 15,
        brand: 'Samsung'
    },
    {
        name: "Oppo R7",
        image: "https://www.mobiledokan.co/wp-content/uploads/2019/08/Samsung-Galaxy-A50s.jpg",
        price: 330,
        stock: 10,
        brand: 'Oppo'
    },
    {
        name: "iPhone XR",
        image: "https://www.mobiledokan.co/wp-content/uploads/2019/08/Samsung-Galaxy-A50s.jpg",
        price: 540,
        stock: 6,
        brand: 'Apple'

    },
    {
        name: "Samsung A80",
        image: "https://www.mobiledokan.co/wp-content/uploads/2019/08/Samsung-Galaxy-A50s.jpg",
        price: 300,
        stock: 16,
        brand: 'Samsung'
    },
    {
        name: "Xiaomi Mi 9",
        image: "https://www.mobiledokan.co/wp-content/uploads/2019/08/Samsung-Galaxy-A50s.jpg",
        price: 280,
        stock: 20,
        brand: 'Xiaomi'
    },
    {
        name: "Vivo S13",
        image: "https://www.mobiledokan.co/wp-content/uploads/2019/08/Samsung-Galaxy-A50s.jpg",
        price: 360,
        stock: 10,
        brand: 'Vivo'
    }
]

module.exports = function (done) {
    if (process.env.NODE_ENV === 'test') {
        let Rizky = {
            name: 'Rizky Ichsandy',
            email: 'rizky@gmail.com',
            password: '12345',
            role: 'buyer'
        }
        let Ghozi = {
            name: 'Maulana Ghozi',
            email: 'ghozi@gmail.com',
            password: '12345',
            role: 'admin'
        }
        User.create(Rizky)
            .then(() => {
                console.log(`User Rizky Created`)
                return User.create(Ghozi)
            })
            .then(result => {
                console.log(`User Ghozi created`)
                if (result.role == 'admin') {
                    return Product.insertMany(products)
                }
            })
            .then(results => {
                done()
            })
            .catch(done)
    }
};

