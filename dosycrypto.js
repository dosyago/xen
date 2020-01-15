  import dosyrng from './dosyrng.js';
  import dosykdf from './dosykdf.js';
  import dosycrypt from './dosycrypt.js';
  const dosycrypto = {
    encrypt : dosycrypt.full_encrypt,
    decrypt : dosycrypt.full_decrypt,
    hash: dosycrypt.hash,
    rng : dosyrng.custom,
    kdf : dosykdf.kdf
  }
  // Node or browser either is fine
	export default dosycrypto;

