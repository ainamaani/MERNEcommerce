const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const ProductRoutes = require('./routes/ProductRoutes');
const CartRoutes = require('./routes/CartRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const BodyParser = require('body-parser');

//middleware
app.use(cors());
app.use(BodyParser.json({ limit: '10mb' }))
app.use((req,res,next)=>{
    console.log(req.method, req.path, req.body)
    next()
})

//routes
app.use('/api/products',ProductRoutes);
app.use('/api/cart',CartRoutes);
app.use('/api/auth',AuthRoutes);


// connect to db
mongoose.connect(process.env.dbURI)
    .then(()=>{
        app.listen(process.env.PORT || 9000 ,()=>{
            console.log('Listening......');
        })
    })
    .catch((error)=>{
        console.log(error);
    })