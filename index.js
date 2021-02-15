require('dotenv').config()
const app = require('./app')

const port = process.env.PORT || 5000

app.listen(port, function () {
    console.log(`Server has been started on ${port}`)
})