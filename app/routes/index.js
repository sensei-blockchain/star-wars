import Router from 'express';
import initCharacterRoutes from './characterRoutes';
import initResidentRoutes from './residentRoutes';

const initVersion1Routes = (app) => {
  const v1Router = Router();

  v1Router.use('/characters', initCharacterRoutes());
  v1Router.use('/planetresidents', initResidentRoutes());

  return v1Router;
};

export default initVersion1Routes;
