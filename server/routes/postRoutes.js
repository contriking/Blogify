const { Router } = require('express');

const {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost
}=require('../controllers/postControllers');

const auth = require('../middleware/auth');

const router = Router();

router.post('/',auth,createPost)
router.get('/',getPosts)
router.get('/:id',getPost)
router.get('/categories/:category',getCatPosts)
router.get('/users/:id',getUserPosts)
router.patch('/:id',auth,editPost)
router.delete('/:id',auth,deletePost)

module.exports = router