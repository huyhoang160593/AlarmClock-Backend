const mongoose = require('mongoose')

const alarmSchema = mongoose.Schema({
    hours:{
        type: Number,
        require:true,
    },
    minutes:{
        type: Number,
        require:true,
    },
    message:{
        type: String,
    },
    code:{
        type: String,
        require: true,
    },
    timeToExpire:{
        type: Number,
    }
})

alarmSchema.set('toJSON',{
    transform: (document,returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

alarmSchema.set('toObject',{
    transform: (document,returnObject) => {
        delete returnObject._id
        delete returnObject.message
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Alarm', alarmSchema)
