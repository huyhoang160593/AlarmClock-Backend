const formatTimeToObject = (timeString) =>{
    let timeObj = {}
    let splitTime = timeString.split(':')
    timeObj['hours'] = Number(splitTime[0])
    timeObj['minutes'] = Number(splitTime[1])
    return timeObj
}

const getTimeAsian = () => {
    const now = new Date()
    return now.toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit',  hour12: false, timeZone: 'Asia/Bangkok' })
}

module.exports = {
    formatTimeToObject,
    getTimeAsian
}

