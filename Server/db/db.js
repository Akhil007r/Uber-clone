const { default: mongoose } = require("mongoose");
// const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then( () => {
            console.log('DB Connected Successfully')
    }).catch(err => console.error(err)
    )
}

module.exports = connectToDb