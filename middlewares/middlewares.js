export const isValisJson = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(409).json({succsess: false, message: 'Body must be a valid JSON'});
    }
    next();
};