import Request from '../../lib/request';

const async = Promise.promisifyAll(require('async'));

export default class SWAPI {
  constructor() {
    const baseuri = 'http://swapi.co/api';
    this.client = new Request(baseuri);
    this.swapiDefaultPageSize = 10;
  }

  getCharacters() {
    const api = 'people/';
    return this._calcPagesAndFetchAll(api);
  }

  getCharactersBySize(size) {
    const api = 'people/';
    return this._fetchAll(api, size);
  }

  getCharacterByName(search) {
    const api = 'people/';
    const query = { search };
    return this.client.get(api, query);
  }

  getPlanets() {
    const api = 'planets/';
    return this._calcPagesAndFetchAll(api);
  }

  _calcPagesAndFetchAll(api) {
    return this.client.get(api, { page: 1 })
     .then(results => this._fetchAll(api, results.count));
  }

  _fetchAll(api, size) {
    const pages = Math.ceil(size / this.swapiDefaultPageSize);
    return async.timesSeriesAsync(pages, (page, done) => {
      this.client.get(api, { page: page + 1 })
       .then(people => done(null, people.results))
       .catch(done);
    });
  }
}
