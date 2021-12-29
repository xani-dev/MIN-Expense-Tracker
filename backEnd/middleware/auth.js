
const firebase = require('../config/firebase');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization){
        res.status(403).json({ message: "Unauthorized, no token provided"}); 
    }
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decodeValue = await firebase.admin.auth().verifyIdToken(token)
        if(decodeValue){
            req.user = decodeValue
            console.log('TOKEN: ', token)
            return next()
        }
        res.status(403).json({ message: "Unauthorized"});
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
    }
}