// const config = {
//     db: {
//         connection: process.env.DB_CONNECTION || "mongodb://localhost:27017/yelp-comics"
//     }
// }

// module.exports = config;

const { 
    PORT,
    CONNECTION_URL,
} = process.env;

module.exports = { 
    port: PORT,
    connectionUrl: CONNECTION_URL,
};