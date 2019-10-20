let arrayItem = [
  {
    name: 'Kid Art Pack',
    description: 'increase kid creativity',
    featured_image: 'https://www.artsupplies.co.uk/blog/wp-content/uploads/2018/03/kids-hamper-prize.jpg',
    stock: 6,
    price: '160000',
    tags: ['kids', 'bestseller']
  },
  {
    name: 'Van Gogh',
    description: 'for best quality paint',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61mRJKocYNL.jpg',
    stock: 6,
    price: '160000',
    tags: [ 'bestseller', 'profesional', 'paint']
  }, 
  {
    name: 'Crayola 24',
    description: 'for best quality paint',
    featured_image: 'https://target.scene7.com/is/image/Target/GUEST_6ab2dddd-e1ff-4c35-af35-ef759114048f?wid=488&hei=488&fmt=pjpeg',
    stock: 6,
    price: '160000',
    tags: ['kids']
  },
  {
    name: 'Insipiration Case',
    description: 'a bucket of crayola items for your kids inspiration on art',
    featured_image: 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/EB0CC7A492324FB48718F136A609BC1A/10288137_5_u.jpg?fit=inside|540:540',
    stock: 6,
    price: '160000',
    tags: ['kids', 'bestseller']
  },
  {
    name: 'Angelus Brush',
    description: 'for best quality paint',
    featured_image: 'https://cdn.shopify.com/s/files/1/0228/2629/products/799-Angelus-Paint-Brush-Set-2.jpg?v=1512145619',
    stock: 6,
    price: '160000',
    tags: [ 'bestseller', 'profesional', 'brush']
  }, 
  {
    name: 'Brush Aeoss',
    description: 'for best quality paint',
    featured_image: 'https://rukminim1.flixcart.com/image/704/704/j9pyaa80/paint-brush/a/f/u/paint-brushes-12-pieces-set-professional-paint-brush-round-original-imaezffenancwhvh.jpeg?q=70',
    stock: 6,
    price: '160000',
    tags: ['kids']
  },
  {
    name: 'Bates Brush',
    description: 'a bucket of crayola items for your kids inspiration on art',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/81YznSR7ztL._SX425_PIbundle-2,TopRight,0,0_AA425SH20_.jpg',
    stock: 6,
    price: '160000',
    tags: ['bestseller', 'brush']
  },
  {
    name: 'Nomad Paint',
    description: 'water color',
    featured_image: 'https://cdn.shopify.com/s/files/1/1819/5727/products/nomadcolor-portable-watercolor-kits-2652030664814_600x.jpg?v=1564540251',
    stock: 6,
    price: '160000',
    tags: [ 'bestseller', 'profesional', 'paint']
  }, 
  {
    name: 'Artezza Paint',
    description: 'for best quality paint',
    featured_image: 'https://cdn.shopify.com/s/files/1/1903/8473/products/watercolor-paint-set-of-25-watercolor-paint-arteza-355662_512x512.jpg?v=1557917503',
    stock: 6,
    price: '160000',
    tags: ['kids', 'paint']
  },
  {
    name: 'Japan Paint',
    description: 'for best quality paint',
    featured_image: 'https://cdn.shopify.com/s/files/1/1174/1558/products/CPROJ-100769-S1SD-006_2000x.jpg?v=1529926890',
    stock: 6,
    price: '160000',
    tags: [ 'bestseller', 'profesional', 'paint']
  }, 
  {
    name: 'Acrylic Reeves',
    description: 'for best quality paint',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/71e1%2BWvrTKL._SX425_.jpg',
    stock: 6,
    price: '160000',
    tags: ['kids', 'paint']
  },
  {
    name: 'Oil Reeves',
    description: 'a bucket of crayola items for your kids inspiration on art',
    featured_image: 'https://www.hobbiesandbeyond.com/wp-content/uploads/2017/09/Hobbies-and-Beyond-Reeves-oil-paints-24-.jpg',
    stock: 6,
    price: '160000',
    tags: ['kids', 'bestseller', 'paint']
  },
  {
    name: 'Poster Paint',
    description: 'for best quality paint',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/81V5JlHXkVL._SX425_.jpg',
    stock: 6,
    price: '160000',
    tags: [ 'bestseller', 'profesional', 'paint']
  }, 
  {
    name: 'Sakura Poster',
    description: 'for best quality paint',
    featured_image: 'https://static-01.daraz.pk/original/5b399e80b715cafa27ef0e90c11bd718.jpg',
    stock: 6,
    price: '160000',
    tags: ['kids', 'paint']
  },
  {
    name: 'Craft Items 1',
    description: 'a bucket of crayola items for your kids inspiration on art',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/61tY8CtbLhL.jpg',
    stock: 6,
    price: '160000',
    tags: ['kids', 'bestseller']
  },
  {
    name: 'Craft Items 2',
    description: 'water color',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/71NvzHBfhDL._SX425_.jpg',
    stock: 6,
    price: '160000',
    tags: ['kids', 'bestseller', 'profesional']
  }, 
  {
    name: 'Origami',
    description: 'for best quality paint',
    featured_image: 'https://images-na.ssl-images-amazon.com/images/I/81ZR5yiVIBL._SX425_.jpg',
    stock: 6,
    price: '160000',
    tags: ['kids']
  }
]
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/e_commerce', {
    useNewUrlParser : true , useUnifiedTopology: true , useFindAndModify : false
}, function(err){
    if(err) {
        console.log(err)
        console.log(`server isn't connect to mongodb`);
    }
    else {
        console.log('Connected!');
    }
})

const Item  = require('./models/item')

Item.insertMany(arrayItem)
.then(data=>{
  console.log(data);
})
.catch(err=>{
  console.log(err);
})