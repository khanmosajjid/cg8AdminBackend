const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Claim = require("../models/Claim");

// Example function to create a new user
const controllers = {};
controllers.login = async (req, res) => {
  try {
    const walletAddress = req.body.walletAddress;
    const updateValues = {
      balance: req.body.balance,
      totalDeposit: req.body.totalDeposit,
    };

    let user = await User.findOneAndUpdate(
      { walletAddress: walletAddress },
      { $set: updateValues },
      { new: true, upsert: true }
    );

    if (user) {
      console.log("User logged in and updated (or created):", user);
      res.status(200).json({
        message: "User logged in and updated (or created) successfully",
        user,
      });
    } else {
      user = await User.create({
        walletAddress: walletAddress,
        balance: req.body.balance || 0,
        totalDeposit: req.body.totalDeposit || 0,
        totalWithdrawn: req.body.totalWithdrawn || 0,
      });
      res.status(201).json({ message: "User created successfully", user });
    }
  } catch (error) {
    console.error("Error in loginOrCreateUser:", error);
    res.status(400).json({ message: error.message });
  }
};
controllers.getAllUsersWithDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await User.find({}); // Get all users
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        // Add deposit history
        const depositHistory = await Deposit.find({
          walletAddress: user.walletAddress,
        })

        // Add claim history
        const claimHistory = await Claim.find({
          walletAddress: user.walletAddress,
        })
      

        // Extract referrers from deposit and claim history
        const referrers = [
          ...new Set(
            [
              ...depositHistory.map((deposit) => deposit.referrer),
              ...claimHistory.map((claim) => claim.referrer),
            ].filter((referrer) => referrer)
          ), // Filter out undefined or null referrers
        ];

        return {
          ...user.toObject(),
          depositHistory,
          claimHistory,
          referrers,
        };
      })
    );

    res.status(200).json(usersWithDetails);
  } catch (error) {
    console.error("Error in getAllUsersWithDetails:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = controllers;
