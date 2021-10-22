function log(info) {
    if (process.env.NODE_ENV === 'development') {
        console.info(info)
    }
}

module.exports = {
    log
}