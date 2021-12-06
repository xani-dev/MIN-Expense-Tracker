import React from "react";

const MinContext = React.createContext();

const MinProvider = ({children}) => {
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

    return (
        <MinContext.Provider value={{categories, types}}>
            {children}
        </MinContext.Provider>
    );
};

export {MinProvider, MinContext};