import React, { useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';

import firebase from '../firebase';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Input, Error } from '../components/ui/Form';

import useValidation from '../hooks/useValidation';
import validateLogin from '../validation/validateLogin';

import { STATE_INITIAL } from '../constants/constants';

const Login = () => {
  const [loginError, storeError] = useState(false);

  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(
    STATE_INITIAL,
    validateLogin,
    userLogin
  );

  const { email, password } = values;

  async function userLogin() {
    try {
      await firebase.login(email, password);
      Router.push('/');
    } catch (error) {
      console.log('Login failed for user');
      storeError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <React.Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Login
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor='email'>Email</label>
              <Input
                type='email'
                id='email'
                placeholder='Introduce your email'
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <Error>{errors.email}*</Error>}
            </Field>
            <Field>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                id='password'
                placeholder='Write your password'
                name='password'
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && <Error>{errors.password}*</Error>}
            </Field>

            {loginError && (
              <Error
                css={css`
                  text-align: center;
                `}
              >
                {`Sorry, ${loginError}`}
              </Error>
            )}

            <InputSubmit type='submit' value='Login' />
          </Form>
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default Login;
