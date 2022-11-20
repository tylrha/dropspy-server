import { Request, Response } from 'express';
import getDropspyApiRoutes from '../api/dropspy-routes'

export default function showAllDropspyApiRoutesController(req: Request, res: Response) {
  try {

    const apiRoutes = getDropspyApiRoutes('')
    const fullUrl = req.protocol + '://' + req.get('host');

    let lastCategory = ""
    let allRoutesObj = {}
    let categoryObj = {}

    for (const curRoute of apiRoutes) {
      const [method, route, routeFunction] = curRoute

      const routeSplitedArr = route.split("/")
      const curRouteName = routeSplitedArr.length === 5 ? routeSplitedArr[4] : routeSplitedArr[3]
      const curCategory = curRouteName ? route.slice(0, Number(route.length - curRouteName.length)) : route
      const curLink = `${fullUrl}${route}`

      if (curCategory !== lastCategory && lastCategory !== "") {
        allRoutesObj[lastCategory] = categoryObj
        categoryObj = {}
      }

      lastCategory = curCategory
      categoryObj[`${curRouteName}_${method}`] = curLink
    }

    allRoutesObj[lastCategory] = categoryObj
    res.json(allRoutesObj)

  } catch (e) {

    res.json({ error: e.message })

  }
}
