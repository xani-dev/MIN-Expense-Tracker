require('dotenv').config()

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

const firebase = require("./config/firebase");
const User = require('./models/User');

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.DB);

app.post('/signup', async (req, res) => {
  const {email, password} = req.body
  try {
    // Create Firebase user
    const firebaseUser = await firebase.app
    .auth()
    .createUserWithEmailAndPassword(email, password);
    // Create user in our DB, include FirebaseID
    const dbUser = await User.create({
      email:email, 
      firebaseId: firebaseUser.user.uid,
    });
    if(dbUser){
      res.status(200).json(firebaseUser);
    } else{
      res.status(404).json({ message: "Bad request"});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
  
  
  // Return new user

})

// app.get("/transactions",(req, res) => {
//   const transactions = db.get("transactions").value();
//   //    console.log('Transactions are: ', transactions);
//   res.status(200).json(transactions);
// });

// app.post("/transactions", (req, res) => {
//   console.log("Body Sent: ", req.body);
//   const { name, date, amount, category, type } = req.body;
//   const newTransaction = {
//     name,
//     date,
//     amount,
//     category,
//     type,
//     created_at: new Date(),
//     updated_at: new Date(),
//   };
//   const createdTransaction = db.get("transactions").insert(newTransaction).write();
//   res.status(201).json(createdTransaction);
// });

// app.put("/transactions/:id", (req, res) => {
//   const { id } = req.params;
//   console.log("req.body ", req.body);
//   const { name, date, amount, category, type } = req.body;
//   const updatedTransaction = db
//   .get("transactions")
//   .updateById(id, {
//     name,
//     date,
//     amount,
//     category,
//     type,
//     updated_at: new Date(),
//   }).write();
//   if (updatedTransaction) {
//    res.status(200).json(updatedTransaction);
//   } else {
//      res.status(404).json({message: "Item not found"});
//   }
// });

// app.delete("/transactions/:id", (req, res) => {
//    const { id } = req.params;
//    const deletedTransaction = db.get('transactions').removeById(id).write();
//    if (deletedTransaction) {
//       res.status(200).json(deletedTransaction)
//    } else {
//       res.status(404).json({message:"Item not found" });
//    }
// });

app.listen(process.env.PORT, () => console.log("server is listening on port 3001"));
