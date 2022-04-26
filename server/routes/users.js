const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/me', UserController.getMe);
router.get('/', UserController.getUsers);
router.post('/avatar', upload.single('image'), UserController.editAvatar);

module.exports = router;
