if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler.js');
const index = require('./routes/index')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL,
{ 
    useUnifiedTopology: true ,
    useNewUrlParser: true,
    useFindAndModify: false
}
,(err)=>{
    if(err) console.log(err);
    else console.log(`connect to MongoDb`)
})

app.use('/',index)
app.use(errorHandler)
app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))


// module.exports = app;