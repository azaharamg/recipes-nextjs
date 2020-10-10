import React from 'react';
import { css } from '@emotion/core';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Input, Error } from '../components/ui/Form';

import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';

const STATE_INITIAL = {
  name: '',
  email: '',
  password: '',
};

const CreateAccount = () => {
  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(
    STATE_INITIAL,
    validateCreateAccount,
    createAccount
  );

  const { name, email, password } = values;

  function createAccount() {
    console.log('Creating account...');
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
            <InputSubmit type='submit' value='Create' />
          </Form>
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default CreateAccount;
