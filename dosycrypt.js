	import UTF8Str from './utf8str.js';
	import dosyrng from './dosyrng.js';
	import bytes from './dosybytes.js';
	const dosycrypt = {
		rng1: surface => dosyrng.d451( surface ),
		rng2: surface => dosyrng.d453( surface )
	};
	export default dosycrypt;

	// cross cutting concerns
		Object.assign( dosycrypt, {
			instance, include
		});
		function instance( algo ) {
			const inst = {
				round: () => source.round()
			};
			const source = algo( inst );
			source.round();
			return inst;
		}
		function include( vals, instance ) {
			vals.forEach( (val, index) => {
				instance.state[index] ^= val;
			});
		}
		function stringify( vals ) {
			return UTF8Str.fromBytes( vals );
		}
	// hash construction algorithms
	{
		const TURNS = 16;
		const BLOCK_SZ = 5;
		Object.assign( dosycrypt, {
			hash, test_hash
		});
		function hash( message, digest_sz, algo = dosycrypt.rng2 ) {
			const hasher = instance( algo );
			absorb( message, hasher ); 
			const digest = squeeze( message, digest_sz, hasher );
			return bytes.toHex( digest );
		}
		function absorb( message, hasher ) {
			const m = new UTF8Str( message ).bytes;
			let i = 0;
			while( i < m.length ) {
				const chunk = m.subarray(i, BLOCK_SZ); 
				include( chunk, hasher );
				let turns = TURNS;
				while( turns-- ) {
					hasher.round();
				}
				i += BLOCK_SZ;
			}
		}
		function squeeze( message, digest_sz, hasher ) {
			const digest = [];
			while( digest_sz ) {
				const next_slice = Math.min( BLOCK_SZ, digest_sz );
				digest.push( ...hasher.state.slice(0, next_slice) );
				digest_sz -= next_slice;
				let turns = TURNS;
				while( turns-- ) {
					hasher.round();
				}
			}
			return digest;
		}
		function test_hash() {
			const message = "THIS IS A TEST!"
			const digest = hash( message, 32 );
			//console.log( "Message", message, "hash", digest );
		}
	}
	// cipher construction algorithms
	{
		const KEY_SCHEDULE_ROUNDS = 32;
		Object.assign( dosycrypt, {
			encrypt, decrypt, schedule, test_cipher
		});
		function schedule( key, inst ) {
			const key_vals = new UTF8Str( key ).bytes;
			include( key_vals, inst );
			let turns = KEY_SCHEDULE_ROUNDS;
			while( turns-- ) {
				inst.round();
			}
		}
		function encrypt( key, plain, algo = dosycrypt.rng1, existing_instance ) {
			plain = new UTF8Str( plain ).bytes;
			const cipher = [];
			const inst = existing_instance || instance( algo );
			if ( !! key ) {
				schedule( key, inst );
			} 
			plain.forEach( val => {
				cipher.push( val ^ inst.round() );
			});
			return cipher;
		}
		function decrypt( key, cipher, algo = dosycrypt.rng1, existing_instance ) {
			cipher = bytes.fromBinary( cipher );
			const plain = [];
			const inst = existing_instance || instance( algo );
			if ( !! key ) {
				schedule( key, inst );
			}
			cipher.forEach( val => {
				plain.push( val ^ inst.round() );
			});
			
			return plain;
		}
		function test_cipher() {
			const message = "THIS IS A SECRET!"
			const key = "thisisakey";
			const cipher = encrypt( key, message );
			const cipher_string = bytes.toBinary( cipher );
			const plain = decrypt( key, cipher_string );
			//console.log( "Message", message, "key", key );
			//console.log( "cipher", bytes.toHex( cipher ) );
			//console.log( "plain", stringify( plain ) );
		}
	}
	// entropy collection algorithms
	{
		const RUN = 31;
		let count = 0, result = 0;
		let browser = false;
		Object.assign( dosycrypt, {
			collect_entropy_bytes, test_entropy
		});
		try {
			if ( self ) {
				browser = true; 
			}
		} catch( e ) {
			browser = false; 
		}
		// timestamp with high res
		function ts() {
			if ( ! browser ) {
				return process.hrtime()[1];
			} else if ( !! self.performance ) {
				return Math.round( self.performance.now() * 10 ); 
			} else {
				console.warn( "Date only - low res entropy warning!" );
				return Date.now();
			}
		}
		function float() {
			count += Math.PI/180; 
			result += Math.sin( count ) * Math.cos( count );
		}
		function time_float_run() {
			let run = RUN;
			const start = ts();
			while( run-- ) {
				float();
			}
			const end = ts();
			return end - start;
		}
		
		function collect_bits( n ) {
			const bits = [];
			while( n-- ) {
				bits.push( time_float_run() % 2 );
			}
			return bits;
		}
		function bits_to_bytes( bits ) {
			const bytes = [];
			while( bits.length ) {
				const val = parseInt( bits.splice(0,8).join(''), 2 );
				bytes.push( String.fromCharCode( val ) );
			}
			return bytes;
		}
		function collect_entropy_bytes( n = 32 ) {
			const bits = collect_bits( n * 8 );
			const binary = bits_to_bytes( bits );
			return binary.join('');
		}
		function test_entropy() {
			let run = 100;
			while( run--) {
				//console.log( "Float run time", time_float_run() );
			}
			//console.log( "32 bytes of entropy", bytes.bin2hex( collect_entropy_bytes() ));
			//console.log( "32 bytes of entropy", bytes.bin2hex( collect_entropy_bytes() ));
			//console.log( "32 bytes of entropy", bytes.bin2hex( collect_entropy_bytes() ));
			//console.log( "32 bytes of entropy", bytes.bin2hex( collect_entropy_bytes() ));
			//console.log( "32 bytes of entropy", bytes.bin2hex( collect_entropy_bytes() ));
		}
	}
	// initialization vector algorithms
	{
		const IV_ENTROPY_BYTES = 8;
		const IV_BYTES = 16;
		Object.assign( dosycrypt, { 
			generate_iv, test_iv
		} );
		function generate_iv( entropy_sz = IV_ENTROPY_BYTES, iv_sz = IV_BYTES ) {
			const bytes = dosycrypt.collect_entropy_bytes( entropy_sz );
			const digest = dosycrypt.hash( bytes, iv_sz );
			return digest;
		}
		function test_iv() {
			//console.log( "IV", generate_iv() );
		}
	}
	// full encryption and integrity algorithm
		/**
			Format
			Encryption: 
				E(K,IV):E(K+IV,data:H(IV:data))
			 Decryption:
				 Schedule K.
				 Decrypt DOSY
				 Decrypt IV up until ":" character.
				 Schedule IV.
				 Decrypt until end.
				 Split data from hash.
				 Append data to IV with ":" character.
				 Compute hash and check if matches. 
				 If matches return data. If does not match
				 return integity error, ( key incorrect or data is corrupted ).
		**/
	{
		const IV_ENTROPY = 15;
		const IV_SZ = 15;
		const HASH_SZ = 32;
		Object.assign( dosycrypt, {
			full_encrypt, full_decrypt, test_full_cipher, test_full_cipher2
		});
		function full_encrypt( data, key ) {
			const inst = instance( dosycrypt.rng1 );
			const iv = dosycrypt.generate_iv( IV_ENTROPY, IV_SZ );
			//console.log("IV", iv);
			// schedule key and encrypt iv
			const e_iv = bytes.toBinary( dosycrypt.encrypt( key, iv + ":", null, inst ) );
			// schedule iv
			dosycrypt.schedule( iv, inst );
			// form iv:data to hash it
			const hashable = iv + ":" + data;
			//console.log( "Hashable", hashable );
			// compute its hash 
			const hash = dosycrypt.hash( hashable, HASH_SZ );
			// form data:hash
			const plain = data + ":" + hash;
			// encrypt it
			const e_plain = bytes.toBinary( dosycrypt.encrypt( null, plain, null, inst ) );
			// combine
			const cipher = e_iv + e_plain;
			return cipher;
		}
		function full_decrypt( cipher, key ) {
			const inst = instance( dosycrypt.rng1 );
			dosycrypt.schedule( key, inst );
			const iv = [];
			const plain = [];
			let iv_str;
			let iv_mode = true;
			bytes.fromBinary( cipher ).forEach( val => {
				const p = val ^ inst.round();
				if ( iv_mode ) {
					if ( p == ":".charCodeAt(0) ) {
						iv_str = bytes.toBinary( iv );
						dosycrypt.schedule( iv_str, inst );
						iv_mode = false;
						return; // discard ":"
					}
					iv.push( p );
				} else {
					plain.push( p );
				}
			});
			let plain_str;
			//console.log( plain );
			try {
				plain_str = stringify( plain );
			} catch(e) {
				throw new TypeError( "Cannot decrypt." );
			}
			const hash_sep = plain_str.lastIndexOf( ":" );
			if ( hash_sep == -1 ) {
				throw new TypeError( "Cannot decrypt." );
			}
			const hash = plain_str.slice( hash_sep + 1 );
			const data = plain_str.slice( 0, hash_sep );
			const hashable = iv_str + ":" + data;
			const computed_hash = dosycrypt.hash( hashable, HASH_SZ );
			if ( hash == computed_hash ) {
				//console.log( "IV", iv_str, "plain", plain_str );
				//console.log( "Hashable", hashable );
				//console.log( "computed_hash", computed_hash );
				//console.log( "Computed hash equals. Data is valid." );
				const data = plain_str.slice(0, hash_sep );
				return data;
			} else {
				throw new TypeError( "Cannot decrypt." );
			}
		}
		function test_full_cipher() {
			const plain = "THIS IS SOME REAL DATA WOO";
			const key = "thisisasecretkey";
			//console.log( "Plain", plain, "key", key );
			const cipher = full_encrypt( plain, key );
			//console.log( "Cipher", bytes.bin2hex( cipher ) );
			const decrypted = full_decrypt( cipher, key );
			//console.log( "Decrypted", decrypted );
		}
		function test_full_cipher2() {
			const plain = "Foo © bar 𝌆 baz ☃ qux";
			const key = "thisisasecretkey";
			//console.log( "Plain", plain, "key", key );
			const cipher = full_encrypt( plain, key );
			//console.log( "Cipher", bytes.bin2hex( cipher ) );
			const decrypted = full_decrypt( cipher, key );
			//console.log( "Decrypted", decrypted );
		}
	}
	// tests
	{
		Object.assign( dosycrypt, {
			test_all 
		});
		function test_all() {
			dosycrypt.test_hash();
			dosycrypt.test_cipher();
			dosycrypt.test_iv();
			dosycrypt.test_entropy();
			dosycrypt.test_full_cipher();
			dosycrypt.test_full_cipher2();
		}
	}
	//dosycrypt.test_all();

