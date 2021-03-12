const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const service = require('./services')

service.init();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api/auth', authRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error)
});

app.use((error,req,res,next)=>{
    console.error('error =>', error)
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
})


module.exports = app
