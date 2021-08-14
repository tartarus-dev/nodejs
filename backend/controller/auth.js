import User from '../models/user';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';


// signup
export const signup = (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save((err, user) => {
        if(err){
            res.status(400).json({
                error: 'không thể thêm user'
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json(user)
    })
}

// signin
export const signin = (req, res) => {
    // find the user base on email
    const { email, password } = req.body;
    // console.log(req.body);
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'Email không tồn tại!'
            })
        }
        // if user is found make sure email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email và passowrd không đúng!'
            })
        }
        // Tự động tạo ra một mã cùng với user và mã secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with  
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json(
            {
                token,
                user: { _id, email, name, role }
            }
        )
    })
};

//signout
export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}


//check quyen
// export const requireSignin = expressJwt({
//     secret: "nguyentuanvinh",
//     algorithms: ["HS256"], 
//     userProperty: "auth",
// });



// // isAuth
// export const isAuth = (req,res,next)=>{
//     let user = req.profile && req.auth && req.profile._id == req.auth._id;
//     if(!user){ 
//         return res.status(403).json({
//             error : "Can't Connect"
//         })
//     }
//     next();
// }


// //isAdmin
// export const isAdmin = (req,res,next)=>{
//     if(req.profile.role == 0){
//         return res.status(403).json({
//             error : "Bạn không phải là Admin!"
//         })
//     }
//     next();
// }
