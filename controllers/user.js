
var Users = require("./../models/user");
const jsonwebtoken = require("jsonwebtoken");
const envConfig = require('config');
const thisEnv = envConfig.get('environment');

exports.registerUser = async (req, res) => {
    try{
        let { name, email, password } = req.body;
        var new_user = new Users({
           name,
           email,
           password
        })
        let result = await new_user.save();
        if(result){
            res.status(201).send({
                success: true,
                message: "User Registered"
            })
        }
    }catch(err) {
        res.status(417).send({
            success: false,
            message: err
        })
    }
};

const userLogin = async (email, password) =>{
    const encryptData = new Users({ email,password });
    encryptData.encryptFieldsSync();
    const user = await Users.findOne({ email: encryptData.email });
    if (user) {
      if (password == user.password) {
        return user;
      }
      throw Error("Incorrect Password");
    }
    throw Error("Incorrect Email");
  };

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userLogin(email, password);
      if (user) {
        const payload = {
            sub: user._id
        }
        const signedToken = jsonwebtoken.sign(payload, thisEnv.jwtSecretKey, {
            expiresIn: thisEnv.tokenExpire,
        });
        res.status(200).send({
            success: true,
            message: "User Logged In",
            token: `bearer ${signedToken}`
              
        })
      }
    } catch (err) {
        res.status(200).send({
            success: false,
            message: err
        })
    }
  };