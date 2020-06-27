import React from 'react';
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
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as action from '../../store/index';
import Spinner from '../UI/Spinner';

const LogInForm = (props) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.auth.loading, shallowEqual);
  const EmailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('*Email is Required')
      .matches(EmailReg, '*Invalid Email address'),
    password: Yup.string().required('*password is required'),
  });
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const email = values.email;
        const password = values.password;
        console.log(email, password);
        dispatch(action.authConfirm(email, password));
        setTimeout(() => Navigate('/AddExpense'), 3000);
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
          <div className={Styles.LoginForm}>
            <FormGroup row>
              <Label for='email' sm={2} hidden>
                Email
              </Label>
              <Col sm={3}>
                <Input
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  invalid={errors.email && touched.email}
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='password' sm={2} hidden>
                Password
              </Label>
              <Col sm={3}>
                <Input
                  type='text'
                  name='password'
                  placeholder='Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  invalid={errors.password && touched.password}
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </Col>
            </FormGroup>
          </div>
          <div>{loadingState ? <Spinner /> : null}</div>
          <Button type='submit' color='success' className={Styles.LogInButton}>
            Login
          </Button>

          <div className={Styles.LoginInfo}>
            Dont have an account,
            <Button
              onClick={() => Navigate('/SignUp')}
              color='link'
              className={Styles.SignupRedirectBtn}
            >
              SignUp
            </Button>
          </div>
        </RSForm>
      )}
    </Formik>
  );
};

export default LogInForm;
