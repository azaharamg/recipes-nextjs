import React from 'react';
import { css } from '@emotion/core';

import { ButtonSearch } from './Button';
import { Input } from './Form';

const SearchBox = () => {
  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <Input
        css={css`
          min-width: 300px;
        `}
        type='text'
        placeholder='Search Recipes'
      />
      <ButtonSearch title='search' type='submit' />
      <ButtonSearch />
    </form>
  );
};

export default SearchBox;
