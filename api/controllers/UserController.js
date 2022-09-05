const UserService = require('../services/user');
const Utils = require('../utils/utils');

class UserController {
    async createUser (req, res) {
        const { first_name, last_name, email, password, phone_number } = req.body;

        if (!first_name || !last_name || !email || !password || !phone_number) return res.json({ error: "Please fill out all fields" });

        const sameEmailUser = await UserService.getUserByEmail(email);
        if (sameEmailUser) return res.json({ error: "Email already exists" });
        
        const hashedPassword = await Utils.hashPassword(password);
        
        try {
            await UserService.createUser(first_name, last_name, email, hashedPassword, phone_number);
        } catch (error) {
            return res.json({ error: "Error creating user, please try again later", err: error });
        }

        return res.status(200).json({ message: "Successfully created an account!" });
    }

    async signInUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.json({ error: "Please fill out all fields" });

        const user = await UserService.getUserByEmail(email);
        if (!user) return res.json({ error: "Email does not exist" });

        const isValidPassword = await Utils.comparePassword(password, user.password);
        if (!isValidPassword) return res.json({ error: "Password is incorrect" });

        const accessToken = await Utils.generateAccessToken(user, true);

        return res.status(200).json({ message: "Successfully signed in", accessToken });
    }

    async getAllUserEmails(req, res) {
        const users = await UserService.getAllUserEmails();

        return res.status(200).json({ users });
    }
}

module.exports = new UserController();