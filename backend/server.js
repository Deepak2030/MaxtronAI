require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const chainId = 11155111;
const messageStorageContractABI = require("./messageStorage.json");

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(RPC_URL, chainId);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const messageStorageContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  messageStorageContractABI,
  wallet
);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Message Storage API");
});

// POST /api/message to set a new message
app.post("/api/message", async (req, res) => {
  const { message, password } = req.body;

  if (!message || !password) {
    return res
      .status(400)
      .send({ success: false, error: "Message and password are required" });
  }

  try {
    const tx = await messageStorageContract.setMessage(message, password);
    await tx.wait();
    res.status(200).send({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error("Error setting message:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// GET /api/message to get the current message
app.get("/api/message", async (req, res) => {
  const { password } = req.query;

  if (!password) {
    return res
      .status(400)
      .send({ success: false, error: "Password is required" });
  }

  try {
    const message = await messageStorageContract.getMessage(password);
    res.status(200).send({ success: true, message });
  } catch (error) {
    console.error("Error getting message:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res
    .status(500)
    .send({ success: false, error: "An unexpected error occurred" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
