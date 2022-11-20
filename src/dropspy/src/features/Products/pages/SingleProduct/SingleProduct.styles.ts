import styled from 'styled-components'

const ProductDetailsStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .productName {
    text-align: center;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 15px;
  }
`

const LabelsContainerStyles = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  .label {
    background-color: var(--background-color-alt);
    margin: 5px 15px;

    &.product {
      color: rgb(203, 18, 18);
    }

    &.strategy {
      color: rgb(70, 184, 4);
    }

    &.manual {
      color: rgb(188, 50, 206);
    }

  }

  @media screen and (max-width: 768px){

    .label {
      margin: 5px 7px;
    }

  }

`

export {
  ProductDetailsStyles,
  LabelsContainerStyles
}
