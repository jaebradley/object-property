# `object-property`

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/object-property.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/object-property.svg?branch=master)](https://travis-ci.org/jaebradley/object-property)
[![codecov](https://codecov.io/gh/jaebradley/object-property/branch/master/graph/badge.svg)](https://codecov.io/gh/jaebradley/object-property)
[![npm](https://img.shields.io/npm/v/object-property.svg)](https://www.npmjs.com/package/object-property)
[![npm](https://img.shields.io/npm/dt/object-property.svg)](https://www.npmjs.com/package/object-property)

Instead of doing

```javascript
if (a && a.b && a.b.c && a.b.c.d) {
  doSomething(a.b.c.d);
}

if (a && a.b && a.b.c && a.b.c.d) {
  a.b.c.d = 'abcd';
}
```

do

```javascript
const abcd = get('b', 'c', 'd').from(a);
if (abcd) {
  doSomething(abcd);
}

set('a', 'b', 'c', 'd')
  .in(object)
  .to('abcd');
```

## API

### `exists`

Returns `boolean` if property exist in object.

```javascript
import { exists } from 'object-property';

const object = {
  a: 'a',
  b: {
    c: 'c',
    d: 'd',
  },
};

// True for object property
exists('a').in(object);

// True for prototype property
exists('toUpperCase').in('foo');

// True for nested property
exists('a', 'b').in(object);

// False for non-existent property
exists('d').in(object);

// False for non-existent nested property
exists('a', 'b').in(object);
```

### `get`

Gets value associated with object property. Returns `undefined` if property does not exist.

```javascript
import { get } from 'object-property';

const object = {
  a: 'a',
  b: {
    c: 'c',
    d: 'd',
  },
};

// 'a'
get('a').from(object);

// { c: 'c', d: 'd' }
get('a', 'b').from(object);

// undefined
get('foobar').from(object);
```

### `set`

Updates values associated with object property. Adds property if it doesn't exist.

```javascript
import { set } from 'object-property';

const object = {
  a: 'a',
  b: {
    c: 'c',
    d: 'd',
  },
};

set('a').in(object).to('jaebaebae');

/*
object now looks like

{
  a: 'jaebaebae',
  b: {
    c: 'c',
    d: 'd',
  },
}
*/

set('a', 'b').in(object).to('bae jadley');

/*
object now looks like

{
  a: 'jaebaebae',
  b: 'bae jadley',
}
*/

set('a', 'c', 'd').in(object).to('acd');

/*
object now looks like

{
  a: 'jaebaebae',
  b: 'bae jadley',
  c: { d: 'acd' },
}
*/

set('a', 'c', 'e').in(object).to('ace');

/*
object now looks like

{
  a: 'jaebaebae',
  b: 'bae jadley',
  c: {
    d: 'acd',
    e: 'ace',
  },
}
*/
```

### `remove`

Removes object property.

```javascript
import { remove } from 'object-property';

const object = {
  a: 'a',
  b: {
    c: 'c',
    d: 'd',
  },
};

remove('a').from(object);

/*
object now looks like

{
  b: {
    c: 'c',
    d: 'd',
  },
}
*/

remove('b', 'c', 'd').from(object);

/*
object now looks like

{
  b: { d: 'd' },
}
*/

remove('a').from(object);

/*
object now looks like

{
  b: { d: 'd' },
}
*/
```
