import { BotsTable } from './components/BotsTable'
import { BotsCards } from "./components/BotsCards";
import { groupBotsByStatus } from "../../utils/group-bots-by-status";
import { Loader } from "../../../../components/loader/Loader";

const Bots = (props) => {

  const {bots} = props.value
  const groupedBots = bots.length > 0 ? groupBotsByStatus(bots) : []

  return (
    <>
      {bots.length === 0 ? (
        <Loader text="Carregando bots" />
      ) : (
        <>
          <br />
          <BotsCards value={{ groupedBots }} />
          <BotsTable value={{ bots }} />
        </>
      )}
    </>
  )

};

export { Bots };
