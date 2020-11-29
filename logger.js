function getCurrentDayDateTime() {
    const d = new Date();
    return d.toUTCString();
}

function getCurrentDate() {
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const current_date = date + '/' + month + '/' + year;
    return current_date;
}
function info(message) {
    console.log(`${getCurrentDayDateTime()} | Info | ${message}`);
}

function error(message) {
    console.log(`${getCurrentDayDateTime()} | Error | ${message}`);
}

// Export Modules
module.exports.info = info;
module.exports.error = error;
module.exports.date = getCurrentDate;