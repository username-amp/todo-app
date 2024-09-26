const mongoose = require(`mongoose`)

// define connectionURL
const connectionURL = `mongodb://localhost:27017/todoDb`

const connectMongodb = async () => {
    try{
        await mongoose.connect(connectionURL)
        console.log(`Database connection Successfully`)
    }catch(error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectMongodb