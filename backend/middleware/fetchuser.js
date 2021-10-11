const jwt = require("jsonwebtoken");

const JWT_SECRET = "@harsh__creations";



const fetchuser = (req, res, next) => {

    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send({error: "Invalid Token!"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        next();
    } catch (error) {
        res.status(401).send({error: "Invalid Token!"});
    }
    
}

module.exports = fetchuser;