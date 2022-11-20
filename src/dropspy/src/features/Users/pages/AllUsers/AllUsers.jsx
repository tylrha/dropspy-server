import { Loader } from "../../../../components/loader/Loader";
import { UsersTable } from "./components/UsersTable";

const AllUsers = (props) => {

  const { users } = props.value

  return (
    <>
      {users.length === 0 ? (
        <Loader text="Carregando usuários" />
      ) : (
        <>
          <UsersTable value={{ users }} />
        </>
      )}
    </>
  )

};

export { AllUsers };
