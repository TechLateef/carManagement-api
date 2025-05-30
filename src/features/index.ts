import { Request, Response } from 'express'
import { authRouter } from './auth/router/auth.route';
import { carRouter } from './car/router/car.route';
import { Category } from './category/model/category.model';
import categoryRoute from './category/router/category.route';





const routeRegister = (app: any) => {

  const basePrefix = '/api/v1';
  app.get('/', (req: Request, res: Response) => {
    res.send('Application is up and Running');
  });


  app.use(`${basePrefix}/auth`, authRouter);
  app.use(`${basePrefix}/cars`, carRouter); 
  app.use(`${basePrefix}/categories`, categoryRoute);

  // Catch All
  app.all("/", (req: Request, res: Response) => {
    return res.status(404).json({
      status: "fail",
      message: `Route: ${req.originalUrl} not found`,
    });
  });

};

export default routeRegister;