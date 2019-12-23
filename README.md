# shindanmaker-js

診断メーカーで診断する。

## Installation

```sh
$ npm install dqn/shindanmaker-js
```

## Usage

```js
const shindan = require('shindanmaker-js');

const shindanId = 953698;
const name = 'DQN';

shindan.execute(shindanId, name).then(console.log);
// => センスは残念ながらありません。DQNとかちょっと意味不明です。もっと皆さんに...
```
