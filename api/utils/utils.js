const md5 = require("md5");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
require('dotenv').config();

class Utils {
    hashPassword (password) {
        return md5(password);
    }

    comparePassword (password, hash) {
        return md5(password) === hash;
    }

    async generateAccessToken (user) {

        let userData = {
            id: user.id,
            name: user.first_name + " " + user.last_name,
            email: user.email,
        }

        const token = jwt.sign(userData,process.env.JWT_SECRET);
        
        return token
    }

    getStatusCode(data) {
        if(data.statusCode) {
          return data.statusCode;
        }
        return 200;
    }
}

module.exports = new Utils();