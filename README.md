# xen ![npm downloads](https://img.shields.io/npm/dt/xen) ![npm version](https://img.shields.io/npm/v/xen)

crypto tools

## construction

constructed using slow, novel and mostly unknown primitives that pass SMHasher, Dieharder and Practrand, combined using standard constructions like sponge, to produce a hash, a KDF, and symmetric encryption.

## disclaimer

no claims are made regarding the security of this system. 

## get

```console
npm i --save xen
```

## include

As a Node ES module:

```javascript
import xen from 'xen';
```

As old style modules:

```javascript
const xen = require('xen').default;
```

Using [Snowpack](https://github.com/pikapkg/snowpack) in a web app:

```javascript
import xen from './web_modules/xen.js';
```

## api

```javascript

xen.hash('');
xen.kdf('');
xen.decrypt(xen.encrypt(' ',' '),' '); // ' '

```

*Note does not currently support empty data or empty keys for encryption / decryption.*

**For more API options, see the code**.

## technical details

Internally theres 360 bits of state by default, but you can tune that. 

