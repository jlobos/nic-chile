# nic-chile

[![Build Status](https://travis-ci.org/jlobos/nic-chile.svg?branch=master)](https://travis-ci.org/jlobos/nic-chile)
[![Greenkeeper badge](https://badges.greenkeeper.io/jlobos/nic-chile.svg)](https://greenkeeper.io/)

Dot cl domains (.cl) last registered, search, deleted and whois from nic.cl

## Install

```
$ npm install --save nic-chile
```

## Usage

```js
const cl = require('nic-chile')

cl.last('hour').then(console.log)
cl.search({q: 'nic.cl', filter: 'exacta'}).then(console.log)
cl.whois('nic.cl').then(console.log)
cl.deleted('day').then(console.log)
```

## API

### last(time)

Get last dot cl domains names registered in [nic.cl](http://www.nic.cl/registry/Ultimos.do).
- `time` - `string` register time of last domains (`hour`, `day`, `week`, `month`)

### search({q: 'unicorn', filter: 'contenga'})

Search dot cl domains.
- `q` - `string` query
- `filter` - `string` filter values (`exacta`, `contenga`, `comience`, `termine`)

### whois(domain) 

Whois from [nic.cl](http://www.nic.cl/registry/Whois.do).
- `domain` - `string` name of dot cl domain

### deleted(time)

Get list of last deleted domains available.
- `time` - `string` last `day` or `week`

## License

MIT © [Jesús Lobos](http://jlobos.com)
