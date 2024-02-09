// successResponseHandler.js
const successResponseHandler = (res, data = null, status = 200) => {
    res.status(status).json({
        success: true,
        data: data,
        error: null
    });
};

// errorResponseHandler.js
const errorResponseHandler = (res, error, status = 500) => {
    console.log(error);
    res.status(error.statusCode || status).json({
        success: false,
        data: null,
        error: error.message || 'Internal Server Error',
    });
};

module.exports = { successResponseHandler, errorResponseHandler }