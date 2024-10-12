const mongoose = require("mongoose");
const { connectionUrl } = require("../config");

const connectMongodb = async() => {
    try {
        await mongoose.connect(connectionUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000
        });
        console.log("Database connection successful");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectMongodb;