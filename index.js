'use strict';

const wreck = require('wreck');

class MicroMetrics {
  constructor(host) {
    this.host = host;
  }

  track(type, tags, value, done) {
    if (typeof value === 'function') {
      done = value;
      value = null;
    }

    wreck.post(`${this.host}/api/track`, {
      json: true,
      payload: JSON.stringify({
        type,
        tags,
        value
      })
    }, (err, resp, payload) => {
      if (err) {
        return done(err);
      }

      if (resp.statusCode !== 200) {
        return done(new Error(`Metrics API returned status code of ${resp.statusCode}`));
      }

      done(null, payload);
    });
  }
}

module.exports = MicroMetrics;
