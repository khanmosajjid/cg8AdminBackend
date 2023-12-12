const router = require("express").Router();
const historyController = require("../controllers/historyController");
const middleware = require("./middleware");

router.post("/addDepositHistory", middleware.verifyToken, historyController.addDepositHistory);
router.post(
  "/addClaimHistory",
  middleware.verifyToken,
  historyController.addClaimHistory
);
router.get("/getDepositHistory",middleware.verifyToken,historyController.getDepositHistory);
router.get(
  "/getClaimHistory",
  middleware.verifyToken,
  historyController.getClaimHistory
);


module.exports = router;
