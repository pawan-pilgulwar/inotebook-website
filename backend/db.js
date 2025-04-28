const mongoose = require('mongoose');
const { connected } = require('process');

const mongooseURI = "mongodb://localhost:27017/iNoteBook"

const connectToMongo = async () => {
    mongoose.connection.on("connected", ()=>{console.log("connected")})  //Checking the connection
    const data = await mongoose.connect(mongooseURI);   // Connectto mongo database
    // console.log(data)
}

module.exports = connectToMongo;