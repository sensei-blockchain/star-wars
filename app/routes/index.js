import initCharacterRoutes from './characterRoutes';
import initResidentRoutes from './residentRoutes';

const initRoutes = (app) => {
  app.use('/characters', initCharacterRoutes());
  app.use('/planetresidents', initResidentRoutes());
};

export default initRoutes;
