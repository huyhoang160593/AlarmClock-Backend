const alarmRouter = require('express').Router()
const AlarmMessage = require('../models/alarmMessage')
const { getTimeAsian } = require('../utils/helperFunc')

/*
    We don't need next(exception) call because library 'express-async-errors' handles everything for us
*/

alarmRouter.get('/', async(request,response) => {
    const alarmMessages = await AlarmMessage
        .find({})
    response.json(alarmMessages.map(alarmMessage => alarmMessage.toJSON()))
})

alarmRouter.get('/setup', async(req,res) => {
    res.json(getTimeAsian())
})

alarmRouter.get('/nearest', async(req,res) =>{
    const currTime = getTimeAsian()
    const alarmMessages = await AlarmMessage
        .find({})

    if(alarmMessages.length !== 0){
        let getNearestAlarm = alarmMessages
            .filter(alarm =>{
            if(alarm.hours === currTime.hours) 
                {
                    return alarm.minutes > currTime.minutes
                }
            else return alarm.hours > currTime.hours
        })
            .sort((a,b) => a.hours - b.hours || a.minutes - b.minutes)[0]

        let getEarliestAlarm = alarmMessages
            .sort((a,b) => a.hours - b.hours || a.minutes - b.minutes)[0]

        res.json(getNearestAlarm ? getNearestAlarm.toObject() : getEarliestAlarm.toObject())
    } else{
        res.status(204).end()
    }
})

alarmRouter.delete('/',async(req,res) =>{
    await AlarmMessage.deleteMany({})
    res.status(204).end()
})

alarmRouter.get('/:id', async(request, response) => {
    const alarmMessage = await AlarmMessage.findById(request.params.id)
    if(alarmMessage) {
        response.json(alarmMessage.toJSON())
    } else {
        response.status(404).end()
    }
})

alarmRouter.get('/code/:code', async(req,res) =>{
    const alarmMessage = await AlarmMessage.findOne({code: `${req.params.code}`})
    const timeToExpire = alarmMessage.timeToExpire ? alarmMessage.timeToExpire * 1000 : 10000
    if(alarmMessage) {
        res.json(alarmMessage.toJSON())
        setTimeout(async ()=>{
            await AlarmMessage.findByIdAndRemove(alarmMessage.id)
        },timeToExpire)
    } else {
        res.status(404).end()
    }
})

alarmRouter.post('/', async(request, response) => {
    const body = request.body
    const alarmMessage = new AlarmMessage({
        hours: body.hours,
        minutes: body.minutes,
        message: body.message,
        code: body.code,
        timeToExpire: body.timeToExpire
    })

    const savedAlarm = await alarmMessage.save()

    response
        .status(201)
        .json(savedAlarm.toJSON())
})

alarmRouter.delete('/:id', async(request, response) => {
    const deleteAlarm = await AlarmMessage.findById(request.params.id)
    if(deleteAlarm){
        await AlarmMessage.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
})

alarmRouter.put('/:id', async(request,response) => {
    const body = request.body
    console.log(request.body)
    const alarmMessage = {
        hours: body.hours,
        minutes: body.minutes,
        message: body.message,
        code: body.code,
        timeToExpire: body.timeToExpire
    }

    const updateAlarm = await AlarmMessage.findByIdAndUpdate(request.params.id,alarmMessage, { new: true })
    response.json(updateAlarm)
})

module.exports = alarmRouter