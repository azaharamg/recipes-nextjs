import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enGB } from 'date-fns/locale';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import Spinner from '../../components/ui/Spinner';
import { Field, Input, InputSubmit } from '../../components/ui/Form';
import { Button } from '../../components/ui/Button';

const RecipeContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
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
  }, [id]);

  const { userInfo, comments, published, description, name, urlImage, author, votes, userHasVoted } = recipe;

  /**
   * Manage user votes
   */
  const handleVote = () => {
    if (!user) {
      return router.push('/login');
    }

    const totalVotes = votes + 1;

    // Check if current user has already voted
    if (userHasVoted.includes(user.uid)) return;

    //Store ids of user have already voted
    const usersHaveVoted = [...userHasVoted, user.uid];

    // Update state
    storeRecipe({
      ...recipe,
      votes: totalVotes,
    });
    storeDataDb(true);

    //Update db
    firebase.db.collection('recipes').doc(id).update({ votes: totalVotes, userHasVoted: usersHaveVoted });
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
                <p>{description}</p>
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

                <h2
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
                          border: 1px solid var(--greyLight);
                          padding: 2rem;
                        `}
                      >
                        <p>{comment.message}</p>
                        <p>
                          Write by:
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
              </div>
              {user && (
                <aside>
                  <Button bgColor='true' onClick={handleVote}>
                    Vote this recipe
                  </Button>
                  <p>{votes === 1 ? `${votes} Vote` : `${votes} Vote`}</p>

                  <h2>Add your comments</h2>
                  <form onSubmit={addComment}>
                    <Field>
                      <Input type='text' name='message' onChange={handleCommentChange} />
                    </Field>
                    <InputSubmit type='submit' value='Add' />
                  </form>
                </aside>
              )}
            </RecipeContainer>
          </div>
        )}
      </React.Fragment>
    </Layout>
  );
};

export default Recipe;
