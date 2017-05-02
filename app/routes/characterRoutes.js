import express from 'express';
import CharaterController from '../controllers/characterController';

const initCharacterRoutes = () => {
  const characterRoutes = express.Router();

  characterRoutes.get('/', CharaterController.page);
  characterRoutes.get('/:name', CharaterController.show);

  return characterRoutes;
};

export default initCharacterRoutes;
