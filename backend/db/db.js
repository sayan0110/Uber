const mongoose = require('mongoose');

async function connectToDb() {
    try {
        const connectMongoose = await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB");
    } catch (err) {
        console.error("DB connection error:", err);
    }
}

module.exports = connectToDb;
