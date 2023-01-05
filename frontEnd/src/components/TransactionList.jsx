import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { transactionsAPI } from '../services/transactions';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { purple } from '@mui/material/colors';

import { TransactionDrawer } from './Drawer';

import { MinContext } from '../ctx/Context';

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
	color: ${({ type }) => (type === 'expense' ? '#B77A9E' : '#3DB2BB')};
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

const TransactionsLists = () => {
	const [transactions, setTransactions] = useState([]);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [mode, setMode] = useState('add');
	const [selectedTransaction, setSelectedTransaction] = useState({});
	const [search, setSearch] = useState('');
	const [filteredTransactions, setFilteredTransactions] = useState({});

	const ctx = React.useContext(MinContext);

	const [categories, setCategories] = useState(
		Object.keys(ctx.categories).reduce((acc, category) => {
			acc[category] = { label: ctx.categories[category], checked: false };
			return acc;
		}, {})
	);

	const [types, setTypes] = useState(
		Object.keys(ctx.types).reduce((acc, type) => {
			acc[type] = { label: ctx.types[type], checked: false };
			return acc;
		}, {})
	);

	//fake timeOut loader:
	//   useEffect(() => {
	//     setTimeout(() => {
	//       setTransactions(data);
	//     }, 3000);
	//   }, []);

	// now we'll pass the data in the data array with useEffect to setTransactions

	useEffect(() => {
		const getTransactions = async () => {
			try {
				const { data, status } = await transactionsAPI.all();
				if (status === 200) {
					setTransactions(data);
				}
			} catch (error) {
				console.log('error', error);
			}
		};
		getTransactions();
	}, []);

	useEffect(() => {
		setFilteredTransactions(transactions);
	}, [transactions]);

	useEffect(() => {
		filterByName(search);
	}, [search]);

	useEffect(() => {
		filterByCategory();
	}, [categories]);

	useEffect(() => {
		filterByType();
	}, [types]);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});

	const handleDelete = async (id) => {
		try {
			const { data, status } = await transactionsAPI.delete(id);
			console.log('data: ', data);
			console.log('status: ', status);
			if (status === 200) {
				const _transactions = [...transactions].filter(
					(transaction) => transaction._id !== id
				);
				setTransactions(_transactions);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleEdit = (id) => {
		console.log('Editing transaction #', id);
		// 1. Set mode to Edit
		setMode('edit');
		// 2. Find selected transaction in Array
		const foundTransaction = transactions.find((transaction) => {
			return transaction._id === id;
		});
		// 3. setSelectedTransaction to element found, set state for it
		setSelectedTransaction({
			...foundTransaction,
			type: foundTransaction.type,
			category: foundTransaction.category,
		});
		// 4. Open Drawer with this transactions' data
		setOpenDrawer(true);
	};

	const addTransactionToList = async (transaction) => {
		const newTransaction = {
			...transaction,
		};
		console.log('new Transaction: ', newTransaction);

		try {
			const { data, status } = await transactionsAPI.create(newTransaction);
			console.log('Status: ', status);
			console.log('Data: ', data);
			if (status === 201) {
				setTransactions([...transactions, { ...data }]);
				console.log('saved to the API', newTransaction);
			}
		} catch (err) {
			console.log('err in addTransaction', err);
		}
	};

	const editTransaction = async (transaction) => {
		try {
			const { data, status } = await transactionsAPI.update(transaction);
			console.log('TRANSACTION to edit', transaction);
			if (status === 200) {
				// 1. Find transaction index to edit in array
				const transactionIndex = transactions.findIndex(
					(tr) => tr.id === transaction.id
				);
				// 2. Make copy of this transaction's state
				const _transactions = [...transactions];
				// 3. Replace transaction
				_transactions[transactionIndex] = data;
				// 4. Update transaction in array
				setTransactions(_transactions);
			}
		} catch (err) {
			console.log('error', err);
		}
	};

	const filterByName = (search) => {
		const _filteredTransactions = transactions.filter((transaction) => {
			return transaction.name.toLowerCase().includes(search.toLowerCase());
		});
		setFilteredTransactions(_filteredTransactions);
	};

	const filterByCategory = () => {
		const checked = Object.keys(categories).filter((category) => {
			return categories[category].checked;
		});

		if (checked.length === 0) {
			setFilteredTransactions(transactions);
		} else {
			console.log('No Category checked, original array:  ', transactions);
			const _filteredTransactions = transactions.filter((transaction) => {
				return categories[transaction.category].checked === true;
			});
			setFilteredTransactions(_filteredTransactions);
			console.log('_filteredTransactions: ', _filteredTransactions);
		}
	};

	const filterByType = () => {
		const checked = Object.keys(types).filter((type) => {
			return types[type].checked;
		});
		if (checked.length === 0) {
			setFilteredTransactions(transactions);
		} else {
			const _filteredTransactions = transactions.filter((transaction) => {
				return types[transaction.type].checked === true;
			});
			setFilteredTransactions(_filteredTransactions);
		}
	};
	return (
		<Container>
			{/* Search bar and +Transaction button */}
			<ActionsWrapper>
				<FormControl style={{ width: '75%' }}>
					{/* search bar functionality */}
					<Input
						id='search'
						value={search}
						startAdornment={
							<InputAdornment position='start'>
								<SearchIcon style={{ color: 'B77A9E', cursor: 'pointer' }} />
							</InputAdornment>
						}
						onChange={(event) => {
							console.log('searching for:', event.target.value);
							setSearch(event.target.value);
							filterByName(search);
						}}
					/>
				</FormControl>
				<Button
					variant='contained'
					color='primary'
					onClick={() => setOpenDrawer(true)}
				>
					{' '}
					+ Add Transaction
				</Button>
			</ActionsWrapper>

			{/* Main Table */}
			<Main>
				{/* Filter Transaction */}
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
													const newCategoriesState = {
														...categories,
														[category]: {
															...categories[category],
															checked: event.target.checked,
														},
													};
													console.log(newCategoriesState, 'newCatState');
													setCategories(newCategoriesState);
												}}
												name={category}
												sx={{
													color: purple[50],
													'&.Mui-checked': {
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
													const newTypesState = {
														...types,
														[type]: {
															...types[type],
															checked: event.target.checked,
														},
													};
													console.log(newTypesState, 'newTypeState');
													setTypes(newTypesState);
												}}
												name={type}
												sx={{
													color: purple[50],
													'&.Mui-checked': {
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

				{transactions && transactions.length > 0 ? (
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
							{/* destructuring the transactions' object properties */}
							{filteredTransactions &&
								filteredTransactions.map(
									({ _id, date, name, category, type, amount }) => {
										//console.log("category: ", category , " id: " , id);
										return (
											<tr key={_id}>
												<TableCell>
													{new Intl.DateTimeFormat('en-US').format(
														new Date(date)
													)}
												</TableCell>
												<TableCell>{name}</TableCell>
												<TableCell>{ctx.categories[category]}</TableCell>
												<TableCell>
													<Amount type={type}>
														{formatter.format(amount)}
													</Amount>
												</TableCell>
												<TableCell>
													<EditIcon
														style={{ marginRight: '16px', cursor: 'pointer' }}
														onClick={() => {
															console.log('Editing row #' + _id);
															handleEdit(_id);
														}}
													/>
													<DeleteForeverIcon
														style={{ color: 'B77A9E', cursor: 'pointer' }}
														onClick={() => {
															handleDelete(_id);
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
					'Loading...'
				)}
			</Main>
			{openDrawer && (
				<TransactionDrawer
					mode={mode}
					open={openDrawer}
					onClose={function () {
						setOpenDrawer(false);
						setMode('add');
					}}
					transaction={selectedTransaction}
					addTransaction={addTransactionToList}
					editTransaction={editTransaction}
				/>
			)}
		</Container>
	);
};

export { TransactionsLists };
