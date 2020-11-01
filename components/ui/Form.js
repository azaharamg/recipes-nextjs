import styled from '@emotion/styled';

export const Form = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto;

  fieldset {
    margin: 5rem 0;
    border: 1px solid var(--blueLight01);
    font-size: 2rem;
    padding: 2rem;
    box-shadow: 2px 10px 5px var(--greyMedium);
  }

  legend {
    color: var(--blueLight01);
  }
`;

export const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  textarea {
    height: 20rem;
    flex: 1;
    padding: 1rem;
    border: 1px solid var(--greyMedium);
    border-radius: 7px;
    outline: none;
    &:focus {
      border-color: var(--blueDark02);
      box-shadow: 0 0 10px var(--blueDark02);
    }
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--greyMedium);
  border-radius: 7px;
  outline: none;
  &:focus {
    border-color: var(--blueDark02);
    box-shadow: 0 0 10px var(--blueDark02);
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--greenDark03);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: var(--white);
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: var(--secondaryFontFamily);
  font-weight: 700;

  &:hover {
    cursor: pointer;
    box-shadow: 0 1.2rem 1.6rem 0 rgba(0, 0, 0, 0.24), 0 1.7rem 5rem 0 rgba(0, 0, 0, 0.19);
  }
`;

export const Error = styled.p`
  color: var(--red);
  padding: 1rem;
  font-family: var(--secondaryFontFamily);
  font-weight: 700;
  font-size: 1.21rem;
  text-align: start;
  text-transform: uppercase;
  margin: 1rem 0;
`;
