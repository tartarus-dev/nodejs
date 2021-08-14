import User from '../models/user';

export const userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next()
    })
}


export const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
  }