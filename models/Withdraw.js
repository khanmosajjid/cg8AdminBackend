// models/Claim.js
const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  withdrawAmount: {
    type: Number,
    default: 0,
  },
  poolId: {
    type: Number,
    default: 0,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  withdrawDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
