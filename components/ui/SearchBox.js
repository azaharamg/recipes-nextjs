import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { ButtonSearch } from './Button';

const InputText = styled.input`
  border: 1px solid var(--greyLight);
  border-radius: 7px;
  padding: 1rem;
  min-width: 300px;
  outline: none;
  &:focus {
    border-color: var(--blueDark02);
    box-shadow: 0 0 10px var(--blueDark02);
  }
`;

const InputSubmit = styled.button``;

const SearchBox = () => {
  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <InputText type='text' placeholder='Search Recipes' />
      <ButtonSearch title='search' type='submit' />
      <ButtonSearch />
    </form>
  );
};

export default SearchBox;
