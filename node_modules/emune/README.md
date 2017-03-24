emune
=====

![emune build status](https://circleci.com/gh/kyledetella/emune.png?circle-token=85d82baab410b3d494a5849a0ad4cc5da1e1902b)

A basic JavaScript [key mirror](https://sdgluck.github.io/2015/08/12/key-mirrors/) / enum utility.

> [`mune`](https://www.npmjs.com/package/mune) was taken. Kudos!


## Usage

```bash
$ npm install emune
```

```js
import emune from 'emune'

// Using an Array of keys
console.log(
  emune(['blackhawks', 'islanders', 'bruins'])
) // => {blackhawks: 'blackhawks', islanders: 'islanders', bruins: 'bruins'}

// Using an Object
console.log(
  emune({cubs: null, mets: null, 'red sox': null})
) // => {cubs: 'cubs', mets: 'mets', 'red sox': 'red sox'}
```

## Tests

```bash
$ npm t
```
