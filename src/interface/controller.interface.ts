import { Router } from "express";

interface IController {
  path?: string;
  router?: Router;
  app: Router;
  base: string;
  [key:string]:any
}

export type AllowedRoutes = 'get' | 'post' | 'put' | 'patch' | 'delete'
// declare const ModuleController {
//   submodule: typeof submodule
// }
export default IController;
