const mongoose = require('mongoose')

async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('Connect successfully!!')
    } catch(error){
        console.log('Connect failure!!')
    }
}

module.exports = {connect}
