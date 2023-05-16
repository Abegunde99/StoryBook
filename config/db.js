const mongoose = require('mongoose');

const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGOURI);

        console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    } catch (err) {
        console.error(err); 
        process.exit(1);
    }
}

module.exports = connectDB;
