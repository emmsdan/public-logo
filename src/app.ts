import cookieParser from "cookie-parser";
import express from "express";
import { Server } from 'http';
import dotenv from 'dotenv'
import Controller from "./interface/controller.interface";
import IServices, { IService} from "./interface/service.interface";

dotenv.config();

class App {
  public app: express.Application;
  private PORT: string | number;
  private readonly base!: string;
  private readonly http: Server;
  private services: IService[]  = []

  constructor(name: string, base: string | null=null) {
    this.app = express();
    this.http = new Server(this.app)
    this.PORT = 3300;
    this.base = base || 'api/'
    this.app.get("/", (_req, res) =>
        res.json({ name, message: `App running on port ${this.PORT}` })
    );

    this.Middlewares([
      express.urlencoded({
        extended: true
      }),
      express.json(),
      cookieParser(),
      this.injectedServices(),
    ]);
  }

  public Controllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      controller.base = this.base + controller.base
      controller.getAppControllerMethods().forEach(method => {
        controller[method]()(this.app, controller)
      })
    });
  }

  public Middlewares(middlewares: any[]): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  public Services(services: IServices[]){
    services.forEach((service) => {
      const handler = new service.handler(this.app, this.http);
      this.services.push({ name: service.name, handler, [service.name]: handler });
    });
  }

  private injectedServices() {
    return (req, __res, next) => {
      req.__AppServices = this.services
      next()
    }
  }
  private listen(): void {

    this.http.listen(this.PORT, () => {
      console.log(`App listening on the port http://localhost:${this.PORT}`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  public ErrorHanders(errorHanders: any[]): void {
    this.app.use(errorHanders);
  }

  /**
   *
   * @param config database configuration
   * @returns void | objrct
   */
  public Database(config = null) {
    if (!config) return;
    return config;
  }

  public Start(port = null): void {
    this.PORT = port || Number(process.env.PORT || this.PORT);
    this.listen();
  }
}

export default App;
