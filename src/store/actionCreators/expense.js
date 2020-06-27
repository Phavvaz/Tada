import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addExpenseTitle = (expenseTitle) => {
  return {
    type: actionTypes.ADD_EXPENSE_TITLE,
    expenseTitle: expenseTitle,
  };
};

export const addExpense = (id, expenseName, price) => {
  const expense = {
    id: id,
    expenseName: expenseName,
    price: price,
  };
  return {
    type: actionTypes.ADD_EXPENSE,
    expense: expense,
  };
};

export const removeExpense = (id) => {
  return {
    type: actionTypes.REMOVE_EXPENSE,
    id: id,
  };
};

export const saveExpenseBegins = () => {
  return {
    type: actionTypes.SAVE_EXPENSE_BEGINS,
  };
};

export const saveExpenseSuccess = () => {
  return {
    type: actionTypes.SAVE_EXPENSE_SUCCESS,
  };
};

export const saveExpenseFail = (error) => {
  return {
    type: actionTypes.SAVE_EXPENSE_FAIL,
    error: error,
  };
};

export const saveExpense = (expenseTitle, expenseData) => {
  return (dispatch) => {
    dispatch(saveExpenseBegins());
    const token = localStorage.getItem('token');
    const expense = {
      expenseTitle: expenseTitle,
      expenses: expenseData,
      userId: localStorage.getItem('userId'),
    };
    axios
      .post(
        'https://tada-c9999.firebaseio.com/expenses.json?auth=' + token,
        expense
      )
      .then((res) => {
        console.log(res.data);
        dispatch(saveExpenseSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(saveExpenseFail(err));
      });
  };
};

export const getExpensesBegins = () => {
  return {
    type: actionTypes.GET_EXPENSES_BEGINS,
  };
};

export const getExpensesSuccess = (expenses) => {
  return {
    type: actionTypes.GET_EXPENSES_SUCCESS,
    expenses: expenses,
  };
};

export const getExpensesFail = (err) => {
  return {
    type: actionTypes.GET_EXPENSES_FAIL,
    error: err,
  };
};

export const getExpenses = () => {
  return (dispatch) => {
    dispatch(getExpensesBegins());
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('https://tada-c9999.firebaseio.com/expenses.json' + queryParams)
      .then((res) => {
        const expenses = Object.values(res.data);
        console.log(expenses);

        dispatch(getExpensesSuccess(expenses));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getExpensesFail(error));
      });
  };
};
