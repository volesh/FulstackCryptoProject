const {userController} = require("../controllers");
const router = require('express').Router()

router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)

module.exports = router
