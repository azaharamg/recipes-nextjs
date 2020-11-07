import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';

import { FirebaseContext } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

import Layout from '../../components/layout/Layout';
import { Form, Field, InputSubmit, Input, Error } from '../../components/ui/Form';
import Error404 from '../../components/layout/404';

import useValidation from '../../hooks/useValidation';
import validateRecipe from '../../validation/validateRecipe';

const EditRecipe = () => {
  const { firebase, user } = useContext(FirebaseContext);
  const [getDataDb, storeDataDb] = useState(true);

  /**
   * Routing to get the id of the current recipe
   */
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const updateRecipe = async () => {
    try {
      await firebase.db.collection('recipes').doc(id).update(values);
      router.push(`/recipes/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, updateValues, handleChange, handleSubmit, handleBlur } = useValidation(
    {},
    validateRecipe,
    updateRecipe
  );

  useEffect(() => {
    if (id && getDataDb) {
      const getRecipe = async () => {
        const recipeQuery = await firebase.db.collection('recipes').doc(id);
        const recipe = await recipeQuery.get();
        if (recipe.exists) {
          updateValues({ ...recipe.data(), id });
          storeDataDb(false);
        } else {
          storeError(true);
          storeDataDb(false);
        }
      };
      getRecipe();
    }
  }, [id]);

  return (
    <div>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
          <React.Fragment>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {`Edit ${values.name}`}
            </h1>
            <Form onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>General Information</legend>
                <Field>
                  <label htmlFor='name'>Name</label>
                  <Input
                    type='text'
                    id='name'
                    placeholder="Recipe's Name"
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && <Error>{errors.name}*</Error>}
                </Field>
                <Field>
                  <label htmlFor='author'>Author</label>
                  <Input
                    type='text'
                    id='author'
                    placeholder="What's your name?"
                    name='author'
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.author && <Error>{errors.author}*</Error>}
                </Field>
                <Field>
                  <label htmlFor='image'>Image</label>
                  <FileUploader
                    accept='image/png, image/jpeg'
                    id='image'
                    name='image'
                    storageRef={firebase.storage.ref('recipes')}
                  />
                </Field>
              </fieldset>

              <fieldset>
                <legend>
                  How to cook it! <img src='/static/image/cook.svg' width='30px' alt='pot' />
                </legend>
                <Field>
                  <label
                    htmlFor='description'
                    css={css`
                      align-self: flex-start;
                    `}
                  >
                    Description
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && <Error>{errors.description}*</Error>}
                </Field>
              </fieldset>
              <InputSubmit type='submit' value='Edit' />
            </Form>
          </React.Fragment>
        )}
      </Layout>
    </div>
  );
};

export default EditRecipe;
