const logger = (req, res, next) => {

    let time  = new Date().getFullYear();
    if(time != 2020){
        return res.status(404).json({status:false, msg:'You dont have permission to access this routh'});
    }
    next();
}

const ready = (req, res, next) => {
    let query = req.query;
    if(query != 'query'){
        return res.status(400).json({status:false, msg: 'This query is not available'});
    }
    next();
}

module.exports = {logger, ready};