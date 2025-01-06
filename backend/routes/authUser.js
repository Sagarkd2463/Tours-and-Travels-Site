const express = require('express');
const { register, login, googleOAuth, facebookOAuth, githubOAuth } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.post('/google', googleOAuth);
router.post('/facebook', facebookOAuth);
router.post('/github', githubOAuth);

module.exports = router;