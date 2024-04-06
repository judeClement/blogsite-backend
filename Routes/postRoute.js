const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken') 
const posts=require('../Model/post')
router.use(express.json())


function verifyToken(req,res,next) {
    const token=req.headers.token
try {
    if(!token) throw 'unauthorized access';
    let payload=jwt.verify(token,'secretkey')
    if(!payload) throw 'unauthorized access';
    next()
} catch (error) {
    res.status(404).send('caught in error')
}
}


//to add blog

router.post('/add',verifyToken, async(req,res)=>{
try {
    const post=req.body
    const data= await posts(post).save()
    res.status(200).send({message:'blog added'})
    console.log(data)
} catch (error) {
    console.log(error)
}
})



//get
router.get('/blogs',verifyToken,async(req,res)=>{
    try {
        const data= await posts.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error fetching posts");
    }
})


//delete

router.delete('/delete/:id',verifyToken,async (req,res)=>{
    try {
        let id=req.params.id
        await posts.findByIdAndDelete(id)
        res.status(200).send({ message:"blog deleted"})
    } catch (error) {
       console.log(error) 
    }
})


module.exports=router;











// const express = require('express');
// const router = express.Router();
// const posts = require("../Model/post");


// router.use(express.json());

// //add a post

// router.post('/add', async(req,res)=>{
//     try {
//         const post = req.body;
//         const data = await posts(post).save();
//         res.status(200).send({message:"blog added"})
//         console.log(data);
//     } catch (error) {
//         console.log(error);  
//     }
// })


// //fetch data

// router.get('/posts', async (req, res) => {
//     try {
//         const allPosts = await posts.find();
//         res.status(200).send(allPosts);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error fetching posts");
//     }
// });


// //delete data

// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const deletedBlog = await posts.findByIdAndDelete(req.params.id);
//         if (!deletedBlog) {
//             return res.status(404).json({ error: "Blog post not found" });
//         }
//         res.json({ message: "Blog post deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });




// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const posts = require("../Model/post");
// router.use(express.json())


// router.use(express.json());

// //add a post

// router.post('/add', async(req,res)=>{
//     try {
//         const post = req.body;
//         const data = await posts(post).save();
//         res.status(200).send({message:"blog added"})
//         console.log(data);
//     } catch (error) {
//         console.log(error);  
//     }
// })


// //fetch data

// router.get('/blogs', async (req, res) => {
//     try {
//         const allPosts = await posts.find();
//         res.status(200).send(allPosts);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error fetching posts");
//     }
// });


// //delete data

// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const deletedBlog = await posts.findByIdAndDelete(req.params.id);
//         if (!deletedBlog) {
//             return res.status(404).json({ error: "Blog post not found" });
//         }
//         res.json({ message: "Blog post deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


// module.exports = router;

