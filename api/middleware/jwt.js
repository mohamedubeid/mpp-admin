const jwt = require("jsonwebtoken");
const User = require("../services/user");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.json({ error: "Please sign in to continue" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.json({ error: "Please sign in to continue" });

        req.user = user;

        User.getUser(user.id).then(user => {
            req.user = user;
        }).catch(err => {
            if (err) return res.json({ error: "Please sign in to continue" });
        });
        next();
    });
}

module.exports = authenticate