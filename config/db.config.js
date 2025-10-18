const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.URL);
        console.log(`connected db successfully`);
        return db
    } catch (error) {
        console.log( 'error from connect mongo' +error)
        process.exit(1)
    }
}

module.exports = connectDB