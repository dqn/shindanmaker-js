# shindanmaker-js

[![npm version](https://img.shields.io/npm/v/shindanmaker-js.svg)](https://www.npmjs.com/package/shindanmaker-js)
[![Build Status](https://travis-ci.com/dqn/shindanmaker-js.svg?branch=master)](https://travis-ci.com/dqn/shindanmaker-js)
[![codecov](https://codecov.io/gh/dqn/shindanmaker-js/branch/master/graph/badge.svg)](https://codecov.io/gh/dqn/shindanmaker-js)

Diagnose with shindan-maker.

## Installation

```sh
$ npm install shindanmaker-js
```

## Usage

```js
const shindan = require('shindanmaker-js');

const shindanId = 42;
const name = 'YOUR_NAME';

(async () => {
  const result = shindan.diagnose(shindanId, name);
  console.log(result);
})();
```

## API

### shindan.diagnose(shindanId[, name])

- `shindanId`: `string` | `number`
- `name`: `string`
- Returns: `Promise<string>`

## License

MIT
