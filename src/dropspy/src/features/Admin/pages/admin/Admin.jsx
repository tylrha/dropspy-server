import { useContext, useEffect, useState } from 'react';

import { Container } from '../../../../components/container/Container';
import { Tabs } from '../../../../components/tabs/Tabs';

import { LayoutContext } from '../../../Layout';
import { AdminForm } from './components/AdminForm';
import { getAdminInfoFromApi } from '../../services/get-admin-info-from-api';
import { AllUsers, getAllUsersFromApi, addFieldsToUserObj } from '../../../Users';
import { getAllBotsFromApi, addFieldsToBotObj, Bots } from '../../../Bots';

const Admin = () => {

  const {setTitle} = useContext(LayoutContext)

  const [users, setUsers] = useState([]);
  const [bots, setBots] = useState([]);
  const [adminInfo, setAdminInfo] = useState({})

  const tabsNames = ["Admin", "Bots", "Usuários"]
  const tabsValues = [
    <AdminForm value={{ adminInfo }} />,
    <Bots value={{bots}}/>,
    <AllUsers value={{users}}/>
  ]

  useEffect(() => {

    setTitle('Painel ADMIN')

    getAllBotsFromApi((response) => {
      const botsArr = response.map(item => addFieldsToBotObj(item))
      setBots(botsArr);
    })

    getAdminInfoFromApi((data) => {
      setAdminInfo(data)
    })

    getAllUsersFromApi((response) => {
      const usersArr = response.map(item => addFieldsToUserObj(item))
      setUsers(usersArr);
    })

  }, []) // eslint-disable-line

  return (
    <Container>
      <Tabs value={{ tabs: tabsNames, tabsContent: tabsValues }} />
    </Container>
  );
};

export { Admin };
