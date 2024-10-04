const app = require(`./app`)
const PORT = process.env.PORT || 8000


// listen server

// testingin moko bagtong
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}) 
