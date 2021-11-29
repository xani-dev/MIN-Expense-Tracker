import React from "react";

import styled from "styled-components";

//YUP is the validation library I'm using to work with Formik
import * as Yup from "yup";

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Formik, Form } from "formik";

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

const categories = [
	{ value: "clothing", label: "Clothing", id: 1},
	{ value: "eating_out", label: "Eating out", id: 2 },
	{ value: "gadgets", label: "Gadgets", id: 3 },
	{ value: "groceries", label: "Groceries", id: 4 },
	{ value: "transportation", label: "Transportation", id: 5 },
	{ value: "income", label: "Income", id: 6 },
	{ value: "other", label: "Other", id: 7 },
];

const types = [
	{ value: "expense", label: "Expense", id: 1 },
	{ value: "income", label: "Income", id: 2 },
];

const TransactionDrawer = (props) => {
    const {mode, open, onClose, transaction, addTransaction, editTransaction } = props
    const emptyFormInitialValues = {
        name: "",
        amount: "",
        date: "",
        category: "",
        type: "expense",
    }
    const transactionSchema = Yup.object().shape({
		name: Yup.string().required("Required field"),
		date: Yup.date()
			.default(() => new Date())
			.required("Required field"),
		amount: Yup.number().required("Required field"),
		category: Yup.string().required("Required field"),
		type: Yup.string().required("Required field"),
	});

return (
    <Drawer
					anchor="right"
					open={open}
					onClose={onClose}
				>
					<FormWrapper>
						<h2>{mode === 'add' ? "New" : "Edit"} Transaction</h2>
						<Formik
							initialValues={ 
								mode === 'add' ? emptyFormInitialValues : transaction
							}
							validationSchema={transactionSchema}
							onSubmit={(values, { setSubmitting }) => {
								console.log("Values submitted: " , values);
								const dbValues = {
									...values,
									category:categories.find(cat => cat.value === values.category).value,
									type:types.find(typ => typ.value === values.type).value,
								};
								console.log("dbValues: ", dbValues);
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
												id="name"
												name="name"
												label="Name"
												value={values.name}
												onChange={handleChange}
												error={touched.name && Boolean(errors.name)}
												helperText={touched.name && errors.name}
											/>
											<TextField
												fullWidth
												id="date"
												type="date"
												name="date"
												label=""
												value={values.date}
												onChange={handleChange}
												error={touched.date && Boolean(errors.date)}
												helperText={touched.date && errors.date}
											/>
											<TextField
												fullWidth
												id="amount"
												type="number"
												name="amount"
												label="Amount"
												value={values.amount}
												onChange={handleChange}
												error={touched.amount && Boolean(errors.amount)}
												helperText={touched.amount && errors.amount}
											/>
										</FieldsWrapper>
										<RadioOptionsWrapper>
											<FormControl component="fieldset">
												<FormLabel component="legend">Category</FormLabel>
												<RadioGroup
													aria-label="category"
													name="category"
													value={values.category}
													onChange={handleChange}
												>
													{categories.map((category) => (
														<FormControlLabel
															value={category.value}
															control={<Radio />}
															label={category.label}
														/>
													))}
												</RadioGroup>
											</FormControl>

											<FormControl component="fieldset">
												<FormLabel component="legend">Type</FormLabel>
												<RadioGroup
													aria-label="type"
													name="type"
													value={values.type}
													onChange={handleChange}
												>
													{types.map(({ value, label }) => (
														<FormControlLabel
															value={value}
															control={<Radio />}
															label={label}
														/>
													))}
												</RadioGroup>
											</FormControl>
										</RadioOptionsWrapper>
										<ActionsWrapper>
											<Button
												variant="outlined"
												color="primary"
												onClick={() => onClose()}
											>
												Cancel
											</Button>
											<Button
												variant="contained"
												color="primary"
												type="submit"
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

export {TransactionDrawer}