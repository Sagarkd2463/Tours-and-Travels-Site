const express = require('express');
const
    {
        createUser,
        getSingleUser,
        getAllUsers,
        updateUser,
        deleteUser
    } = require('../controllers/userController');
const { verifyUser, verifyAdmin, verifyFirebaseToken } = require('../utils/verifyToken');

const router = express.Router();

router.post('/', createUser);

router.get('/:id', verifyUser, getSingleUser);

router.get('/', verifyAdmin, getAllUsers);

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

router.post("/verify-token", verifyFirebaseToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Token is valid",
        user: req.user,
    });
});

module.exports = router;