import cors from 'cors'
import express, { Request, Response, Express } from 'express'
import { join } from 'path'
import { existsSync } from 'fs'
import setRoutesInExpressServer from './components/set-routes-in-server'
import getDropspyRoutes from './api/dropspy-routes'

import {
  SERVER_PORT,
  NODE_ENV,
  DROPSPY_FOLDER,
  DATABASE_LOGIN_URL
} from '../../configs/configs'

import showAllDropspyApiRoutesController from './pages/show-all-dropspy-api-routes-controller'

export default function initServer(): Express {

  let server = express()

  server.use(express.json({ limit: '25mb' }));
  server.use(express.urlencoded({ extended: true }));

  server.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000'
    ]
  }));

  server.get("/api", showAllDropspyApiRoutesController);
  server = setRoutesInExpressServer(server, getDropspyRoutes(''))

  if (NODE_ENV === "production") {

    if (existsSync(DROPSPY_FOLDER)) {
      server.use(express.static(DROPSPY_FOLDER))

      server.get('/*', (req: Request, res: Response) => {
        res.sendFile(join(DROPSPY_FOLDER, 'index.html'))
      })
    }

  } else {
    server.get("/", (req, res) => {
      res.json({message: "Open the development page"})
    });
  }

  server.get("*", (req, res) => {
    res.send("Error 404 - Page not found!")
  });

  server.listen(SERVER_PORT, async () => {
    console.log(`server was initiated at PORT ${SERVER_PORT}`)
  }).setTimeout(0)

  return server

}
