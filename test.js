  import dc from './dosycrypt.js';
  import xen from './index.js';

  test_all();

  function test_all() {
    test_hash();
    test_cipher();
    test_iv();
    test_entropy();
    test_full_cipher();
    test_full_cipher2();
    basic_test();
  }

  function test_hash() {
    const message = "THIS IS A TEST!"
    const digest = dc.hash( message, 32 );
    console.log( "Message", message, "hash", digest );
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
    while( run--) {
      console.log( "Float run time", dc.time_float_run() );
    }
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
    const decrypted = dc.full_decrypt( cipher, key );
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
  }

  function basic_test() {
    console.log("Empty hash", xen.hash(''));
    console.log("Empty kdf", xen.kdf(''));
    const cipher = xen.encrypt( ' ', ' ' );
    console.log("Empty encrypt", xen.bytes.bin2hex(cipher) );
    const decrypted = xen.decrypt( cipher, ' ' );
    console.log( "Decrypted", decrypted );
  }
