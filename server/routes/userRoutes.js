const { Router } = require('express')
const auth =require('../middleware/auth');

const {
    registerUser,
    loginUser,
    getUser,
    getAuthors,
    changeAvatar,
    editUser,
} =require('../controllers/userControllers')

const router = Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/:id',getUser);
router.get('/',getAuthors);
router.post('/change-avatar',auth,changeAvatar);
router.patch('/edit-user',auth,editUser);

module.exports = router