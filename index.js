'use strict';

const rp = require('request-promise');
const decode = require('unescape');

const GET_RESULT_REGEXP = /quote: '(.+)?',$/m;
const CRAZY_ESCAPE_REGEXP = /&#0/g;

const client = rp.defaults({
  baseUrl: 'https://shindanmaker.com/',
  jar: true,
});

let initialized = false;

function setDefaultName() {
  return client.get('0')
    .then(() => true)
    .catch(() => false);
}

async function execute(shindanId, name) {
  if (!name && !initialized) {
    await setDefaultName();
    initialized = true;
  }

  const body = await client.post(String(shindanId), {
    formData: {
      u: name || '',
    },
  });

  return getResult(body);
}

function getResult(body) {
  const matches = body.match(GET_RESULT_REGEXP);

  if (!matches) {
    console.log(body);
    throw new Error('could not find result');
  }

  return decode(matches[1].replace(CRAZY_ESCAPE_REGEXP, '&#'), 'all');
}

module.exports = {
  execute,
};
