import _ from 'lodash';
import SWAPI from '../adapters/swapi';
import Responder from '../../lib/expressResponder';

const sw = new SWAPI();

export default class ResidentController {
  static page(req, res) {
    Promise.all([sw.getPlanets(), sw.getCharacters()])
     .then(results => {
        const planets = _.flatten(results[0]);
        const characters = _.flatten(results[1]);
        const residents = _.keyBy(characters, 'url');
        const planetresidents = {};
        _.map(planets, planet => {
          planetresidents[`${planet.name}`] = planet.residents.map(resident => residents[resident].name)
        });
        Responder.success(res, planetresidents)
      })
     .catch(errorOnClientOp => Responder.operationFailed(res, errorOnClientOp));
  }
}
