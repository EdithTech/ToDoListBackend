import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    // console.log("Auth middleware", token);

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
    return jwt.sign(userData, process.env.JWT_SECRET_KEY);
}

export {jwtAuthMiddleware, generateToken};
