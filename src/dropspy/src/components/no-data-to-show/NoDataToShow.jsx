import styled from 'styled-components'

const NoDataToShowStyled = styled.h2`
  text-align: center;
  margin-top: 150px;
`

const NoDataToShow = ({title}) => {
  return (
    <NoDataToShowStyled>{title}</NoDataToShowStyled>
  )
}

export {NoDataToShow}
