const mongoose = require('mongoose')

async function connect() {
   try {
      await mongoose.connect('mongodb+srv://conkgyt:Anhnam9ce@cluster0.r5l5x.mongodb.net/DB_Blog?retryWrites=true&w=majority', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true
       });
       console.log('Successful Connection!')
   } catch (error) {
      console.log('Fail Connection!')                                               
   }
}

module.exports = { connect }