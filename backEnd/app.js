const express = require("express");
const ldb = require("lowdb");
const cors = require("cors");
const app = express();
const lodashID = require("lodash-id");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = ldb(adapter);


db._.mixin(lodashID);
db.defaults({ transactions: [] }).write();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/transactions",(req, res) => {
  const transactions = db.get("transactions").value();
  //    console.log('Transactions are: ', transactions);
  res.status(200).json(transactions);
});

app.post("/transactions", (req, res) => {
  console.log("Body Sent: ", req.body);
  const { name, date, amount, category, type } = req.body;
  const newTransaction = {
    name,
    date,
    amount,
    category,
    type,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const createdTransaction = db.get("transactions").insert(newTransaction).write();
  res.status(201).json(createdTransaction);
});

app.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  console.log("req.body ", req.body);
  const { name, date, amount, category, type } = req.body;
  const updatedTransaction = db
  .get("transactions")
  .updateById(id, {
    name,
    date,
    amount,
    category,
    type,
    updated_at: new Date(),
  }).write();
  if (updatedTransaction) {
   res.status(200).json(updatedTransaction);
  } else {
     res.status(404).json({message: "Item not found"});
  }
});

app.delete("/transactions/:id", (req, res) => {
   const { id } = req.params;
   const deletedTransaction = db.get('transactions').removeById(id).write();
   if (deletedTransaction) {
      res.status(200).json(deletedTransaction)
   } else {
      res.status(404).json({message:"Item not found" });
   }
});

app.listen(3001, () => console.log("server is listening on port 3001"));
