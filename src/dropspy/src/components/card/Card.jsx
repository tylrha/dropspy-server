import {CardContainerStyled, CardStyled} from './card.styles'

const Card = (props) => {
  return (
    <CardStyled className={`card ${props.small ? 'small' : ''}`}>
      <div>
        <div className="numbers">{props.number}</div>
        <div className="cardName">{props.name}</div>
      </div>
      <div className="iconBx">
        <i className={props.icon}></i>
      </div>
    </CardStyled>
  );
}

const CardBox = (props) => {

  return (
    <CardContainerStyled className={`${props.number ? `grid-` + props.number : ""}`}>
      {props.children}
    </CardContainerStyled>
  )
}

export { CardBox, Card }
