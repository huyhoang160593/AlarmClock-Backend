
const getTimeAsian = () => {
    const now = new Date()
    .toLocaleString('de-DE', { 
        hour12: false, 
        timeZone: 'Asia/Bangkok' 
    })
    console.log("The time right now is :", now);

    const splitDateTime = now.split(',')
    let date = splitDateTime[0].split('.')
    console.log(Number(date[0]) === null,date[0])
    if(Number(date[0]) === null) date = splitDateTime[0].split('/')

    const time = splitDateTime[1].split(':')

    return {
        day: Number(date[0]),
        month:Number(date[1]),
        year:Number(date[2]),
        hours:Number(time[0]),
        minutes:Number(time[1]),
        seconds:Number(time[2])
    }
}

module.exports = {
    getTimeAsian
}

