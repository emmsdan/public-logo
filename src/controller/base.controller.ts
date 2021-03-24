import { Router } from "express";
import IController from "../interface/controller.interface";

export default class BaseController implements IController {
  public base!: string;
  public app!: Router;
  public route!: string


  getAppControllerMethods() {
    const object = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    return object.filter(method => {
      return  method !== 'constructor' && this && typeof this[method] === 'function' && typeof this[method]() === 'function'
    }).map(method =>  method );
  }
}