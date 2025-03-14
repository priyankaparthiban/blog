const express = require('express');
const Post = require('../models/Post');
const Tag = require('../models/Tag');

const router = express.Router();

// Get all posts with filtering, sorting, and pagination
router.get('/', async (req, res) => {
    try {
        const { keyword, tag, sort, page = 1, limit = 10 } = req.query;

        let query = {};
        if (keyword) {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { desc: { $regex: keyword, $options: 'i' } }
                ]
            };
        }

        if (tag) {
            const foundTag = await Tag.findOne({ name: tag });
            if (foundTag) {
                query.tags = foundTag._id;
            } else {
                return res.status(400).json({ message: 'Tag not found' });
            }
        }

        const posts = await Post.find(query)
            .sort(sort ? { createdAt: sort === 'asc' ? 1 : -1 } : {})
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const { title, desc, image, tags } = req.body;

        // Validate that the image is in Base64 format
        if (!/^data:image\/[a-zA-Z]+;base64,/.test(image)) {
            return res.status(400).json({ message: 'Invalid image format. Must be Base64.' });
        }

        const newPost = new Post({
            title,
            desc,
            image,
            tags: tags ? await Tag.find({ name: { $in: tags } }) : []
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;