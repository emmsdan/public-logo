
type Services = (new (app, http) => {})
interface IServices {
  name: string;
  handler: Services
}

export type IService =  {
  handler: any;
  name: string;
  [key:string]: any;
}
export default IServices;
