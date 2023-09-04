const mongoose = require('mongoose')

const url = 'mongodb+srv://jukaririchardson:TwentyTwenty3*@cluster0.yjrtwue.mongodb.net/'

const connectDB = (url) => {

    return mongoose.connect(url ,
         {useNewUrlParser:true,
             useCreateIndex:true,
             useFindAndModify:false, 
            useUnifiedTopology: true,
        
});

};


module.exports = connectDB
