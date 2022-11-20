import styled from 'styled-components'

const FormStyled = styled.form`

  .button {
    background-color: var(--first-color);
    color: var(--text-color);
  }

  .form__row {
    display: grid;
    padding: 5px;
    grid-gap: 3px;
    border: 1px solid var(--text-color);
    margin-bottom: 8px;
    box-shadow: var(--box-shadow);
    height: 100%;

    &.one {
      grid-template-columns: repeat(1, 1fr);
    }

    &.two {
      grid-template-columns: repeat(2, 1fr);
    }

    .input__title {
      font-weight: bold;
    }

    .input__add_item {

      .row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0 3px;

        i {
          cursor: pointer;
        }

        &.synonyms {
          display: flex;
          flex-direction: column;
          margin-top: 20px;

          .synonym__row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0 3px;
            width: 100%;
            height: 100%;
            margin-top: 8px;

            .synonym__item {
              width: 100%;
              height: 100%;
              background-color: darkslategray;
            }

            i {
              cursor: pointer;
            }

          }
        }
      }

    }

    .input__item {
      background-color: var(--background-color);
      color: var(--text-color);
      height: 100%;
      width: 100%;
    }

    input, select {
      background-color: transparent;
      text-align: center;
      &::placeholder{
        color: var(--text-color);
      }
    }
  }

`

export { FormStyled }
