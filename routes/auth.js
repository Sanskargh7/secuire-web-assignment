const User=require('../models/User');
const bcrypt=require('bcrypt');
const router=require('express').Router();
const{sendEmail,generateToken,isAuth}=require('./utils')


//REGISTER the new User'
router.post('/register',async(req,res)=>{
    
    
        const email=req.body.email;
        const checkUser=await User.findOne({email:email});
        if(checkUser){
            return res.status(400).json({success:false,msg:"user already exits"})
        }else{
            try {
            const gensalt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(req.body.password,gensalt)
              const newUser=new User({
                 username:req.body.username,
                 email:email,
                 password:hashedPassword
             })
              const user=await newUser.save();
              const token=generateToken(user);
              console.log(token)
                 if(user){
                     sendEmail(email);
                     
                 }
           return  res.status(200).json({success:true,msg:"user register successfully",token:token});
         } catch (error) {
             res.status(400).json({msg:"something went wrong"})
         }
        }
       
})
router.post('/login',isAuth,async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        
        if(!user){
            res.status(400).json({msg:"wrong credential"})
        }
        else{
            return res.status(200).json({msg:"user login successfully"})

        }
    } catch (error) {
        res.json(error);
    }
})
module.exports=router;