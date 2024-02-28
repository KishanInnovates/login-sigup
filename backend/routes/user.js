const express = require("express");
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
//Importing user model that created in db.js

const {User} = require("../db")

const registrationSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string().min(2),
  lastName: zod.string().min(2),
});

router.post("/signup", async (req, res) => {
    const { success } = registrationSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Invalid inputs."
        })
    }
    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    //  const hashedPassword = await bcrypt.hash(success.password, 10);

    const user = await User.create({
         email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
     res.status(201).json({ message: "User registered successfully" });
})
const signinBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success, data } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }

    const user = await User.findOne({ email: data.email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    
    if (user.password !== data.password) {
        return res.status(401).json({ message: "Incorrect password" });
    }


    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ 
        message:"you are a valid user",
        token });
});

module.exports = router;