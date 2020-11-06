import React from 'react';
import styled from '@emotion/styled';

const Votes = styled.span`
  display: block;
  box-shadow: 1px 1px 3px var(--greyDark);
  padding: 0.3rem 1rem;
  background: var(--orange);
  width: 20%;
  text-align: center;
  font-weight: 700;
  margin-bottom: 2rem;

  p {
    font-size: 1.6rem;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const VotesInformation = ({ userHasVoted }) => {
  return <Votes>Votes: {userHasVoted.length}</Votes>;
};

export default VotesInformation;
