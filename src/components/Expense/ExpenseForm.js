import React, { useEffect } from 'react';
import Styles from './Form.module.css';
import {
  Form as RSForm,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as action from '../../store/index';
import ExpenseCard from './ExpenseCard';
import { useSelector } from 'react-redux';
// import MyExps from '../MyExpenses/MyExpenses';
// import Axios from '../../axios-expenses';

const AddExpenseForm = (props) => {
  useEffect(() => console.log('rendered'));
  const dispatch = useDispatch();
  const id = useSelector((state) => state.expense.id);
  const ExpenseSchema = Yup.object().shape({
    expenseName: Yup.string().required('*Expense name is Required'),
    price: Yup.string().required('*Expense cannot be empty'),
  });

  return (
    <React.Fragment>
      {' '}
      <Formik
        initialValues={{ expenseName: '', price: '' }}
        validationSchema={ExpenseSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const expenseName = values.expenseName;
          const price = values.price;
          console.log(expenseName, price);
          dispatch(action.addExpense(id, expenseName, price));
          resetForm();
          // setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <RSForm tag={FormikForm} onSubmit={handleSubmit}>
            <div className={Styles.AddExpenseForm}>
              <FormGroup row>
                <Label for='expenseName' sm={2} hidden>
                  Expense Name
                </Label>
                <Col sm={3}>
                  <Input
                    type='text'
                    name='expenseName'
                    placeholder='Expense Name?'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expenseName}
                    invalid={errors.expenseName && touched.expenseName}
                  />
                  <FormFeedback>{errors.expenseName}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='price' sm={2} hidden>
                  Price
                </Label>
                <Col sm={3}>
                  <Input
                    type='number'
                    name='price'
                    placeholder='Expense Price?'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    invalid={errors.price && touched.price}
                  />
                  <FormFeedback>{errors.price}</FormFeedback>
                </Col>
              </FormGroup>
            </div>
            {/* <div>{loadingState ? <Spinner /> : null}</div> */}
            <Button
              type='submit'
              color='success'
              className={Styles.AddExpenseBtn}
            >
              Add Expense
            </Button>
          </RSForm>
        )}
      </Formik>
      <ExpenseCard />
    </React.Fragment>
  );
};

export default AddExpenseForm;
