import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { enGB } from 'date-fns/locale';

const Recipe = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--greyDark);
`;

const DescriptionRecipe = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const DescriptionText = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: var(--greyDark);
`;

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 3px var(--greyDark);
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }

  img {
    width: 2.5rem;
    margin-right: 2rem;
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

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid var(--greyLight);
  box-shadow: 0 0 3px var(--greyLight);
  padding: 1rem 3rem;
  &:hover {
    box-shadow: 1px 1px 5px var(--greyDark);
  }

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const RecipeDetails = ({ recipe }) => {
  const { id, comments, published, description, name, urlImage, author, votes } = recipe;
  return (
    <Recipe>
      <DescriptionRecipe>
        <div>
          <Image src={urlImage} alt='' />
        </div>
        <div>
          <Title>{name}</Title>
          <DescriptionText>{description}</DescriptionText>
          <Comments>
            <div>
              <img src='/static/image/comments.png' alt='comments' />
              <p>{comments.length === 1 ? `${comments.length} Comentario` : `${comments.length} Comentarios`}</p>
            </div>
          </Comments>
          <p>Published {formatDistanceToNow(new Date(published), { locale: enGB })} ago</p>
        </div>
      </DescriptionRecipe>

      <Votes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </Votes>
    </Recipe>
  );
};

export default RecipeDetails;