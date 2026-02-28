import { calculateBalances } from '../../helpers/expenses';
import type { Person, ExpensesResult } from '../../types/person';

// ---------------------------------------------------------------------------
// Test data builder
// ---------------------------------------------------------------------------

function person(
    name: string,
    foodExpense: number,
    drinkExpense: number,
    eats: boolean,
    drinks: boolean
): Person {
    return { name, foodExpense: String(foodExpense), drinkExpense: String(drinkExpense), eats, drinks };
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('calculateBalances — group expense calculator', () => {

    // -----------------------------------------------------------------------
    // BASE CASE: simple split between 2 people
    // -----------------------------------------------------------------------

    describe('basic split between 2 people', () => {
        test('the person who spent less pays the difference to the one who spent more', () => {
            const people: Person[] = [
                person('Ana', 500,  0, true, false),
                person('Bob', 1500, 0, true, false),
            ];

            const result: ExpensesResult = calculateBalances(people);

            // Food average: (500 + 1500) / 2 = 1000
            // Ana paid 500 → owes 500; Bob paid 1500 → is owed 500
            expect(result.foodTransactions).toEqual([
                { debtor: 'Ana', creditor: 'Bob', amount: 500 },
            ]);
            expect(result.drinkTransactions).toEqual([]);
        });
    });

    // -----------------------------------------------------------------------
    // CASE 1: Full consumer (eats AND drinks)
    // -----------------------------------------------------------------------

    describe('Full consumer — eats: true, drinks: true', () => {
        test('charged for both their food share AND drink share', () => {
            const people: Person[] = [
                // Ana paid for all the food, Bob paid for all the drinks
                person('Ana',   900, 0,   true, true),
                person('Bob',   0,   600, true, true),
                person('Carlos', 0,  0,   true, true),
            ];

            const result: ExpensesResult = calculateBalances(people);

            // Food average: 900 / 3 = 300 → Bob owes 300 to Ana, Carlos owes 300 to Ana
            expect(result.foodTransactions).toEqual([
                { debtor: 'Bob',    creditor: 'Ana', amount: 300 },
                { debtor: 'Carlos', creditor: 'Ana', amount: 300 },
            ]);

            // Drink average: 600 / 3 = 200 → Ana owes 200 to Bob, Carlos owes 200 to Bob
            expect(result.drinkTransactions).toEqual([
                { debtor: 'Ana',    creditor: 'Bob', amount: 200 },
                { debtor: 'Carlos', creditor: 'Bob', amount: 200 },
            ]);
        });
    });

    // -----------------------------------------------------------------------
    // CASE 2: Designated driver (eats only)
    // -----------------------------------------------------------------------

    describe('Designated driver — eats: true, drinks: false', () => {
        test('included in the food pool but excluded from the drink pool', () => {
            const people: Person[] = [
                person('Ana',    0,   1000, true, true),  // paid for drinks
                person('Bob',    900, 0,    true, true),  // paid for food
                person('Carlos', 0,   0,    true, false), // driver: eats only
            ];

            const result: ExpensesResult = calculateBalances(people);

            // Food pool: [Ana=0, Bob=900, Carlos=0] → average 300
            // Ana owes 300 to Bob, Carlos owes 300 to Bob
            expect(result.foodTransactions).toContainEqual({ debtor: 'Ana',    creditor: 'Bob', amount: 300 });
            expect(result.foodTransactions).toContainEqual({ debtor: 'Carlos', creditor: 'Bob', amount: 300 });

            // Drink pool: [Ana=1000, Bob=0] → Carlos NOT included
            // average 500 → Bob owes 500 to Ana
            expect(result.drinkTransactions).toEqual([
                { debtor: 'Bob', creditor: 'Ana', amount: 500 },
            ]);

            // Carlos does not appear in any drink transaction
            const drinkNames = result.drinkTransactions.flatMap(t => [t.debtor, t.creditor]);
            expect(drinkNames).not.toContain('Carlos');
        });
    });

    // -----------------------------------------------------------------------
    // CASE 3: Late arrival (drinks only)
    // -----------------------------------------------------------------------

    describe('Late arrival — eats: false, drinks: true', () => {
        test('charged only for their drink share, excluded from the food pool', () => {
            const people: Person[] = [
                person('Ana',   0,    600,  true, true),   // paid for drinks
                person('Bob',   1200, 0,    true, true),   // paid for food
                person('Diego', 0,    0,    false, true),  // late: drinks only
            ];

            const result: ExpensesResult = calculateBalances(people);

            // Food pool: [Ana=0, Bob=1200] → Diego NOT included
            // average 600 → Ana owes 600 to Bob
            expect(result.foodTransactions).toEqual([
                { debtor: 'Ana', creditor: 'Bob', amount: 600 },
            ]);

            // Diego does not appear in any food transaction
            const foodNames = result.foodTransactions.flatMap(t => [t.debtor, t.creditor]);
            expect(foodNames).not.toContain('Diego');

            // Drink pool: [Ana=600, Bob=0, Diego=0] → average 200
            // Bob owes 200 to Ana, Diego owes 200 to Ana
            expect(result.drinkTransactions).toContainEqual({ debtor: 'Bob',   creditor: 'Ana', amount: 200 });
            expect(result.drinkTransactions).toContainEqual({ debtor: 'Diego', creditor: 'Ana', amount: 200 });
        });
    });

    // -----------------------------------------------------------------------
    // CASE 4: Social guest (neither eats nor drinks)
    // -----------------------------------------------------------------------

    describe('Social guest — eats: false, drinks: false', () => {
        test('not charged for food or drinks', () => {
            const people: Person[] = [
                person('Ana', 600, 0,   true,  true),  // paid for food
                person('Bob', 0,   600, true,  true),  // paid for drinks
                person('Eve', 0,   0,   false, false), // guest
            ];

            const result: ExpensesResult = calculateBalances(people);

            // Eve must not appear in any transaction
            const allNames = [
                ...result.foodTransactions.flatMap(t => [t.debtor, t.creditor]),
                ...result.drinkTransactions.flatMap(t => [t.debtor, t.creditor]),
            ];
            expect(allNames).not.toContain('Eve');

            // The rest still settle between themselves
            expect(result.foodTransactions).toEqual([
                { debtor: 'Bob', creditor: 'Ana', amount: 300 },
            ]);
            expect(result.drinkTransactions).toEqual([
                { debtor: 'Ana', creditor: 'Bob', amount: 300 },
            ]);
        });
    });

    // -----------------------------------------------------------------------
    // CASE 5: Error protection (edge cases — division by zero)
    // -----------------------------------------------------------------------

    describe('Division-by-zero protection', () => {
        test('empty array returns empty transactions without throwing', () => {
            const result: ExpensesResult = calculateBalances([]);
            expect(result.foodTransactions).toEqual([]);
            expect(result.drinkTransactions).toEqual([]);
        });

        test('if nobody eats (eats: false), the food pool returns empty', () => {
            const people: Person[] = [
                person('Ana', 0, 500, false, true),
                person('Bob', 0, 300, false, true),
            ];

            const result: ExpensesResult = calculateBalances(people);

            expect(result.foodTransactions).toEqual([]);
            expect(result.drinkTransactions).not.toEqual([]);
        });

        test('if nobody drinks (drinks: false), the drink pool returns empty', () => {
            const people: Person[] = [
                person('Ana', 600, 0, true, false),
                person('Bob', 200, 0, true, false),
            ];

            const result: ExpensesResult = calculateBalances(people);

            expect(result.drinkTransactions).toEqual([]);
            expect(result.foodTransactions).not.toEqual([]);
        });

        test('all guests (no active pool) returns everything empty', () => {
            const people: Person[] = [
                person('Ana', 0, 0, false, false),
                person('Bob', 0, 0, false, false),
            ];

            const result: ExpensesResult = calculateBalances(people);

            expect(result.foodTransactions).toEqual([]);
            expect(result.drinkTransactions).toEqual([]);
        });
    });

    // -----------------------------------------------------------------------
    // COMPLEX CASE: mixed scenario with 3 people
    // -----------------------------------------------------------------------

    describe('Mixed scenario — food and drinks with different roles', () => {
        test('correctly calculates cross-category transactions', () => {
            const people: Person[] = [
                person('test1', 1500, 0,    true, false), // eats only, paid food
                person('test2', 1500, 0,    true, true),  // eats & drinks, paid food
                person('test3', 0,    1500, true, true),  // eats & drinks, paid drinks
            ];

            const result: ExpensesResult = calculateBalances(people);

            // Food pool: [test1=1500, test2=1500, test3=0] → average 1000
            // test3 owes 1000: 500 to test1, 500 to test2
            expect(result.foodTransactions).toEqual([
                { debtor: 'test3', creditor: 'test1', amount: 500 },
                { debtor: 'test3', creditor: 'test2', amount: 500 },
            ]);

            // Drink pool: [test2=0, test3=1500] → average 750
            // test2 owes 750 to test3
            expect(result.drinkTransactions).toEqual([
                { debtor: 'test2', creditor: 'test3', amount: 750 },
            ]);
        });
    });
});
