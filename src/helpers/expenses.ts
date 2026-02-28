import type { Person, ExpensesResult, Transfer } from '../types/person';

/**
 * Calculates the transactions needed to settle expenses within a group,
 * keeping food and drink costs as independent pools.
 *
 * Each person participates only in the pools they belong to:
 * - `eats: true`   → included in the food cost calculation
 * - `drinks: true` → included in the drink cost calculation
 * - Neither        → not charged anything (social guest)
 *
 * If no participant is active in a pool (e.g. nobody marked `eats`),
 * the function returns an empty array for that category instead of dividing by zero.
 */
export function calculateBalances(people: Person[]): ExpensesResult {
    const foodParticipants = people.filter(p => p.eats);
    const drinkParticipants = people.filter(p => p.drinks);

    return {
        foodTransactions: calculateCategory(foodParticipants, 'foodExpense'),
        drinkTransactions: calculateCategory(drinkParticipants, 'drinkExpense'),
    };
}

/**
 * Given a group of people and an expense field, calculates who owes whom
 * using a greedy algorithm: matches debtors with creditors minimizing transactions.
 *
 * Returns an empty array if there are no participants (division-by-zero protection).
 */
function calculateCategory(
    people: Person[],
    field: 'foodExpense' | 'drinkExpense'
): Transfer[] {
    if (people.length === 0) return [];

    const total = people.reduce((acc, p) => acc + Number(p[field]), 0);
    const average = total / people.length;

    const differences = people.map(person => ({
        name: person.name,
        difference: Number(person[field]) - average,
    }));

    const debtors = differences.filter(p => p.difference < 0);
    const creditors = differences.filter(p => p.difference > 0);

    const transactions: Transfer[] = [];

    debtors.forEach(debtor => {
        while (debtor.difference < 0) {
            const creditor = creditors.find(c => c.difference > 0);
            if (!creditor) break;

            const payment = Math.min(-debtor.difference, creditor.difference);

            transactions.push({
                debtor: debtor.name,
                creditor: creditor.name,
                amount: payment,
            });

            debtor.difference += payment;
            creditor.difference -= payment;
        }
    });

    return transactions;
}

export default calculateBalances;
