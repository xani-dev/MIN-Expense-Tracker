const express = require("express");
const ldb = require("lowdb");
const cors = require("cors");
const app = express();
const lodashID = require("lodash-id");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = ldb(adapter);
const jwt = require('jsonwebtoken');


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

const allUsers =[
  {
    username:"Xani",
    password: "xani1",
  },
  {
    username:"Edgar",
    password: 'edgar1',
  },
  {
    username:"Anna",
    password: 'anna1',
  },
];

const accessTokenSecret = 'minAccessToken';
const refreshTokenSecret = 'minRefreshToken';

app.post('/login', (req, res) => {
  const {username, password} = req.body

  const user = allUsers.find(
    (user) => user.username === username && user.password === password
    ); 
    if(user){
      //generate Access Token
      const accessToken = jwt.sign({ username: username}, accessTokenSecret, {
        expiresIn:"30m", 
      });
      const refreshToken = jwt.sign({ username: username}, refreshTokenSecret);

      console.log("Access Token: ", accessToken);
      console.log('Refresh Token: ', refreshToken);
      res.status(200).json({accessToken, refreshToken});
    } else {
      res.status(401).json("User Not Found")
    }
});
app.listen(3001, () => console.log("server is listening on port 3001"));
