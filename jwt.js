import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  try{
    console.log("req", req.headers);
    const token = req.headers.authorization;
    // console.log("Auth middleware", token);
    if(!token){
      throw new Error("No token found")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  }catch(error){
    console.log(error);
    res.status(401).json({error: "Invalid Token"});
  }
};

const generateToken = (userData) => {
    // this will generate the token
    // userdata = > userId, role
    return jwt.sign(userData, process.env.JWT_SECRET_KEY);
}

export {jwtAuthMiddleware, generateToken};
