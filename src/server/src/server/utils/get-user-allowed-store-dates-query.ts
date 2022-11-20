import { IUserMongo } from "../../models/User";

export default function getUserAllowedStoreDatesQuery(userObj: IUserMongo){
  const storeDatesQuery = userObj.registeredStores.map(store => {
    return {
      storeLink: store.storeLink,
      date: { $in: store.spyDates }
    }
  })

  return storeDatesQuery
}
