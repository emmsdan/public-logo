import express from 'express';

export default class BaseRoutesConfig {
    app: express.Application;
    name: string;
    static base: string = '/'

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    get route() {
        return BaseRoutesConfig.base;
    }
}
