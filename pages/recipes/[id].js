import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enGB } from 'date-fns/locale';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import Spinner from '../../components/ui/Spinner';
import { Field, Input, InputSubmit } from '../../components/ui/Form';
import { Button, DangerButton } from '../../components/ui/Button';

const RecipeContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
`;

const OwnerRecipe = styled.p`
  padding: 0.5rem 2rem;
  background-color: var(--blueLight01);
  color: var(--white);
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  text-align: center;
`;

const Recipe = () => {
  const [recipe, storeRecipe] = useState({});
  const [error, storeError] = useState(false);
  const [comment, storeComment] = useState({});
  const [getDataDb, storeDataDb] = useState(true);

  /**
   * Routing to get the id of the current recipe
   */
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);
  useEffect(() => {
    if (id && getDataDb) {
      const getRecipe = async () => {
        const recipeQuery = await firebase.db.collection('recipes').doc(id);
        const recipe = await recipeQuery.get();
        if (recipe.exists) {
          storeRecipe(recipe.data());
          storeDataDb(false);
        } else {
          storeError(true);
          storeDataDb(false);
        }
      };
      getRecipe();
    }
  }, [id, recipe]);

  const { userInfo, comments, published, description, name, urlImage, author, userHasVoted } = recipe;

  /**
   * Manage user votes
   */
  const handleVote = () => {
    if (!user) {
      return router.push('/login');
    }

    let usersHaveVoted = [...userHasVoted];

    // Check if user have already voted
    if (userHasVoted.includes(user.uid)) {
      const indexOfUserId = usersHaveVoted.indexOf(user.uid);
      if (indexOfUserId > -1) {
        usersHaveVoted.splice(indexOfUserId, 1);
      }
    } else {
      usersHaveVoted = [...userHasVoted, user.uid];
    }

    // Update local state
    storeRecipe({
      ...recipe,
      votes: usersHaveVoted.length,
    });
    storeDataDb(true);

    // Update database
    firebase.db.collection('recipes').doc(id).update({ votes: usersHaveVoted.length, userHasVoted: usersHaveVoted });
  };

  /**
   * Check if user writes a comment
   */
  const isUser = (id) => {
    if (userInfo.id == id) {
      return true;
    }
  };

  const handleCommentChange = (e) => {
    storeComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const addComment = (e) => {
    e.preventDefault();

    if (!user) {
      return router.push('/login');
    }

    comment.userId = user.uid;
    comment.userName = user.displayName;
    const newComments = [...comments, comment];

    //Update db
    firebase.db.collection('recipes').doc(id).update({
      comments: newComments,
    });

    // Update state
    storeRecipe({
      ...recipe,
      comments: newComments,
    });
    storeDataDb(true);
  };

  /**
   * Only the creator of a recipe can delete it
   */
  const userAvailableDelete = () => {
    if (!user) return false;

    if (userInfo.id === user.uid) {
      return true;
    }
  };

  const handleDeleteRecipe = async () => {
    if (!user) {
      return router.push('/login');
    }
    if (userInfo.id !== user.uid) {
      return router.push('/');
    }
    try {
      await firebase.db.collection('recipes').doc(id).delete();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(recipe).length === 0 && !error) return Spinner();

  return (
    <Layout>
      <React.Fragment>
        {error ? (
          <Error404 />
        ) : (
          <div className='container'>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {name}
            </h1>

            <RecipeContainer>
              <div>
                <img src={urlImage} alt={`${name} image`} />
                <h2
                  id='comments'
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comments
                </h2>
                {comments && comments.length !== 0 ? (
                  <ul>
                    {comments.map((comment, i) => (
                      <li
                        key={`${comment.userId}-${i}`}
                        css={css`
                          box-shadow: 1px 1px 3px var(--greyDark);
                          border: 1px solid var(--greyMedium);
                          padding: 2rem;
                        `}
                      >
                        <p>{comment.message}</p>
                        <p>
                          Written by:
                          <span
                            css={css`
                              text-transform: capitalize;
                            `}
                          >
                            {' '}
                            {comment.userName}
                          </span>
                        </p>
                        {isUser(comment.userId) && <OwnerRecipe>Is Creator</OwnerRecipe>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>There aren't any comments.</p>
                )}
                {user && (
                  <aside>
                    <h2>Add your comments</h2>
                    <form onSubmit={addComment}>
                      <Field>
                        <textarea type='text' name='message' onChange={handleCommentChange} />
                      </Field>
                      <InputSubmit type='submit' value='Add' />
                    </form>
                  </aside>
                )}
              </div>
              <aside>
                {user && (
                  <div
                    css={css`
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                    `}
                  >
                    <Button bgColor='true' onClick={handleVote} title='Number of votes'>
                      {userHasVoted.includes(user.uid) ? (
                        <FontAwesomeIcon
                          icon={faStar}
                          css={css`
                            color: var(--orange);
                            margin-right: 1rem;
                          `}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faStar}
                          css={css`
                            opacity: 0.3;
                            color: var(--white);
                            margin-right: 1rem;
                          `}
                        />
                      )}
                      {userHasVoted.length}
                    </Button>
                    {userAvailableDelete() && (
                      <DangerButton bgColor='true' onClick={handleDeleteRecipe} title='Remove Recipe'>
                        Remove
                      </DangerButton>
                    )}
                  </div>
                  // <p>{userHasVoted.length === 1 ? `${userHasVoted.length} Vote` : `${userHasVoted.length} Vote`}</p>
                )}
                <p
                  css={css`
                    text-align: justify;
                  `}
                >
                  {description}
                </p>
                <p>
                  Read the original in this{' '}
                  <a href={author} target='_blank'>
                    link
                  </a>
                </p>
                {published ? (
                  <p>
                    Published {formatDistanceToNow(new Date(published), { locale: enGB })} ago
                    {user ? ` por ${user.displayName}` : null}
                  </p>
                ) : null}
              </aside>
            </RecipeContainer>
          </div>
        )}
      </React.Fragment>
    </Layout>
  );
};

export default Recipe;
