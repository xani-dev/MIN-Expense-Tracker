import React, { useState, useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import styled from "styled-components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const FilterCriteria = ({ title, list }) => {
	return (
		<>
			<h3>{title}</h3>

			{list.map((item) => {
				return <li>{item}</li>;
			})}
		</>
	);
};

const Filters = ({ title, options }) => {
	return (
		<>
			<h2>Filters</h2>
			<ul>
				{options.map(({ title, list }) => {
					return <FilterCriteria title={title} list={list} />;
				})}
			</ul>
		</>
	);
};

const data = [
	{
		id: 0,
		date: "22/04/2021",
		name: "Coffee",
		category: "eating_out",
		amount: 4.5,
		type: "expense",
	},
	{
		id: 1,
		date: "22/04/2021",
		name: "Coffee",
		category: "eating_out",
		amount: 4.5,
		type: "expense",
	},
	{
		id: 2,
		date: "22/04/2021",

		name: "April payroll",
		category: "salary",
		amount: 25000,
		type: "income",
	},
	{
		id: 3,
		date: "22/04/2021",

		name: "Coffee",
		category: "eating_out",
		amount: 4.5,
		type: "expense",
	},
	{
		id: 4,
		date: "22/04/2021",
		name: "Coffee",
		category: "eating_out",
		amount: 4.5,
		type: "expense",
	},
	{
		id: 5,
		date: "22/04/2021",
		name: "Coffee",
		category: "eating_out",
		amount: 4.5,
		type: "expense",
	},
];

const Table = styled.table`
	width: 80%;
	text-align: left;
	padding: 64px;
`;

const HeadCell = styled.td`
	padding: 16px 0;
	width: 20%;
	font-weight: bold;
`;

const TableCell = styled.td`
	padding: 16px 0;
	width: 20%;
`;

const Amount = styled.p`
	color: ${(props) => (props.type === "expense" ? "#B77A9E" : "#3DB2BB")};
`;

function App() {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		setTransactions(data);
	}, []);

	const filterComponentData = {
		title: "Filters",
		options: [
			{ title: "Category", list: ["Dine Out", "Groceries", "Gadgets"] },
			{ title: "Type", list: ["Income", "Expense"] },
		],
	};

const handleDelete = (id) => {
  console.log("deleting row", id);
  const _transactions = [...transactions].filter(
    (transaction) => transaction.id !== id
  );
  setTransactions(_transactions);
};

	return (
		<>
			<div className="layout">
				<NavBar />
				<Table>
					<thead>
						<tr>
							<HeadCell>Date</HeadCell>
							<HeadCell>Name</HeadCell>
							<HeadCell>Category</HeadCell>
							<HeadCell>Amount</HeadCell>
							<HeadCell></HeadCell>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction) => {
							return (
								<tr key={transaction.id}>
									<TableCell>{transaction.date}</TableCell>
									<TableCell>{transaction.name}</TableCell>
									<TableCell>{transaction.category}</TableCell>
									<TableCell>
										<Amount type={transaction.type}>
											{" "}
											$ {transaction.amount}
										</Amount>
									</TableCell>
									<TableCell>
                  <EditIcon style={{marginRight:'16px' }}/>
                  <DeleteForeverIcon 
                  style={{color:'B77A9E', cursor: 'pointer' }} 
                  onClick={()=> {
                    handleDelete(transaction.id);
                  }} />
										
									</TableCell>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<Filters
					title={filterComponentData.title}
					options={filterComponentData.options}
				/>
			</div>
		</>
	);
}

export default App;
