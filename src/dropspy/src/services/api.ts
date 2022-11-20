import axiosModule from "axios";
import { NODE_ENV, API_LINK } from '../configs/configs'

console.log(NODE_ENV + " -> " + API_LINK)

const api = axiosModule.create({ baseURL: API_LINK })

export { api }
