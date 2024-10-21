const express = require('express');
const
    {
        createUser,
        getSingleUser,
        getAllUsers,
        updateUser,
        deleteUser
    } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);

router.get('/:id', getSingleUser);

router.get('/', getAllUsers);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;