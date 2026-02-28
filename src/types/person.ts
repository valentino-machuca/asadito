export type Person = {
    name: string;
    foodExpense: string;
    drinkExpense: string;
    eats: boolean;
    drinks: boolean;
}

export type Transfer = {
    debtor: string;
    creditor: string;
    amount: number;
}

export type ExpensesResult = {
    foodTransactions: Transfer[];
    drinkTransactions: Transfer[];
}
