import styled from 'styled-components'

const CardStyled = styled.div`

  position: relative;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: var(--background-color-alt);
  box-shadow: var(--box-shadow);
  color: var(--text-color);

  &.small {

    .numbers {
      font-size:small;
      font-size: 1.5rem;
    }
  }

  &:hover {
    background-color: var(--first-color);
    box-shadow: none;

    .numbers,
    .cardName,
    .iconBx {
      color: var(--text-color-alt);
    }
  }

  .numbers {
    position: relative;
    font-weight: 500;
    font-size: 2.5rem;
    color: var(--text-color);
  }

  .cardName {
    color: var(--text-color);
    font-size: 1.1rem;
    margin-top: 5px;
  }

  .iconBx {
    font-size: 3.5rem;
    color: var(--text-color);
  }

`

const CardContainerStyled = styled.div`

  position: relative;
  width: 100%;
  /* padding: 20px; */
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr)
  }

  @media (min-width: 1000px) {
    &.grid-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &.grid-3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) {
    &.grid-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }

`

export {
  CardStyled,
  CardContainerStyled
}
