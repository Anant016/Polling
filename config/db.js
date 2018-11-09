const mongoose=require('mongoose');

mongoose.Promise =global.Promise;

mongoose.connect('mongodb://anu:cool123@ds157383.mlab.com:57383/vote')
.then(()=>console.log('MongoDb Connected'))
.catch(err=>console.log(err));
