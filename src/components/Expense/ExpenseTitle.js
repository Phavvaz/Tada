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
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as action from '../../store/index';

// import MyExps from '../MyExpenses/MyExpenses';
// import Axios from '../../axios-expenses';

const AddExpenseTitle = (props) => {
  useEffect(() => console.log('rendered'));
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  //   const loadingState = useSelector((state) => state.auth.loading, shallowEqual);
  const ExpenseTitleSchema = Yup.object().shape({
    expenseTitle: Yup.string().required('*Expense title is Required'),
  });

  return (
    <React.Fragment>
      {' '}
      <Formik
        initialValues={{ expenseTitle: '' }}
        validationSchema={ExpenseTitleSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const expenseTitle = values.expenseTitle;
          console.log(expenseTitle);
          dispatch(action.addExpenseTitle(expenseTitle));
          Navigate('/ExpenseData');
          resetForm();
          setSubmitting(false);
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
            <div className={Styles.AddExpenseTitleForm}>
              <FormGroup row>
                <Label for='expenseTitle' sm={2} hidden>
                  Expense Title
                </Label>
                <Col sm={3}>
                  <Input
                    type='text'
                    name='expenseTitle'
                    placeholder='Expense Title?'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expenseTitle}
                    invalid={errors.expenseTitle && touched.expenseTitle}
                  />
                  <FormFeedback>{errors.expenseTitle}</FormFeedback>
                </Col>
              </FormGroup>
            </div>
            {/* <div>{loadingState ? <Spinner /> : null}</div> */}
            <Button
              type='submit'
              color='success'
              className={Styles.AddExpenseTitleBtn}
            >
              Continue
            </Button>
          </RSForm>
        )}
      </Formik>
      <nav>
        <Link to='ExpenseData'></Link>
      </nav>
      <Outlet />
    </React.Fragment>
  );
};

export default AddExpenseTitle;
