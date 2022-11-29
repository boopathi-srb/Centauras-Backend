const express = require("express");
const User = require("./../models/User");
const router = express.Router();


//password handler
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  let { name, email, password,year,department } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  year=year;
  department=department.trim()

  if (name == "" || email == "" || password == "" || year == ""|| department=="") {
    res.json({
      status: "FAILED",
      message: "Empty input fields",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  } else if (/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid Email entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  } else {
    //checking if already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          //user already exists
          res.json({
            status: "FAILED",
            message: "User with this Email already exist",
          });
        } else {
          //password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new user({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
              });
              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "Success",
                    message: "Sign-up successfull",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "Error while saving user",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: err
              });
            })
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occured while checking for user!",
        });
      });
  }
});

router.post("/signin", (req, res) => {
   let {email, password } = req.body;
   email = email.trim();
   password = password.trim();
   if(email==""||password==""){
    res.json({
      status: "FAILED",
      message: "Empty credentials given",
    });
   }
   else{
     //checking for users
      User.find({email}).then(data=>{
       if(data){
         //user exists
         const hashedPassword=data[0].password;
          bcrypt.compare(password,hashedPassword).then(result=>{
            if (result) {
               //password matches
              res.json({
                status: "SUCCESS",
                message: "Sign in successful",
                data: data,
               });
            } 
            else {
              res.json({
                status:"FAILED",
                 message:"Invalid Password"
              });
            }
          }).catch(err=>{
                res.json({
                 status:"FAILED",
                  message:"An error occurred while comparing password"
                })
              })
         }
         else{
          res.json({
            status:"FAILED",
            message:"Invalid credential"
          })
         }
      })
      .catch(err=>{
        res.json({
          status:"FAILED",
          message:"An error occured while checking for error"
        })
      })
    }
  }  );

module.exports = router;
