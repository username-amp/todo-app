const app = require(`./app`)
const PORT = process.env.PORT || 8000


// listen server

// testing kung naririnig
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}) 
