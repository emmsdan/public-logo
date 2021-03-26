import Controller from "../interface/controller.interface";
import { Router, Request, Response, Application } from "express";
import {Delete, Get, Patch, Post, requestHandler} from "../routes/route.decorators";
import BaseController from "./base.controller";
import IRequest from "../interface/server.interface";

import Joi from 'joi'
import {requestValidator} from "../middleware/validator";
import {getFileContent, searchArrayOfObject} from "../utils/files";
import fs from 'fs'
import path from 'path';


export const createContactSchema  = Joi.object({
    name: Joi.string().insensitive().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    pix: Joi.string(),
    website: Joi.string(),
    job: Joi.string(),
    priority: Joi.string(),
    id: Joi.string(),
    userId: Joi.string(),
}).or('email', 'phone', 'website');

export const bulkCreate = Joi.array().items(
    createContactSchema.with('userId', 'name')
).required()

export const bulkDelete = Joi.array().items(Joi.string().uuid())

export default class Logos extends  BaseController implements Controller {
    base = "logo"
    app = Router()
    filePath = path.join( __dirname, '../assets/logos.json')
    logosDir = path.join(__dirname, '../assets/logos');
    notFoundLogo = path.join(__dirname, '../assets/logos/not_found/not_found.svg')
    fields = ['filename', 'title', 'url', 'alternative']

    @Get("")
    async get({params}: IRequest, res: Response) {
        const files = await getFileContent(this.filePath)
        if (typeof files !== 'string') return res.status(400).json(files);
        return res.json(JSON.parse(files))
    }

    @Get(["img/:image", 'img/:image/:type'])
    async getImage({params}: IRequest, res: Response) {
        try {
            const img = params.image.toLowerCase();
            const type = (params.type || 'svg').toLowerCase();

            const filename = `${this.logosDir }/${img}/${img}.${type}`;
            if (fs.existsSync(filename)) {
                return res.sendFile(filename);
            } else {
                const file = await getFileContent(this.filePath);
                if (typeof file !== 'string') {
                    return res.sendFile(this.notFoundLogo);
                }
                const  data = await searchArrayOfObject(img, this.fields, JSON.parse(file))
                if (data.length >= 1) {
                    const image = data[0].item.filename;
                    const filename = `${this.logosDir }/${image}/${image}.${type}`;
                    if (fs.existsSync(filename)) {
                        return res.sendFile(filename);
                    }
                }
            }
            return res.sendFile(this.notFoundLogo);
        } catch (e) {
            return res.sendFile(this.notFoundLogo);
        }
    }

    @Get("search/:search")
    async bulkGet({params: { search }}: IRequest, res: Response) {
        const file = await getFileContent(this.filePath);
        if (typeof file !== 'string') {
            res.status(400).json(file);
            return;
        }
        const  data = await searchArrayOfObject(search, this.fields, JSON.parse(file))
        if (data.length <= 0) {
            return res.json([{
                item: {
                    "title": `No search found for key ('${search}')`,
                    "filename": "not_found.png",
                    "url": "http://www.emmsdan.com/",
                    "category": [404, 'not_found']
                }
            }])
        }
        res.json(data);
    }

    @Post("", requestValidator(createContactSchema))
    async create(__req: IRequest, res: Response) {
        try {
            // const contact = await ContactModel.create(__req.body)
            // res.status(201).json({ status: 201, data: contact });
        } catch (err) {
            res.status(400).json({ status: 400, message: err.message, object: err })
        }
    }

    @Patch(":id", requestValidator(createContactSchema))
    async update(req: IRequest, res: Response) {
        try {
            // const contact = await ContactModel.update(req.body, {where: { id: req.params.id }})
            // res.status(200).json({ status: 200, data: 'updated', object: contact });
        } catch (err) {
            res.status(400).json({ status: 400, message: err.message, object: err })
        }
    }
}
