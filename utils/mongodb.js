// const mongoose = require("mongoose");
// const { connectionUrl } = require("../config");

// const connectMongodb = async() => {
//     try {
//         await mongoose.connect(connectionUrl, {
//             useNewUrlParser: true, 
//             useUnifiedTopology: true,
//             serverSelectionTimeoutMS: 5000,
//             connectTimeoutMS: 10000
//         });
//         console.log("Database connection successful");
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// module.exports = connectMongodb;

const mongoose = require("mongoose");
const connectionUrl = process.env.CONNECTION_URL || "mongodb://localhost:27017/yelp-comics";

const connectMongodb = async (retryCount = 5) => {
    try {
        await mongoose.connect(connectionUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000
        });
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error:", error.message);
        if (retryCount > 0) {
            console.log(`Retrying connection... Attempts left: ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
            return connectMongodb(retryCount - 1);
        } else {
            console.error("Could not connect to the database after multiple attempts.");
        }
    }
};

// Event listeners for connection events
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB successfully!");
});

module.exports = connectMongodb;