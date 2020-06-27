import React, { useEffect } from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardDeck,
  CardBody,
} from 'reactstrap';
import Spinner from '../../components/UI/Spinner';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as action from '../../store/index';
import styles from './MyExpenses.module.css';

const MyExpenses = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.getExpenses());
    console.log('dispatched');
  }, [dispatch]);

  const expenses = useSelector(
    (state) => state.expense.myExpenses,
    shallowEqual
  );
  const loading = useSelector((state) => state.expense.loading);
  // const error = useSelector((state) => state.expense.error);

  return (
    <React.Fragment>
      {loading ? <Spinner /> : null}
      {expenses.map((expense) => {
        return (
          <CardDeck className={styles.CardDeck}>
            <Card>
              <CardBody>
                <CardTitle
                  style={{
                    textAlign: 'left',
                    fontSize: '15px',
                    color: '#F15A24',
                  }}
                >
                  <strong>{expense.expenseTitle}</strong>
                </CardTitle>
                {expense.expenses.map((el) => (
                  <CardText
                    style={{ textAlign: 'center', fontFamily: 'Lucida Grande' }}
                  >
                    {el.expenseName} : {el.price}
                  </CardText>
                ))}
                <div className={styles.EDBtn}>
                  <Button style={{ marginRight: '1rem' }} color='info'>
                    Edit
                  </Button>
                  <Button color='danger'>Delete</Button>
                </div>
              </CardBody>
            </Card>
          </CardDeck>
        );
      })}
      <hr />
    </React.Fragment>
  );
};

export default MyExpenses;
