import React, { useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';

import { ButtonSearch } from './Button';
import { Input } from './Form';

const SearchBox = () => {
  const [search, storeSearch] = useState('');

  const searchRecipe = (e) => {
    e.preventDefault();

    if (typeof search !== 'string' || search.trim() === '') return;
    Router.push({
      pathname: '/search',
      query: { q: search },
    });
  };

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={searchRecipe}
    >
      <Input
        css={css`
          min-width: 300px;
        `}
        type='text'
        placeholder='Search Recipes'
        onChange={(e) => storeSearch(e.target.value)}
      />
      <ButtonSearch title='search' type='submit' />
      <ButtonSearch />
    </form>
  );
};

export default SearchBox;
