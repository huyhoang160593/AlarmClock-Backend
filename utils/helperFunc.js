
const getTimeAsian = () => {
    const now = new Date()
    .toLocaleString('en-GB', { 
        hour12: false, 
        timeZone: 'Asia/Bangkok' 
    })
    console.log("The time right now is :", now);

    const splitDateTime = now.split(',')
    let date = splitDateTime[0].split('/')
    const time = splitDateTime[1].split(':')
    //The time display in the heroku is different from localhost (mm/dd/yyyy from dd/mm/yyyy)
    return {
        day: Number(date[1]),
        month:Number(date[0]),
        year:Number(date[2]),
        hours:Number(time[0]),
        minutes:Number(time[1]),
        seconds:Number(time[2])
    }
}

module.exports = {
    getTimeAsian
}

