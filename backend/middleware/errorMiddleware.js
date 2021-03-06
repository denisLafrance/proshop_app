const notFound = (req, res, next) => {
    const error = new Error(`Not found ++++++ ${req.originalUrl} +++++++`);
    res.status(404);
    next(error)
}



const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
   // console.log('hello')
    res.status(statusCode)
    res.json({
        note: `THIS IS A ${statusCode} ERROR`,
        message: err.message,
        statusCode: statusCode,
        stack: process.env.NODE.ENV === 'production' ? null : err.stack
    })
 }

 export { notFound, errorHandler}