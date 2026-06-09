// run node index.js in the terminal

/**
 * Problem: Finance Dashboard Transaction Summarizer
 * 
 * Input: Array of user records with transactions
 * Output: Grouped report by category with total amounts
 */

const records = [
  { 
    user: 'alice', 
    transactions: [ 
      { id: 1, category: 'food', amount: 12.5 }, 
      { id: 2, category: 'travel', amount: 200.0 } 
    ] 
  },
  { 
    user: 'bob', 
    transactions: [ 
      { id: 3, category: 'food', amount: 45.0 }, 
      { id: 4, category: 'food', amount: 8.75 }, 
      { id: 5, category: 'utilities', amount: 60.0 } 
    ] 
  },
  { 
    user: 'carol', 
    transactions: []  // Edge case: empty transactions array
  },
  { 
    user: 'dave'  // Edge case: missing transactions property
  }
];

// -----------------------------------
// Solution
// -----------------------------------

function summarizeTransactions(records) {
  // Initialize an empty object to store category totals
  const categoryTotals = {};

  for(const record of records) {
    // Check if transactions exist and is an array
    const transactions = record.transactions || [];

    for(const transaction of transactions) {
        const {category, amount} = transaction;

        if(!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += amount;
    }
  }

  return categoryTotals;
}

const result = summarizeTransactions(records);
console.log(result);
// Expected output: { food: 66.25, travel: 200, utilities: 60 }