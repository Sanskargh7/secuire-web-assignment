const Post = require('../models/Post');
const router=require('express').Router();

//CREATE POST
router.post('/posts',async(req,res)=>{
   
    const createPost=new Post({
        title:req.body.title,
        content:req.body.content,
        image:req.body.image

    })
     try {
        const savedPost=await createPost.save();
        if(savedPost){
           return res.status(200).json({success:true,msg:"post created successfully"})

        }else{
          return res.status(400).json({success:false,msg:"something went wrong"})
        }
       
    } catch (error) {
        res.json({msg:"error occured",error:error})
    }

})

module.exports=router;