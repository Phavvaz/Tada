import React, { useEffect } from 'react';
import { Card, CardText, CardBody, Button, Table } from 'reactstrap';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as action from '../../store/index';
import Spinner from '../UI/Spinner';
import Styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';

const ExpenseCard = (props) => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (expenseTitle === '' ? Navigate('/AddExpense') : null);
  });
  const dispatch = useDispatch();

  const initExpenses = useSelector(
    (state) => state.expense.expenses.length > 0 * 1
  );
  const expenses = useSelector((state) => state.expense.expenses, shallowEqual);
  const expenseTitle = useSelector((state) => state.expense.expenseTitle);
  const loading = useSelector((state) => state.expense.loading);
  // const token = useSelector((state) => state.auth.idToken);
  const totalPrice = expenses
    .map((el) => el.price)
    .reduce((acc, curr) => acc + curr, 0);
  localStorage.setItem('totalPrice', totalPrice);

  // const loadingState = useSelector(
  //   (state) => state.expense.loading,
  //   shallowEqual
  // );
  return (
    <React.Fragment>
      {initExpenses ? (
        <Card className={Styles.ExpenseCard}>
          <CardBody className={Styles.ExpenseCardInfo}>
            <CardText>
              <Table size='sm' hover>
                <thead>
                  <tr>
                    <th>Expense Title:</th>
                    <strong>
                      <td style={{ color: 'blue' }}>{expenseTitle}</td>
                    </strong>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((el) => {
                    return (
                      <tr>
                        <td>
                          <strong
                            style={{ fontWeight: 'bold', color: '#F15A24' }}
                          >
                            {el.expenseName}
                          </strong>{' '}
                          : $
                          <span style={{ fontStyle: 'italic' }}>
                            {el.price}
                          </span>
                        </td>
                        <Button
                          style={{ marginTop: '0.05rem' }}
                          color='link'
                          onClick={() => dispatch(action.removeExpense(el.id))}
                        >
                          DELETE
                        </Button>
                      </tr>
                    );
                  })}
                  <tfoot>
                    <tr>
                      <th>Total Price:</th>
                      <strong>
                        <td style={{ color: 'blue' }}>$ {totalPrice}</td>
                      </strong>
                    </tr>
                  </tfoot>
                </tbody>
              </Table>
            </CardText>
          </CardBody>
        </Card>
      ) : null}
      {loading ? <Spinner /> : null}

      {initExpenses ? (
        <Button
          className={Styles.ExpenseCardBtn}
          color='success'
          onClick={() => dispatch(action.saveExpense(expenseTitle, expenses))}
        >
          Save
        </Button>
      ) : null}
    </React.Fragment>
  );
};

export default ExpenseCard;
