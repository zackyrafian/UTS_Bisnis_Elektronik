const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/add-post' , async (req, res) => {
    try {
        const { postContent } = req.body;

        const newPost = await prisma.fost.create({
             data: {
                post: postContent
             }
        });

        res.status(201).json({ 
            message : 'Post created successfully', post: postContent
        });
        
    }catch (error) { 
        console.log ('Failed to create post: ' , error);
         res.status(500).json({ 
            error : ' Failed to create post' 
         });
    }
});

router.get('/posts' , async (req, res ) => {
    try { 
        const posts = await prisma.fost.findMany();
        res.status(200).json(posts);
    } catch {
        console.error('Failed to fetch posts: ', error)
        res.status(500).json({ error: 'Failed to fetch posts'});
    }
});

router.delete('/posts' ,async (req,res ) => {

    const { postContent } = req.body;
    try {
        const post = await prisma.fost.delete({
            data: {
                post : {
                    post: postContent
                }
            }
        });
        res.status(200).json({message : ' post delete ' , post});
        console.error('Post Delete ' (post));
    } catch (error) {
        res.status(500).json({ message : 'Failed to delete post :', post})
    }
});

module.exports = router; 