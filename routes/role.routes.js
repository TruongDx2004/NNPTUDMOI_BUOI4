const express = require('express');
const router = express.Router();

const { dataRole, dataUser } = require('../data/data');
const { success, error } = require('../utils/response');


// GET all roles
router.get('/', (req, res) => {
    success(res, dataRole);
});

// GET role by id
router.get('/:id', (req, res) => {
    const role = dataRole.find(r => r.id === req.params.id);
    if (!role) return error(res, "Role not found", 404);

    success(res, role);
});

// POST role
router.post('/', (req, res) => {

    const newRole = {
        ...req.body,
        creationAt: new Date(),
        updatedAt: new Date()
    };

    dataRole.push(newRole);
    success(res, newRole, 201);
});

// PUT role
router.put('/:id', (req, res) => {

    const index = dataRole.findIndex(r => r.id === req.params.id);
    if (index === -1) return error(res, "Role not found", 404);

    dataRole[index] = {
        ...dataRole[index],
        ...req.body,
        updatedAt: new Date()
    };

    success(res, dataRole[index]);
});

// DELETE role
router.delete('/:id', (req, res) => {

    const index = dataRole.findIndex(r => r.id === req.params.id);
    if (index === -1) return error(res, "Role not found", 404);

    dataRole.splice(index, 1);
    success(res, "Deleted successfully");
});


// GET users by role id  (/roles/:id/users)
router.get('/:id/users', (req, res) => {

    const users = dataUser.filter(u => u.role.id === req.params.id);
    success(res, users);
});

module.exports = router;