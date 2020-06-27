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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as action from '../../store/index';
import Spinner from '../UI/Spinner';

const SignUpForm = (props) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.auth.loading, shallowEqual);
  // const errorMessage = useSelector((state) => state.error, shallowEqual);
  const EmailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('*Invalid email address')
      .required('*Email is Required')
      .matches(EmailReg, '*Invalid Email address'),
    password: Yup.string()
      .required('*Password cannot be empty')
      .min(3, '*Password must have at least 3 characters'),
    passwordConfirm: Yup.string()
      .required('*Confirm your password')
      .oneOf([Yup.ref('password'), null], '*Password must match each other'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        console.log(values);
        const data = {
          email: values.email,
          password: values.password,
        };
        dispatch(action.addUser(data));
        setTimeout(() => Navigate('/AddExpense'), 3000);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <RSForm tag={FormikForm} onSubmit={handleSubmit}>
          <div className={Styles.SignUpForm}>
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
                  type='password'
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

            <FormGroup row>
              <Label for='passwordConfirm' sm={2} hidden>
                Confirm Password
              </Label>
              <Col sm={3}>
                <Input
                  type='password'
                  name='passwordConfirm'
                  placeholder='Comfirm Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirm}
                  invalid={errors.passwordConfirm && touched.passwordConfirm}
                />
                <FormFeedback>{errors.passwordConfirm}</FormFeedback>
              </Col>
            </FormGroup>
          </div>
          <div>{loadingState ? <Spinner /> : null}</div>
          <Button type='submit' color='success' className={Styles.SignUpButton}>
            SignUp
          </Button>

          <div className={Styles.SignupInfo}>
            Already have an account,
            <Button
              onClick={() => Navigate('/LogIn')}
              color='link'
              className={Styles.LoginRedirectBtn}
            >
              Login
            </Button>
          </div>
        </RSForm>
      )}
    </Formik>
  );
};

export default SignUpForm;
