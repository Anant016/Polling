const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');

require('./config/db');

const app=express();

const poll =require('./routes/poll');

//public folder
app.use(express.static(path.join(__dirname,'public')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//cors
app.use(cors());

app.use('/poll',poll);

//start server
const port=process.env.PORT||3000 ;
app.listen(port, ()=> console.log(`Server started on port ${port}`));
