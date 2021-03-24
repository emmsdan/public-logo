import Controller from "../interface/controller.interface";
import { Router, Request, Response, Application } from "express";
import {Get, Post, requestHandler} from "../routes/route.decorators";
import BaseController from "./base.controller";
import IRequest from "../interface/server.interface";

export default class Contact extends  BaseController implements Controller {
    base = "contact"
    app = Router()


    @Get("")
    async get(__req: IRequest, res: Response) {
        res.json('__req.__AppServices');
    }

    @Post("")
    async create(__req: IRequest, res: Response) {
        res.json((__req.body));
    }

      private uniq(data='') {
          return 'very good' + data
      }
}
