import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';
import { css } from '@emotion/core';

import { FirebaseContext } from '../firebase';
import FileUploader from 'react-firebase-file-uploader';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Input, Error } from '../components/ui/Form';
import Error404 from '../components/layout/404';

import useValidation from '../hooks/useValidation';
import validateRecipe from '../validation/validateRecipe';

import { STATE_INITIAL_RECIPE } from '../constants/constants';

const NewRecipe = () => {
  // Image state
  const [nameImage, storeNameImage] = useState('');
  const [isUploading, storeIsUploading] = useState(false);
  const [progress, storeProgress] = useState(0);
  const [urlImage, storeUrlImage] = useState('');

  const [createRecipeError, storeError] = useState(false);

  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(
    STATE_INITIAL_RECIPE,
    validateRecipe,
    createRecipe
  );
  const { name, author, description } = values;

  const router = useRouter();
  const { user, firebase } = useContext(FirebaseContext);
  async function createRecipe() {
    if (!user) {
      return route.push('/login');
    }

    const recipe = {
      name,
      author,
      image: nameImage,
      description,
      votes: 0,
      urlImage,
      comments: [],
      published: Date.now(),
      userInfo: {
        id: user.uid,
        name: user.displayName,
      },
      userHasVoted: [],
    };

    firebase.db.collection('recipes').add(recipe);
    return router.push('/');
  }

  const handleUploadStart = () => {
    storeProgress(0);
    storeIsUploading(true);
  };

  const handleProgress = (progress) => storeProgress({ progress });

  const handleUploadError = (error) => {
    storeError(error);
    console.log(error);
  };

  const handleUploadSuccess = (name) => {
    storeProgress(100);
    storeIsUploading(false);
    storeNameImage(name);
    firebase.storage
      .ref('recipes')
      .child(name)
      .getDownloadURL()
      .then((urlImage) => {
        console.log(urlImage);
        storeUrlImage(urlImage);
      });
  };

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
              Add New Recipe
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
                    value={name}
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
                    value={author}
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
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
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
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && <Error>{errors.description}*</Error>}
                </Field>
              </fieldset>

              {createRecipeError && (
                <Error
                  css={css`
                    text-align: center;
                  `}
                >
                  {`Sorry, ${createRecipeError}`}
                </Error>
              )}

              <InputSubmit type='submit' value='Add' />
            </Form>
          </React.Fragment>
        )}
      </Layout>
    </div>
  );
};

export default NewRecipe;
