const router = require("express").Router();
const userController = require("../controllers/userController");
const middleware = require("./middleware");

router.post('/login', middleware.verifyToken, userController.login);
router.get('/getUserDetails',middleware.verifyToken,userController.getAllUsersWithDetails);

module.exports=router