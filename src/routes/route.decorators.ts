export type TypedPropertyDescriptor<T> = {
  app?: any;
  routes?: string;
  value?: Function;
};

export const requestHandler = (
  route: string | string[],
  type: string,
  middleware: any = []
) => (
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>,
  other?: any
) => {
  const method = descriptor.value;
  descriptor.value =  () => {
    return (app, controller) => {
      if (controller) {
        const ctMethod = (method || function(){}).bind(controller);
          const routes = []
        if (typeof route === 'string') {
          // @ts-ignore
          routes.push(`/${controller.base}/${route}`)
        } else {
          route.forEach(path => {
            // @ts-ignore
            routes.push(`/${controller.base}/${path}`)
          })
        }
          app[type](routes, middleware, ctMethod);
      }
    }
  };
};

export function Post(route: string | string[], middleware: any = []) {
  return requestHandler(route, "post", middleware);
}

export function Get(route: string | string[], middleware: any = []) {
  return requestHandler(route, "get", middleware);
}

export function Patch(route: string | string[], middleware: any = []) {
  return requestHandler(route, "patch", middleware);
}

export function Put(route: string | string[], middleware: any = []) {
  return requestHandler(route, "put", middleware);
}
export function Delete(route: string | string[], middleware: any = []) {
  return requestHandler(route, "delete", middleware);
}
