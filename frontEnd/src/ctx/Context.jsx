import React from 'react';

const MinContext = React.createContext();

const MinProvider = ({ children }) => {
	const categories = {
		clothing: 'Clothing',
		eating_out: 'Eating out',
		gadgets: 'Gadgets',
		groceries: 'Groceries',
		transportation: 'Transportation',
		income: 'Salary',
		other: 'Other',
	};

	const types = {
		expense: 'Expense',
		income: 'Income',
	};

	return (
		<MinContext.Provider value={{ categories, types }}>
			{children}
		</MinContext.Provider>
	);
};

export { MinProvider, MinContext };
