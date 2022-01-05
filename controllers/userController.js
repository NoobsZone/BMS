const Users = require('../models/userModel');
const asyncWrapper = require('../middleware/async');



const newUser = asyncWrapper(async(req, res)=>{
    let user = await Users.findOne(
        {
            email: req.body.email
        }
    );
    if(user)
    return res.status(400).send('User Already Reegistered!');
    user = new Users(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    );
    try{
        const result = await user.save();
        res.send(result);
    }catch(err){
        const errMsgs=[];
        for (field in err.errors){
            errMsgs.push(err.errMsgs[field].message);
        }
        return res.status(400).send(errMsgs);
    }
})

module.exports={
    newUser
}
