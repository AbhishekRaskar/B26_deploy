
const jwt = require("jsonwebtoken");

require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secret);
            if (decoded) {
                console.log(decoded)
                // we can create a note of particular user by using his id & he can perform CRUD operations on his note only....
                req.body.userID = decoded.userID
                req.body.user = decoded.userName
                next();
            }
            else {
                res.json({ msg: "Not Authorized" })
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    }
    else{
        res.json({ msg: "Please Login.....!" })
    }
}

module.exports = {
    auth
}