import styled from '@emotion/styled';

export const Button = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.bgColor ? '#00a896' : 'white')};
  color: ${(props) => (props.bgColor ? 'white' : '#000')};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 1.2rem 1.6rem 0 rgba(0, 0, 0, 0.24), 0 1.7rem 5rem 0 rgba(0, 0, 0, 0.19);
  }
`;

export const DangerButton = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid var(--red);
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.bgColor ? '#00a896' : 'white')};
  color: ${(props) => (props.bgColor ? 'white' : '#000')};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonSearch = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/static/image/search.png');
  background-repeat: no-repeat;
  border-radius: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 1px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
