import React, { useContext } from 'react';
import { FirebaseContext } from '../../firebase';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enGB } from 'date-fns/locale';
import Link from 'next/link';

import VoteButton from '../../components/ui/VoteButton';
import VotesInformation from '../../components/ui/VoteSpan';

const Recipe = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2rem solid var(--greyLight);
`;

const DescriptionRecipe = styled.div`
  flex: 0 1 95%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 1rem;
`;

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

const DescriptionText = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: var(--greyDark);
  text-align: justify;
`;

const Comments = styled.a`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 3px var(--greyDark);
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }

  img {
    width: 2.5rem;
    margin-right: 1rem;
  }

  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Image = styled.img`
  width: 20rem;
`;

const RecipeDetails = ({ recipe }) => {
  const { user } = useContext(FirebaseContext);
  const { id, comments, published, description, name, urlImage, userHasVoted } = recipe;

  return (
    <Recipe>
      <DescriptionRecipe>
        <div>
          <Image src={urlImage} alt={`${name} image`} />
        </div>
        <div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <Link href='/recipes/[id]' as={`/recipes/${id}`}>
              <Title>{name}</Title>
            </Link>
            {!user ? (
              <VotesInformation userHasVoted={userHasVoted} />
            ) : (
              <VoteButton user={user} recipe={recipe} onVoteSubmited={() => {}} />
            )}
          </div>
          <DescriptionText>{description}</DescriptionText>
          <Link href='/recipes/[id]' as={`/recipes/${id}`}>
            <Comments>
              <div>
                <img src='/static/image/comments.png' alt='comments' />
                <p>{comments.length === 1 ? `${comments.length} Comentario` : `${comments.length} Comentarios`}</p>
              </div>
            </Comments>
          </Link>
          <p>Published {formatDistanceToNow(new Date(published), { locale: enGB })} ago</p>
        </div>
      </DescriptionRecipe>
    </Recipe>
  );
};

export default RecipeDetails;
