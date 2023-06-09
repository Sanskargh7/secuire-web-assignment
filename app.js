const express=require('express');
const mongoose=require('mongoose');
const multer=require('multer');


const app=express();
app.use(express.json());
const authRoutes=require('./routes/auth')
const postRoutes=require('./routes/posts')


mongoose.connect('mongodb+srv://root:unit01@cluster0.7da2rrb.mongodb.net/assignment').then(()=>console.log('database is connected')).catch(err=>console.log(err));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,req.body)
    }
})


const upload=multer({storage:storage})
app.post('/user/upload',upload.single('file'),(req,res)=>{
    res.status(200).json("file uploaded successfully")
})

app.use('/api',authRoutes)
app.use('/api',postRoutes)


app.listen(8000);


