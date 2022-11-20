import { Request, Response } from 'express'
import { DATABASE_DATABASE_SPY } from '../../../../configs/configs'

import checkQueriesErros from '../../components/query-validation'

export default async function editAdminController(request: Request, response: Response) {

  const { botStatus, serverStatus, currentServer } = request.body

  try{

    if (checkQueriesErros({ botStatus, serverStatus, currentServer }, response) === true) { return }

    const DBCLIENT = global['DBCLIENT']
    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const adminInfo = await db.collection("admin").find({name: "options"}).toArray()

    let newAdminInfo = {
      ...adminInfo[0],
      botStatus,
      serverStatus,
      currentServer
    }

    const savedAdminInfo = await db.collection("admin").updateOne({name: "options"}, { $set: newAdminInfo})

    response.json(savedAdminInfo)

  } catch(e){
    console.log(e.message)

    response.json({ error: e.message })
  }


}
