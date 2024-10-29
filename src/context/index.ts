import { IAuthPayload } from "../middlewares";

export interface IContext {
  user?: IAuthPayload
}