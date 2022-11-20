import { Card, CardBox } from '../../../../../components/card/Card'

import {
  BOTS_ICONS
} from '../../../../../utils/box-icons'

const {
  totalBotsIcon,
  activeBotsIcon,
  inactiveBotsIcon,
  errorBotsIcon,
} = BOTS_ICONS

const getBotsCardsObj = (oldBots) => {

  const totalBots = oldBots.length
  const inactiveBots = oldBots.filter(item => item.realStatus === "inactive").length
  const activeBots = oldBots.filter(item => item.realStatus === "active").length
  const errorBots = oldBots.filter(item => item.realStatus === "error").length

  return {
    totalBots: Intl.NumberFormat('pt-br').format(totalBots),
    inactiveBots: Intl.NumberFormat('pt-br').format(inactiveBots),
    activeBots: Intl.NumberFormat('pt-br').format(activeBots),
    errorBots: Intl.NumberFormat('pt-br').format(errorBots)
  }
}

const BotsCards = (props) => {

  const {
    totalBots,
    inactiveBots,
    activeBots,
    errorBots,
  } = getBotsCardsObj(props.value.groupedBots)

  return (

    <CardBox number={4}>
      <Card name="Bots totais" number={totalBots} icon={totalBotsIcon} />
      <Card name="Bots ativos" number={activeBots} icon={activeBotsIcon} />
      <Card name="Bots inativos" number={inactiveBots} icon={inactiveBotsIcon} />
      <Card name="Bots com erros" number={errorBots} icon={errorBotsIcon} />
    </CardBox>

  )
}

export { BotsCards }

