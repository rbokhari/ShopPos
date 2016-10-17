import Api from './Api';

const expenses = [];

class ExpenseApi {
  static getAllExpenses() {
    return Api.get('expense');
  }

  static saveExpense( expense ) {    
    console.info(expense);
    if (expense._id !== '0') {
      return Api.put(`expense/${expense._id}/update`, expense);
    } else {
      return Api.post('expense/create', expense);
    }
  }

  static deleteExpense( expenseId ) {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        const indexOfItemToDelete = categories.findIndex( category => {
          expense.id == expenseId;
        } );
        expenses.splice( indexOfItemToDelete, 1);
        resolve();
      }, delay);
    });
  }
  
}

export default ExpenseApi;