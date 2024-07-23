// import passport from "passport";
// import { Strategy } from 'passport-local';
// import userModel from "../To Dp List/model/user.js";

// passport.use(new Strategy(async (username, passwort, done) => {
//     try{
//         console.log(username, passwort);
//         const user = await userModel.findOne({username: username});

//         if(!user){
//             console.log("Username is invalid");
//             return done(null, false, {message: "Username is invalid"});
//         }

//         const isPasswordMatched = user.comparePassword(passwort);
//         if(isPasswordMatched){
//             return done(null, user);
//         }else{
//             return done(null, false, {message: "Password is Incorrect"})
//         }
//     }catch(error){
//         console.log(error);
//     }
// }))
// // 
// export default passport;