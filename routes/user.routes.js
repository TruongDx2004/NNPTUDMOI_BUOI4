const express = require('express');
const router = express.Router();

const { dataUser, dataRole } = require('../data/data');
const { success, error } = require('../utils/response');


// GET all users
router.get('/', (req, res) => {
    success(res, dataUser);
});

// GET user by username
router.get('/:username', (req, res) => {
    const user = dataUser.find(u => u.username === req.params.username);
    if (!user) return error(res, "User not found", 404);

    success(res, user);
});

// POST user
router.post('/', (req, res) => {

    const role = dataRole.find(r => r.id === req.body.roleId);
    if (!role) return error(res, "Role không tồn tại", 400);

    const newUser = {
        ...req.body,
        role: role,
        creationAt: new Date(),
        updatedAt: new Date()
    };

    delete newUser.roleId;

    dataUser.push(newUser);

    success(res, newUser, 201);
});

// PUT user
router.put('/:username', (req, res) => {

    const index = dataUser.findIndex(u => u.username === req.params.username);
    if (index === -1) return error(res, "User not found", 404);

    dataUser[index] = {
        ...dataUser[index],
        ...req.body,
        updatedAt: new Date()
    };

    success(res, dataUser[index]);
});

// DELETE user
router.delete('/:username', (req, res) => {

    const index = dataUser.findIndex(u => u.username === req.params.username);
    if (index === -1) return error(res, "User not found", 404);

    dataUser.splice(index, 1);

    success(res, "Deleted successfully");
});

module.exports = router;