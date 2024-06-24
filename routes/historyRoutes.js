const router = require("express").Router();
const historyController = require("../controllers/historyController");
const middleware = require("./middleware");

router.post("/addDepositHistory", middleware.verifyToken, historyController.addDepositHistory);
router.post(
  "/addSwapHistory",
  middleware.verifyToken,
  historyController.addSwapHistory
);
router.post(
  "/addClaimHistory",
  middleware.verifyToken,
  historyController.addClaimHistory
);
router.get("/getDepositHistory",middleware.verifyToken,historyController.getDepositHistory);
router.get(
  "/getSwapHistory",
  middleware.verifyToken,
  historyController.getSwapHistory
);
router.get(
  "/getClaimHistory",
  middleware.verifyToken,
  historyController.getClaimHistory
);

router.post("/addWithdrawHistory", historyController.addWithdrawHistory);
router.get("/getWithdrawHistory", historyController.getWithdrawHistory);


module.exports = router;
