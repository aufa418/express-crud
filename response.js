const response = (res, status, data, message) => {
    res.status(status).json({
        status,
        payload : data,
        message,
    })
}

module.exports = response