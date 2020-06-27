import * as actionTypes from '../actionCreators/actionTypes';

const initialState = {
  loading: false,
  error: null,
  added: false,
  expenseTitle: '',
  id: 0 * 1,
  expenses: [],
  myExpenses: [],
  totalPrice: 0,
  saved: false,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_EXPENSE_TITLE:
      return {
        ...state,
        added: true,
        loading: false,
        saved: false,
        expenseTitle: action.expenseTitle,
      };
    case actionTypes.ADD_EXPENSE:
      return {
        ...state,
        added: true,
        loading: false,
        saved: false,
        id: state.id + 1,
        expenses: state.expenses.concat(action.expense),
        // totalPrice: localStorage.getItem('totalPrice'),
      };

    case actionTypes.REMOVE_EXPENSE:
      // const deletedexpense = state.expenses[action.id].price;
      return {
        ...state,
        loading: false,
        expenses: state.expenses.filter((expense) => {
          return expense.id !== action.id;
        }),
        // totalPrice: localStorage.getItem('totalPrice'),
      };

    case actionTypes.SAVE_EXPENSE_BEGINS:
      return {
        ...state,
        loading: true,
        saved: false,
        added: false,
        error: null,
        totalPrice: localStorage.getItem('totalPrice'),
      };
    case actionTypes.SAVE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        saved: true,
        added: true,
        error: null,
        expenses: [],
        expenseTitle: '',
      };
    case actionTypes.SAVE_EXPENSE_FAIL:
      return {
        ...state,
        loading: false,
        saved: false,
        added: false,
        error: action.error,
      };

    case actionTypes.GET_EXPENSES_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        myExpenses: action.expenses,
      };

    case actionTypes.GET_EXPENSES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        myExpenses: null,
      };

    default:
      return state;
  }
};

export default expenseReducer;
