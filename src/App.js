import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import Layout from './components/Layout/Layout';
import Styles from './container.module.css';
import LogIn from './components/Expense/LogInForm';
import SignUp from './components/Expense/SignUpForm';
import Logout from './components/Expense/LogOut';
import AddExpenseTitle from './components/Expense/ExpenseTitle';
import AddExpense from './components/Expense/ExpenseForm';
import MyExpenses from './containers/MyExpenses/MyExpenses';
import Profile from './containers/MyProfile/Profile';

import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as action from './store/index';
// import ExpenseCard from './components/Expense/ExpenseCard';

const App = (props) => {
  useEffect(() => {
    dispatch(action.authCheckState());
  });
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state.auth.idToken != null,
    shallowEqual
  );
  return (
    <Layout>
      <Container>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/logout' element={<Logout />} />
          {token ? (
            <Route path='/AddExpense' element={<AddExpenseTitle />} />
          ) : null}
          {token ? (
            <Route path='/ExpenseData' element={<AddExpense />} />
          ) : null}
          {token ? <Route path='/MyExpenses' element={<MyExpenses />} /> : null}
          {/* <Route path='Profile/*' element={<Profile />} /> */}
        </Routes>
      </Container>
    </Layout>
  );
};

export default App;
