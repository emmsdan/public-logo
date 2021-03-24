export type TypedPropertyDescriptor<T> = {
  app?: any;
  routes?: string;
  value?: Function;
};

export const requestHandler = (
  route: string,
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
          app[type](`/${controller.base}/${route}`, middleware, ctMethod);
      }
    }
  };
};

export function Post(route: string, middleware: any = []) {
  return requestHandler(route, "post", middleware);
}

export function Get(route: string, middleware: any = []) {
  return requestHandler(route, "get", middleware);
}

export function Patch(route: string, middleware: any = []) {
  return requestHandler(route, "patch", middleware);
}

export function Put(route: string, middleware: any = []) {
  return requestHandler(route, "put", middleware);
}
export function Delete(route: string, middleware: any = []) {
  return requestHandler(route, "delete", middleware);
}
