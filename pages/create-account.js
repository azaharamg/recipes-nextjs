import React, { useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';

import firebase from '../firebase';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Input, Error } from '../components/ui/Form';

import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';

import { STATE_INITIAL } from '../constants/constants';

const CreateAccount = () => {
  const [createAccountError, storeError] = useState(false);

  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(
    STATE_INITIAL,
    validateCreateAccount,
    createAccount
  );

  const { name, email, password } = values;

  async function createAccount() {
    try {
      await firebase.register(name, email, password);
      Router.push('/');
    } catch (error) {
      console.log('Error, when user tries to create a new account', error.message);
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
            Create Account
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor='name'>Name</label>
              <Input
                type='text'
                id='name'
                placeholder="What's your name"
                name='name'
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && <Error>{errors.name}*</Error>}
            </Field>

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

            {createAccountError && (
              <Error
                css={css`
                  text-align: center;
                `}
              >
                {`Sorry, ${createAccountError}`}
              </Error>
            )}

            <InputSubmit type='submit' value='Create' />
          </Form>
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default CreateAccount;
