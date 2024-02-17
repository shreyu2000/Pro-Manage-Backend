const ApiResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300 ? true : false,
        message: message,
        data: data
    });
};

module.exports = ApiResponse;
