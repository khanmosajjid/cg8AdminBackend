const router = require("express").Router();
const userRoute=require('./userRoutes');
const historyRoute=require('./historyRoutes')
const middleware = require("./middleware");

router.use('/user',userRoute);
router.use('/history',historyRoute)


module.exports=router;