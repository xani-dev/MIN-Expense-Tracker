import React from "react";

import styled from "styled-components";

//YUP is the validation library I'm using to work with Formik
import * as Yup from "yup";

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
	{ value: "salary", label: "Salary" },
	{ value: "eating out", label: "Eating out" },
	{ value: "clothes", label: "Clothes" },
	{ value: "transportation", label: "Transportation" },
	{ value: "groceries", label: "Groceries" },
	{ value: "other", label: "Other" },
];

const types = [
	{ value: "expense", label: "Expense" },
	{ value: "income", label: "Income" },
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
								console.log(JSON.stringify(values, null, 2));
								mode === 'add' 
								? addTransaction(values) 
								: editTransaction(values);
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