import IServices from "./service.interface";
import {Request } from "express";

interface IRequest extends  Request {
  __AppServices: IServices[]
}

export default IRequest;
