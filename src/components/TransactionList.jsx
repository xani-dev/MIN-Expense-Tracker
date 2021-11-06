import React, { useState, useEffect } from "react";

import styled from "styled-components";

import data from "../data";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { purple } from "@mui/material/colors";

import { TransactionDrawer } from "./Drawer";

const Table = styled.table`
  width: 80%;
  text-align: left;
  padding: 16px 0;
`;

const HeadCell = styled.td`
  padding: 16px 0;
  width: 20%;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 8px 0;
  width: 23%;
  &(:last-of-type) {
    display: flex;
    justify-content: flex-end;
    width: 8%;
  }
`;

const Amount = styled.p`
  color: ${({ type }) => (type === "expense" ? "#B77A9E" : "#3DB2BB")};
`;

const Container = styled.div`
width: 100%;
padding 64px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  width: 20%;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  padding-top: 32px;
`;

const AVAILABLE_MODES = {
  add: "add",
  edit: "edit",
  read: "read",
};

const availableCategories = [
  { value: "eating_out", label: "Eating Out" },
  { value: "clothing", label: "Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "groceries", label: "Groceries" },
  { value: "other", label: "Other" },
  { value: "salary", label: "Salary" },
];

const availableTypes = [
	{value: "expense", label:"Expense" },
	{value: "income", label:"Income" },
];

const TransactionsLists = () => {
  const [transactions, setTransactions] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [categories, setCategories] = useState(
    availableCategories.reduce((acc, category) => {
      acc[category.value] = { label: category.label, checked: false };
      return acc;
    }, {})
  );

  const [types, setTypes] = useState(availableTypes.reduce((acc, type) => {
	  acc[type.value] = {label: type.label, checked: false };
	  return acc;
  }, {})
  );

  // now we'll pass the data in the data array with useEffect to setTransactions
  useEffect(() => {
    setTimeout(() => {
      setTransactions(data);
    }, 3000);
  }, []);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    console.log("useEffect search: ", search);
    filterByName(search);
  }, [search]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const handleDelete = (id) => {
    console.log("deleting row", id);
    const _transactions = [...transactions].filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(_transactions);
  };

  const handleEdit = (id) => {
    console.log("edit transaction #", id);
    // 1. Set mode to Edit
    setMode("edit");
    // 2. Find selected transaction in Array
    const foundTransaction = transactions.find((transaction) => {
      return transaction.id === id;
    });
    // 3. setSelectedTransaction to element found, set state for it
    setSelectedTransaction(foundTransaction);
    // 4. Open Drawer with this transactions' data
    setOpenDrawer(true);
  };

  const addTransactionToList = (data) => {
    setTransactions([...transactions, { ...data }]);
  };

  const editTransaction = (data) => {
    // 1. Find transaction index to edit in array
    const transactionIndex = transactions.findIndex(
      (transaction) => transaction.id === data.id
    );
    // 2. Make copy of this transaction's state
    const _transactions = [...transactions];
    // 3. Replace transaction
    _transactions[transactionIndex] = data;
    // 4. Update transaction in array
    setTransactions(_transactions);
  };

  const filterByName = (search) => {
    console.log("Filter by name search: ", search);

    const _filteredTransactions = transactions.filter((transaction) => {
      return transaction.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredTransactions(_filteredTransactions);
  };

  return (
    <Container>
      <ActionsWrapper>
        <FormControl style={{ width: "75%" }}>
          {/* search bar functionality */}
          <Input
            id="search"
            value={search}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon style={{ color: "B77A9E", cursor: "pointer" }} />
              </InputAdornment>
            }
            onChange={(event) => {
              console.log(event.target.value);
              setSearch(event.target.value);
              filterByName(search);
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDrawer(true)}
        >
          {" "}
          + Add Transaction
        </Button>
      </ActionsWrapper>
      <Main>
        <FilterContainer>
          <h2>Filters</h2>
          <h3>Category</h3>
          {categories &&
            Object.keys(categories).map((category) => {
              return (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categories[category].checked}
                        onChange={(event) => {
							const newCategoriesState ={
								...categories,
								[category] : {
									...categories[category],
									checked: event.target.checked,
								},
							};
							console.log(newCategoriesState, "newCatState")
							setCategories(newCategoriesState);
						}}
                        name={category}
                        sx={{
                          color: purple[50],
                          "&.Mui-checked": {
                            color: purple[300],
                          },
                        }}
                      />
                    }
                    label={categories[category].label}
                  />
                </FormGroup>
              );
            })}
			<h3>Type</h3>
          {types &&
            Object.keys(types).map((type) => {
              return (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={types[type].checked}
                        onChange={(event) => {
							const newTypesState ={
								...types,
								[type] : {
									...types[type],
									checked: event.target.checked,
								},
							};
							console.log(newTypesState, "newTypeState")
							setTypes(newTypesState);
						}}
                        name={type}
                        sx={{
                          color: purple[50],
                          "&.Mui-checked": {
                            color: purple[300],
                          },
                        }}
                      />
                    }
                    label={types[type].label}
                  />
                </FormGroup>
              );
            })}
        </FilterContainer>
        {transactions.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <HeadCell>Date</HeadCell>
                <HeadCell>Name</HeadCell>
                <HeadCell>Category</HeadCell>
                <HeadCell>Amount</HeadCell>
                <HeadCell>Actions</HeadCell>
              </tr>
            </thead>
            <tbody>
              {/* here we are destructuring the transactions' object properties */}
              {filteredTransactions.map(
                ({ id, date, name, category, type, amount }) => {
                  return (
                    <tr key={id}>
                      <TableCell>{date}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{category}</TableCell>
                      <TableCell>
                        <Amount type={type}>{formatter.format(amount)}</Amount>
                      </TableCell>
                      <TableCell>
                        <EditIcon
                          style={{ marginRight: "16px", cursor: "pointer" }}
                          onClick={() => {
                            console.log("Editing row #" + id);
                            handleEdit(id);
                          }}
                        />
                        <DeleteForeverIcon
                          style={{ color: "B77A9E", cursor: "pointer" }}
                          onClick={() => {
                            handleDelete(id);
                          }}
                        />
                      </TableCell>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        ) : (
          "Loading..."
        )}
      </Main>
      {openDrawer && (
        <TransactionDrawer
          mode={mode}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          transaction={selectedTransaction}
          addTransaction={addTransactionToList}
          editTransaction={editTransaction}
        />
      )}
    </Container>
  );
};

export { TransactionsLists };
