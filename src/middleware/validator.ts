export const requestValidator = (schema, isArray=false) => async(req, res, next) => {
    try {
        await schema.validateAsync(!isArray ? {...req.body, ...req.params} : req.body);
        next();
    }
    catch (err) {
        res.status(400).json({ status: 400, message: err.message, object: err })
    }
}