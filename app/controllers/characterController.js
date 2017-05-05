import _ from 'lodash';
import SWAPI from '../adapters/swapi';
import { BadRequestError } from '../errors';
import Responder from '../../lib/expressResponder';

const sw = new SWAPI();

export default class CharaterController {
  static page(req, res) {
    if (req.query.sort && !_.includes(['name', 'height', 'mass'], req.query.sort)) {
      throw new BadRequestError('Sorting only allowed for name, height & mass');
    }

    sw.getCharactersBySize(50)
     .then((characters) => {
        characters = _.chain(characters).flatten().forEach((character) => {
          character.height = parseInt(character.height.replace(',', ''), 10);
          character.mass = parseInt(character.mass.replace(',', ''), 10);
        });
        if (req.query.sort) {
          characters = characters.sortBy(req.query.sort);
        }
        return Responder.success(res, characters.value());
      })
     .catch(errorOnClientOp => Responder.operationFailed(res, errorOnClientOp));
  }

  static show(req, res) {
    sw.getCharacterByName(req.params.name)
     .then((character) => {
        if (character.results.length === 0) {
          throw new BadRequestError(`Character not found : ${req.params.name}`);
        }
        return res.render(`${__dirname}/../views/index`, {
          character: character.results[0],
        });
      })
     .catch(errorOnClientOp => Responder.operationFailed(res, errorOnClientOp));
  }
}
