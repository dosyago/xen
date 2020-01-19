  import assert from 'assert';
  import dc from './dosycrypt.js';
  import xen from './index.js';

  test_all();

  function test_all() {
    test_hash();
    test_cipher();
    test_iv();
    test_entropy();
    test_full_cipher();
    //test_full_cipher2();
    test_full_cipher3();
    test_full_cipher4();
    basic_test();
  }

  function test_hash() {
    let message = "1. THIS IS A TEST!"
    const digest = dc.hash( message, 32 );
    const digestB = dc.hash( message, 32 );
    console.log( "Message  ", message, "hash", digest );
    message += '!';
    const digest2 = dc.hash( message, 32 );
    console.log( "Message ", message, "hash", digest2 );
    message += '!';
    const digest3 = dc.hash( message, 32 );
    console.log( "Message", message, "hash", digest3 );
    assert(digest == digestB, "Hash should be same");
    assert(digest != digest2, "Hash should be different");
    assert(digest != digest3, "Hash should be different");
    assert(digest2 != digest3, "Hash should be different");
    const d = dc.hash("HELLO WORLD", 32);
    for( let i = 0 ; i < 1000; i ++ ) {
      const d2 = dc.hash("HELLO WORLD", 32); 
      if ( d != d2 ) {
        console.log("Hash not equal", d, d2);
        throw new TypeError('hash');
      }
    }
  }

  function test_cipher() {
    const message = "THIS IS A SECRET!"
    const key = "thisisakey";
    const cipher = dc.encrypt( key, message );
    const cipher_string = dc.bytes.toBinary( cipher );
    const plain = dc.decrypt( key, cipher_string );
    console.log( "Message", message, "key", key );
    console.log( "cipher", dc.bytes.toHex( cipher ) );
    console.log( "plain", dc.stringify( plain ) );
  }

  function test_iv() {
    console.log( "IV", dc.generate_iv() );
  }

  function test_entropy() {
    let run = 100;
    let min = 100000;
    let max = 0;
    while( run--) {
      //console.log( "Float run time", dc.time_float_run() );
      const rt = dc.time_float_run();
      if ( rt > max ) {
        max = rt;
      }
      if ( rt < min ) {
        min = rt;
      }
    }
    console.log(`Float run range from ${min} to ${max}`);
    console.log( "32 bytes of entropy", dc.bytes.bin2hex( dc.collect_entropy_bytes() ));
    console.log( "32 bytes of entropy", dc.bytes.bin2hex( dc.collect_entropy_bytes() ));
    console.log( "32 bytes of entropy", dc.bytes.bin2hex( dc.collect_entropy_bytes() ));
    console.log( "32 bytes of entropy", dc.bytes.bin2hex( dc.collect_entropy_bytes() ));
    console.log( "32 bytes of entropy", dc.bytes.bin2hex( dc.collect_entropy_bytes() ));
  }

  function test_full_cipher() {
    const plain = "THIS IS SOME REAL DATA WOO";
    const key = "thisisasecretkey";
    console.log( "Plain", plain, "key", key );
    const cipher = dc.full_encrypt( plain, key );
    console.log( "Cipher", dc.bytes.bin2hex( cipher ) );
    const decrypted = dc.full_decrypt( dc.bytes.hex2bin(dc.bytes.bin2hex(cipher)), key );
    assert.equal(plain,decrypted);
    console.log( "Decrypted", decrypted );
  }

  function test_full_cipher2() {
    const plain = "Foo © bar 𝌆 baz ☃ qux";
    const key = "thisisasecretkey";
    console.log( "Plain", plain, "key", key );
    const cipher = dc.full_encrypt( plain, key );
    console.log( "Cipher", dc.bytes.bin2hex( cipher ) );
    const decrypted = dc.full_decrypt( cipher, key );
    console.log( "Decrypted", decrypted );
    console.log(dc.bytes.fromBinary(plain), dc.bytes.fromBinary(decrypted));
    assert.equal(plain,decrypted);
  }

  function test_full_cipher3() {
    const plain = "";
    const key = "";
    console.log( "Plain", plain, "key", key );
    const cipher = dc.full_encrypt( plain, key );
    console.log( "Cipher", dc.bytes.bin2hex( cipher ) );
    const decrypted = dc.full_decrypt( dc.bytes.hex2bin(dc.bytes.bin2hex(cipher)), key );
    assert.equal(plain,decrypted);
    console.log( "Decrypted", decrypted );
  }

  function test_full_cipher4() {
    const plain = "今天你在做什么？";
    const key = "excellent";
    console.log( "Plain", plain, "key", key );
    const cipher = dc.full_encrypt( plain, key );
    const cipher2 = dc.bytes.hex2bin(dc.bytes.bin2hex(cipher));
    const a = dc.bytes.bin2hex(cipher);
    const b= dc.bytes.bin2hex(cipher2);
    //console.log(a,b);
    assert.equal(a,b);
    const decrypted = dc.full_decrypt( cipher2, key );
    console.log( "Cipher", dc.bytes.bin2hex( cipher ) );
    assert.equal(plain,decrypted);
    console.log( "Decrypted", decrypted );
  }

  function basic_test() {
    console.log("Empty hash", xen.hash(''));
    console.log("Empty kdf", xen.kdf(''));
    const cipher = xen.encrypt( ' ', ' ' );
    console.log("Empty encrypt", xen.bytes.bin2hex(cipher) );
    const decrypted = xen.decrypt( cipher, ' ' );
    console.log( "Decrypted", decrypted );
  }



