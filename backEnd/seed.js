require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Transaction = require('./models/Transaction')

const strapiData = [
    {
        "id": "1",
        "date": "2021-10-31",
        "name": "Caramel Machiatto",
        "amount": 4.75,
        "category": {
          "id": "1",
          "value": "eating_out",
          "label": "Eating Out",
          "published_at": "2021-11-12T18:20:09.077Z",
          "created_at": "2021-11-12T18:20:04.000Z",
          "updated_at": "2021-11-12T18:41:51.814Z"
        },
        "type": {
          "id": "1",
          "value": "expense",
          "label": "Expense",
          "published_at": "2021-11-12T18:18:49.521Z",
          "created_at": "2021-11-12T18:18:41.110Z",
          "updated_at": "2021-11-12T18:18:49.530Z"
        },
        "published_at": "2021-11-12T18:34:42.266Z",
        "created_at": "2021-11-12T18:24:22.867Z",
        "updated_at": "2021-11-12T18:34:42.280Z"
      },
      {
        "id": "2",
        "date": "2021-10-14",
        "name": "Payroll",
        "amount": 25000,
        "category": {
          "id": "5",
          "value": "income",
          "label": "Income",
          "published_at": "2021-11-12T18:22:00.354Z",
          "created_at": "2021-11-12T18:21:21.248Z",
          "updated_at": "2021-11-12T21:05:07.277Z"
        },
        "type": {
          "id": "2",
          "value": "income",
          "label": "Income",
          "published_at": "2021-11-12T18:19:07.403Z",
          "created_at": "2021-11-12T18:19:05.936Z",
          "updated_at": "2021-11-12T18:19:07.412Z"
        },
        "published_at": "2021-11-12T18:35:29.707Z",
        "created_at": "2021-11-12T18:35:28.170Z",
        "updated_at": "2021-11-12T18:35:29.720Z"
      },
      {
        "id": "3",
        "date": "2021-11-04",
        "name": "Macbook Pro",
        "amount": 1800,
        "category": {
          "id": "3",
          "value": "gadgets",
          "label": "Gadgets",
          "published_at": "2021-11-12T18:21:52.401Z",
          "created_at": "2021-11-12T18:20:44.778Z",
          "updated_at": "2021-11-12T18:43:06.412Z"
        },
        "type": {
          "id": "1",
          "value": "expense",
          "label": "Expense",
          "published_at": "2021-11-12T18:18:49.521Z",
          "created_at": "2021-11-12T18:18:41.110Z",
          "updated_at": "2021-11-12T18:18:49.530Z"
        },
        "published_at": "2021-11-12T18:36:07.213Z",
        "created_at": "2021-11-12T18:36:04.404Z",
        "updated_at": "2021-11-12T18:36:07.225Z"
      },
      {
        "id": "4",
        "date": "2021-11-06",
        "name": "Running Shoes",
        "amount": 250,
        "category": {
          "id": "2",
          "value": "clothing",
          "label": "Clothing",
          "published_at": "2021-11-12T18:21:47.147Z",
          "created_at": "2021-11-12T18:20:30.232Z",
          "updated_at": "2021-11-12T18:42:19.810Z"
        },
        "type": {
          "id": "1",
          "value": "expense",
          "label": "Expense",
          "published_at": "2021-11-12T18:18:49.521Z",
          "created_at": "2021-11-12T18:18:41.110Z",
          "updated_at": "2021-11-12T18:18:49.530Z"
        },
        "published_at": "2021-11-12T18:36:42.882Z",
        "created_at": "2021-11-12T18:36:40.440Z",
        "updated_at": "2021-11-12T18:36:42.893Z"
      },
      {
        "id": "5",
        "date": "2021-11-03",
        "name": "Brunch ",
        "amount": 70,
        "category": {
          "id": "1",
          "value": "eating_out",
          "label": "Eating Out",
          "published_at": "2021-11-12T18:20:09.077Z",
          "created_at": "2021-11-12T18:20:04.000Z",
          "updated_at": "2021-11-12T18:41:51.814Z"
        },
        "type": {
          "id": "1",
          "value": "expense",
          "label": "Expense",
          "published_at": "2021-11-12T18:18:49.521Z",
          "created_at": "2021-11-12T18:18:41.110Z",
          "updated_at": "2021-11-12T18:18:49.530Z"
        },
        "published_at": "2021-11-12T18:38:05.364Z",
        "created_at": "2021-11-12T18:38:03.820Z",
        "updated_at": "2021-11-29T19:01:24.330Z"
      },
      {
        "id": "6",
        "date": "2021-11-09",
        "name": "Whole Foods",
        "amount": 123.5,
        "category": {
          "id": "4",
          "value": "groceries",
          "label": "Groceries",
          "published_at": "2021-11-12T18:21:56.734Z",
          "created_at": "2021-11-12T18:21:00.446Z",
          "updated_at": "2021-11-12T18:42:49.691Z"
        },
        "type": {
          "id": "1",
          "value": "expense",
          "label": "Expense",
          "published_at": "2021-11-12T18:18:49.521Z",
          "created_at": "2021-11-12T18:18:41.110Z",
          "updated_at": "2021-11-12T18:18:49.530Z"
        },
        "published_at": "2021-11-12T18:39:27.337Z",
        "created_at": "2021-11-12T18:39:24.653Z",
        "updated_at": "2021-11-12T18:39:27.350Z"
      },
      {
        "id": "7",
        "date": "2021-11-08",
        "name": "Coffee",
        "amount": 3.75,
        "category": {
          "id": "1",
          "value": "eating_out",
          "label": "Eating Out",
          "published_at": "2021-11-12T18:20:09.077Z",
          "created_at": "2021-11-12T18:20:04.000Z",
          "updated_at": "2021-11-12T18:41:51.814Z"
        },
        "type": {
          "id": "1",
          "value": "expense",
          "label": "Expense",
          "published_at": "2021-11-12T18:18:49.521Z",
          "created_at": "2021-11-12T18:18:41.110Z",
          "updated_at": "2021-11-12T18:18:49.530Z"
        },
        "published_at": "2021-11-12T18:40:47.332Z",
        "created_at": "2021-11-12T18:40:40.447Z",
        "updated_at": "2021-11-12T18:40:47.345Z"
      },
      {
        "id": "8",
        "date": "2021-10-29",
        "name": "Product Sales",
        "amount": 5000,
        "category": {
          "id": "5",
          "value": "income",
          "label": "Income",
          "published_at": "2021-11-12T18:22:00.354Z",
          "created_at": "2021-11-12T18:21:21.248Z",
          "updated_at": "2021-11-12T21:05:07.277Z"
        },
        "type": {
          "id": "2",
          "value": "income",
          "label": "Income",
          "published_at": "2021-11-12T18:19:07.403Z",
          "created_at": "2021-11-12T18:19:05.936Z",
          "updated_at": "2021-11-12T18:19:07.412Z"
        },
        "published_at": "2021-11-12T21:06:04.317Z",
        "created_at": "2021-11-12T21:05:55.155Z",
        "updated_at": "2021-11-12T21:06:48.629Z"
      },
      {
        "id": "34",
        "date": "2021-11-22",
        "name": "Tavern on the Green",
        "amount": 400,
        "category": {
          "id": "2",
          "value": "clothing",
          "label": "Clothing",
          "published_at": "2021-11-12T18:21:47.147Z",
          "created_at": "2021-11-12T18:20:30.232Z",
          "updated_at": "2021-11-12T18:42:19.810Z"
        },
        "type": {
          "id": "1",
          "value": "expense",
          "label": "Expense",
          "published_at": "2021-11-12T18:18:49.521Z",
          "created_at": "2021-11-12T18:18:41.110Z",
          "updated_at": "2021-11-12T18:18:49.530Z"
        },
        "published_at": "2021-11-22T20:03:24.126Z",
        "created_at": "2021-11-22T20:03:24.127Z",
        "updated_at": "2021-11-29T19:08:14.517Z"
      },
      {
        "id": "37",
        "date": "2021-11-29",
        "name": "test",
        "amount": 40000,
        "category": {
          "id": "5",
          "value": "income",
          "label": "Income",
          "published_at": "2021-11-12T18:22:00.354Z",
          "created_at": "2021-11-12T18:21:21.248Z",
          "updated_at": "2021-11-12T21:05:07.277Z"
        },
        "type": {
          "id": "2",
          "value": "income",
          "label": "Income",
          "published_at": "2021-11-12T18:19:07.403Z",
          "created_at": "2021-11-12T18:19:05.936Z",
          "updated_at": "2021-11-12T18:19:07.412Z"
        },
        "published_at": "2021-11-29T19:08:59.060Z",
        "created_at": "2021-11-29T19:08:59.062Z",
        "updated_at": "2021-11-29T19:08:59.068Z"
      }
];

mongoose
.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
.then(async (x) => {
  console.log(`Connected to Mongo! DB name: ${x.connections[0].name}`);
  const transactions = strapiData.map(transaction => {
    if(transaction.category.value && transaction.type.value) {
      return {
        name: transaction.name,
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.category.value,
        type: transaction.type.value,
        userId: mongoose.Types.ObjectId('61c24b24d35da1afeaaad376'),
      };
    }
  }).filter(x=>x)
  console.log (transactions);
  try {
    const createdTransactions = await Transaction.create(transactions);
    console.log(
      `Success! - ${createdTransactions.length} transactions created correctly`
    ); 
    mongoose.connection.close();
  } catch (error) {
    console.log(error); 
  }
})
.catch((err)=> console.log(err));
