const express = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');


const userRoute = express.Router();

//to register user
userRoute.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  try {
      const user1 = await UserModel.findOne({ email });

    if (user1) {
      res.status(200).send({ msg: "User already exist, please login" });
    } else {
        bcrypt.hash(pass, 5, async(err, hash) => { 
            if(err){
                res.status(400).send({ err: err.message });
            }

            const user = new UserModel({...req.body, pass:hash});
            await user.save();
      
            res.status(200).send({ msg: "User Register successfull" });
      });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

//to login user
userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user1 = await UserModel.findOne({ email });

    if (user1) {
      
        bcrypt.compare(pass, user1.pass, function(err, result) {
            if(err) {
                res.status(400).send({ err: err.message });
            } 

            if(result) {
                const token = jwt.sign({ userID: user1._id, username: user1.name }, 'masai');
                res.status(200).send({ msg: "Login Sucessfull", token });

            } else {
                res.status(200).send({ msg: "Wrong credentials" });
            }

        }); 


    } else {
      

      res.status(200).send({ msg: "User Register first" });
    }

  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  userRoute,
};
