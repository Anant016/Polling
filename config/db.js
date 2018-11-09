const mongoose=require('mongoose');

mongoose.Promise =global.Promise;

mongoose.connect('Your db')
.then(()=>console.log('MongoDb Connected'))
.catch(err=>console.log(err));
