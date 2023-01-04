import React from 'react';

import styled from 'styled-components';

//YUP is the validation library I'm using to work with Formik
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Formik, Form } from 'formik';

import { MinContext } from '../ctx/Context';

const FormWrapper = styled.div`
	padding: 16px;
	width: 380px;
	height: 100vh;
	background-color: #312440;
	color: white;
`;

const RadioOptionsWrapper = styled.div`
	display: flex;
	padding-top: 24px;
`;

const FieldsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
const ActionsWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

const TransactionDrawer = (props) => {
	const { mode, open, onClose, transaction, addTransaction, editTransaction } =
		props;

	const { categories, types } = React.useContext(MinContext);

	const emptyFormInitialValues = {
		name: '',
		amount: '',
		date: '',
		category: '',
		type: 'expense',
	};
	const transactionSchema = Yup.object().shape({
		name: Yup.string().required('Required field'),
		date: Yup.date()
			.default(() => new Date())
			.required('Required field'),
		amount: Yup.number().required('Required field'),
		category: Yup.string().required('Required field'),
		type: Yup.string().required('Required field'),
	});

	return (
		<Drawer anchor='right' open={open} onClose={onClose}>
			<FormWrapper>
				<h2>{mode === 'add' ? 'New' : 'Edit'} Transaction</h2>
				<Formik
					initialValues={mode === 'add' ? emptyFormInitialValues : transaction}
					validationSchema={transactionSchema}
					onSubmit={(values, { setSubmitting }) => {
						console.log('Values submitted: ', values);
						const dbValues = {
							...values,
							// OLD
							category: categories.find((cat) => cat.value === values.category)
								.value,
							type: types.find((typ) => typ.value === values.type).value,

							// category: Object.keys(categories).find(
							// 	(cat) => cat.value === values.category
							// ),
							// type: Object.keys(types).find((typ) => typ.value === values.type),
						};
						console.log('dbValues: ', dbValues);
						mode === 'add'
							? addTransaction(dbValues)
							: editTransaction(dbValues);
						setSubmitting(false);
						onClose();
					}}
				>
					{({
						values,
						handleChange,
						touched,
						errors,
						isValid,
						isSubmitting,
					}) => (
						<>
							<Form>
								<FieldsWrapper>
									<TextField
										fullWidth
										id='name'
										name='name'
										label='Name'
										value={values.name}
										onChange={handleChange}
										error={touched.name && Boolean(errors.name)}
										helperText={touched.name && errors.name}
									/>
									<TextField
										fullWidth
										id='date'
										type='date'
										name='date'
										label=''
										value={values.date}
										// {new Intl.DateTimeFormat("fr-CA").format(
										// 	new Date(values.date)
										//   )}
										onChange={handleChange}
										error={touched.date && Boolean(errors.date)}
										helperText={touched.date && errors.date}
									/>
									<TextField
										fullWidth
										id='amount'
										type='number'
										name='amount'
										label='Amount'
										value={values.amount}
										onChange={handleChange}
										error={touched.amount && Boolean(errors.amount)}
										helperText={touched.amount && errors.amount}
									/>
								</FieldsWrapper>
								<RadioOptionsWrapper>
									<FormControl component='fieldset'>
										<FormLabel component='legend'>Category</FormLabel>
										<RadioGroup
											aria-label='category'
											name='category'
											value={values.category}
											onChange={handleChange}
										>
											{Object.keys(categories).map((category) => (
												<FormControlLabel
													value={category}
													control={<Radio />}
													label={categories[category]}
												/>
											))}
										</RadioGroup>
									</FormControl>

									<FormControl component='fieldset'>
										<FormLabel component='legend'>Type</FormLabel>
										<RadioGroup
											aria-label='type'
											name='type'
											value={values.type}
											onChange={handleChange}
										>
											{Object.keys(types).map((type) => (
												<FormControlLabel
													value={type}
													control={<Radio />}
													label={types[type]}
												/>
											))}
										</RadioGroup>
									</FormControl>
								</RadioOptionsWrapper>
								<ActionsWrapper>
									<Button
										variant='outlined'
										color='primary'
										onClick={() => onClose()}
									>
										Cancel
									</Button>
									<Button
										variant='contained'
										color='primary'
										type='submit'
										disabled={!isValid || isSubmitting}
									>
										Save
									</Button>
								</ActionsWrapper>
							</Form>
						</>
					)}
				</Formik>
			</FormWrapper>
		</Drawer>
	);
};

export { TransactionDrawer };
