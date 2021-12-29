require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const decodeToken = require("./middleware/auth");
const firebase = require("./config/firebase");
const User = require("./models/User");
const Transaction = require("./models/Transaction");
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.DB);

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create Firebase user
    const firebaseUser = await firebase.app
      .auth()
      .createUserWithEmailAndPassword(email, password);
    // Create user in our DB, include FirebaseID
    const dbUser = await User.create({
      email: email,
      firebaseId: firebaseUser.user.uid,
    });
    if (dbUser) {
      res.status(200).json(firebaseUser);
    } else {
      res.status(404).json({ message: "Bad request" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
  // Return new user
});

app.use(decodeToken);

app.get("/transactions", async (req, res) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    const transactions = await Transaction.find({ user: user._id });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
  }
});

app.post("/transactions", async (req, res) => {
  console.log("Body Sent: ", req.body);
  const { name, date, amount, category, type } = req.body;
  const user = await User.findOne({ firebaseId: req.user.uid });
  const newTransaction = {
    name,
    date,
    amount,
    category,
    type,
    userId: user._id,
  };
  try {
    const createdTransaction = await Transaction.create(newTransaction);
    console.log("created transaction: ", createdTransaction);
    if (createdTransaction) {
      res.status(201).json(createdTransaction);
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  console.log("updated req.body ", req.body);
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id, 
      {
      ...req.body,
    }, 
    { new: true }
    );
    if (updatedTransaction) {
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/transactions/:id", async (req, res) => {
   const { id } = req.params;
   
   try {
     const deletedTransaction = await Transaction.findByIdAndDelete(id) 
     if (deletedTransaction) {
      res.status(200).json(deletedTransaction)
   } else {
      res.status(404).json({message:"Item not found" });
   }
   } catch (error) {
     console.log(error)
   }
});

app.listen(process.env.PORT, () =>
  console.log("server is listening on port 3001")
);
