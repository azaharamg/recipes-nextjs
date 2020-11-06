import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';

import { css } from '@emotion/core';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../../components/ui/Button';

const VoteButton = ({ user, recipe, onVoteSubmited }) => {
  const { firebase } = useContext(FirebaseContext);

  const { userHasVoted, id } = recipe;

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

    // Update database
    firebase.db
      .collection('recipes')
      .doc(id)
      .update({ votes: usersHaveVoted.length, userHasVoted: usersHaveVoted })
      .then(() => onVoteSubmited(usersHaveVoted));
  };

  return (
    <Button bgColor='true' title='Number of votes' onClick={handleVote}>
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
  );
};

export default VoteButton;
