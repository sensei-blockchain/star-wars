import express from 'express';
import ResidentController from '../controllers/residentController';

const initResidentRoutes = () => {
  const residentRoutes = express.Router();

  residentRoutes.get('/', ResidentController.page);

  return residentRoutes;
};

export default initResidentRoutes;
