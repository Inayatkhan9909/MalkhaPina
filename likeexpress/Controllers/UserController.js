
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const Registerhandler = async (req, res) => {

    try {
        const { username, password } = req.body;
        if (username && password !== "") {

            const exist = await User.findOne({ username });
            if (exist) {
                res.json({ message: "User already resgisterd" });
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = new User({ username, password: hashedPassword });
                const done = await newUser.save();
                if (done) {
                    res.json({ message: "Registration successfull" });
                }
                else {
                    res.json({ message: "Opps" });
                }

            }

        }
        else {
            res.json({ message: "fill all the fields" });
        }

    }
    catch (error) {

        res.json({ message: "something went wrong" });
    }
}

const loginhandler = async (req, res) => {
    try {

        const {username, password } = req.body;

        if (username && password !== "") {
            const exist = await User.findOne({ username });

            if (exist) {
                const passVerify = await bcrypt.compare(password, exist.password);
                if (passVerify) {
                   

                        const token = jwt.sign(
                            {
                                userId: exist._id,
                                username:exist.username,
                            },
                            "secretkey"
                        );
                        res.cookie("token", token, { httpOnly: true });

                    res.json({ message: "Logged In Successfully",token });
                } else {
                    res.json({ message: "Password Doesnot Match" });
                }
            }
            else {
                res.json({ message: "User doesnot exists"});        
            }
        }
        else {
            res.json({ message: "fill all the credentials" });
        }

    }
    catch (error) {
        console.log(error);
        res.json({ message: "Something went wrong" });
    }
}


module.exports = { Registerhandler, loginhandler }