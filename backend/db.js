const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:basic12345@cluster0.fftdiyv.mongodb.net/'

const mongoDB = () => {

    mongoose.connect(mongoURI).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(`${err} Failed to connect database`);
    });
}
module.exports = mongoDB;