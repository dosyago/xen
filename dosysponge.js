  import dosyrng from './dosyrng.js';
  const dosysponge = {
  };
	export default dosysponge;
  const DEFAULT_TURNS = 4;
  const DEFAULT_OUTPUT_SZ = 32;
  const $ = Symbol(`[[DosySpongeInternal]]`);

  // sponge, its internals and some basic tests
    class DosySpongePrivates {
      constructor( { rate, capacity, shift } ) {
        const state_sz = rate * capacity;
        if ( capacity < 4 ) {
          throw new TypeError( 'dosysponge is not viable with a state less than 4 octets (bytes) / 32 bits.' );
        }
        if ( shift & 3 == 0 ) {
          throw new TypeError( 'dosysponge requires a bit shift value that is not divisible by 8.' );
        }
        const mixing_function = mixing_function_instance( { state_sz, shift } );
        Object.defineProperty( this, 'mixing_function', { value : mixing_function } );
        Object.assign( this, {
          rate, capacity, shift, state_sz 
        });
        Object.freeze( this );
      }
    }
    class DosySponge {
      constructor( { 
                          seed : seed = 0,
                          rate : rate = 8,                // octets
                          capacity : capacity = 18,       // octets 
                          shift : shift = 1               // bits
                       } = {} ) {
        if ( ! new.target ) {
          return new sponge( { seed, rate, capacity, shift } );
        }
        const privates = new DosySpongePrivates( { rate, capacity, shift } );
        Object.defineProperty( this, $, { value : privates } );
        Object.freeze( this );
        if ( !! seed ) {
          this.absorb_int( seed );
        }
      }
      absorb( message = '', iterations = DEFAULT_TURNS ) {
        const mix = this[$].mixing_function;
        const m = getBytes( message );
        let i = 0, j = this.rate;
        while( i < m.length ) {
          const chunk = m.subarray(i, j); 
          include( chunk, mix.state, this.capacity );
          let turns = iterations;
          while( turns-- ) {
            mix.round();
          }
          i = j;
          j += this.rate;
        }
        return this;
      }
      squeeze( output_sz = DEFAULT_OUTPUT_SZ, { 
                                                out_format: out_format = 'hex',
                                                iterations: iterations = DEFAULT_TURNS 
                                              } = {} ) {
        const mix = this[$].mixing_function;
        const output = new Uint32Array( output_sz );
        let i = 0;
        while( output_sz ) {
          // add the 'r' portion of the state to the output
          const slice = Math.min( this.rate, output_sz );
          output.set( extract( slice, mix.state, this.capacity ), i );
          output_sz -= slice;
          i += slice;
          // turn the mixing function 
          let turns = iterations;
          while( turns-- ) {
            mix.round();
          }
        }
        return format( output, out_format );
      }
      absorb_int( int = 0, iterations = DEFAULT_TURNS ) {
        const int_bytes = intToBytes( int );
        return this.absorb( int_bytes, iterations );
      }
      static get DEFAULT_TURNS() {
        return DEFAULT_TURNS;
      }
      static get DEFAULT_OUTPUT_SZ() {
        return DEFAULT_OUTPUT_SZ;
      }
      get rate() {
        return this[$].rate;
      }
      get capacity() {
        return this[$].capacity;
      }
      get shift() {
        return this[$].shift;
      }
    }
    // alias
    const sponge = DosySponge;
    Object.assign( dosysponge, { 
      sponge, DosySponge, test_sponge
    });
    function test_sponge() {
      const message = "THIS IS A TEST!"
      let output;
      output = new sponge().absorb( message ).squeeze( 32, { out_format : 'hex' } );
      console.log( "Message", message, "sponge hex", output );
      output = new sponge().absorb( message ).squeeze( 32, { out_format : 'bytes' } );
      console.log( "Message", message, "sponge bytes", output );
      output = new sponge().absorb( message + "1" ).squeeze( 32, { out_format : 'hex' } );
      console.log( "Message", message + "1", "sponge binary", output );
      output = new sponge().absorb( message ).squeeze( 32, { out_format : 'uint32s' } );
      console.log( "Message", message, "sponge uint32s", output );
    }
  // cross cutting concerns
    function mixing_function_instance( { state_sz, shift } ) {
      const inst = {
        round: () => source.round()
      };
      const source = dosyrng.custom( state_sz, shift, inst );
      source.round();
      return inst;
    }
    function getBytes( message ) {
      // FIXME: `.charCodeAt(0)` does not account for Unicode
      const padding_number = intToBytes( message.length + 1 );
      const m = new Uint32Array( message.length + padding_number.length );
      // fill m with the byte values of message 
      if ( typeof message == "string" ) {
        m.set( message.split('').map( str => str.charCodeAt(0) ) );
      } else if ( message.constructor == Uint32Array ) {
        m.set( message );
      } else {
        throw new TypeError( `Sorry. Currently sponge only accepts messages that are Strings or Uint32Array arrays.` );
      }
      // pad with length 
      // SECURITY : as we use 32 bits to code length this is degenerate for lengths equal modulo 2**32
      m.set( padding_number, message.length );
      return m;
    }
    function intToBytes( int ) {
      const int_buf = new ArrayBuffer(4);
      const int_bytes = new Uint32Array(int_buf);
      const int_cast = new Uint32Array(int_buf); 
      int_cast[0] = int;
      return int_bytes;
    }
    function extract( num, state, capacity ) {
      const slice = new Uint32Array( num );
      for( let i = 0, j = 0; i < num; i += 1, j += capacity ) {
        slice[i] = state[j];
      }
      return slice;
    }
    function include( vals, state, capacity ) {
      const num = vals.length;
      for( let i = 0, j = 0; i < num; i += 1, j += capacity ) {
        state[j] ^= vals[i];
      }
    }
    function format( bytes, out_format ) {
      let result = '';
      if ( out_format == 'hex' ) {
        bytes.forEach( v => result += pad_output( 8, v.toString(16)) );
      } else if ( out_format == 'binary' ) {
        bytes.forEach( v => result += String.fromCodePoint(v) );
      } else if ( out_format == 'bytes' ) {
        result = new Uint32Array( bytes );
      } else if ( out_format = 'uint32s' ) {
        result = new Uint32Array( bytes.buffer );
      } else {
        throw new TypeError( `Sorry, out format ${out_format} is not supported.` );
      }
      return result;
    }
    function pad_output( width, s ) {
      const required = Math.max( 0, width - s.length );
      const pad = new Array( required + 1 ).join('0');
      return pad + s;
    }

