const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');

const router = express.Router();
router.post('/signup',AuthRequestValidators.validateUserAuth,UserController.create);
router.post('/user-roles',UserController.assignrole);
router.post('/signin',AuthRequestValidators.validateUserAuth,UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated)
router.get('/isAdmin',AuthRequestValidators.validateIsAdminRequest,UserController.isAdmin);
router.get('/user/:id',UserController.get);
module.exports = router;