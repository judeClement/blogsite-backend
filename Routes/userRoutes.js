const express=require('express')
const router = express.Router();
const users=require("../model/user")
const jwt=require('jsonwebtoken');

router.use(express.json())

//to create signup route
router.post('/',async(req,res)=>{
    try {
        const data=req.body;
        let newUser=await users(data).save()
        console.log(newUser);
        res.status(200).send({message:"data added"})

    } catch (error) {
        console.log(error)
    }
})
// route for login
router.post(('/login'),async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;

    const user=await users.findOne({username:username})
    if(!user){
        res.json({message:'user not found'})
    }
    try {
        if(user.password===password){
            let payload={user:username,pwd:password}
            let token=jwt.sign(payload,'secretkey');
        // res.json({message:"login success",user})
        res.send({message:'login success',token:token})
        }else{
            res.json({message:"login failed"})
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports=router;