const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{
    try {
        let token = req.headers.authorization;
        if(token){
           token = token.split(" ")[1];
           let user = jwt.verify(token , "masai");
           req.userID = user.id;
          
        }else{
            res.send("Unauthorised user")
        }
        next();
    } catch (error) {
        res.send("Unauthorised user")
    }
   
}

module.exports={
    auth
}