const  jwt = require('jsonwebtoken');


const auth = (req,res,next) => {
const token = req.headers.authorization;
 
if(token) {
    
    const decoded = jwt.verify(token.split(' ')[1], 'masai');
    
    if(decoded) {
        req.body.userID = decoded.userID
        req.body.username = decoded.username
        
        // console.log(req.body);
        next();

    } else {
        res.status(200).send({'msg':'login first'})
    }

} else {
    res.status(200).send({'msg':'login first'})
}


}


module.exports = {
    auth
}