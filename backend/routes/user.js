const express = require('express');
const
    {
        createUser,
        getSingleUser,
        getAllUsers,
        updateUser,
        deleteUser
    } = require('../controllers/userController');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

router.post('/', createUser);

router.get('/:id', verifyUser, getSingleUser);

router.get('/', verifyAdmin, getAllUsers);

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

module.exports = router;