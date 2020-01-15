  import dosysponge from './dosysponge.js';

  const dosykdf = {
    kdf, test_kdf
  };
  // Node or Browser, either is fine 
	export default dosykdf;

  // kdf spec
    // rate - the size of the part of the sponge's internal state is is xored with new material and 
    // from which output material is extracted
    // capacity - the size of the part of the sponge's internal state that is not directly xored with
    // new source material, nor extracted from, but which is only updated using the sponge's internal
    // update function. Capacity is usually twice the desired collission resistance when used as a hash
    // sponge - a previous dosy sponge with state. note that rate and capacity are ignored if sponge is given
    // this permits us to do very long key derivations ( essentially running it as an RNG ), by breaking
    // the output up into manageable chunks at each kdf call, and passing the sponge in each time.
    // iterations - iterations specifies the number of times the sponge's internal
    // function is applied between absorbing in or squeezing out chunks of length 
    // less than or equal to rate
    // shift - the number of bits of each byte to shift by in the sponge's internal update function
    // out_format - the encoding in which to receive the derived key, 'hex', 'bytes', 'binary', or 'uint32s'
  function kdf( key = '', salt = '', output_length = 32, {
                              iterations : iterations = 8,
                              rate : rate = 8,
                              capacity : capacity = 1024,
                              shift : shift = 1,
                              out_format : out_format = 'hex',
                              sponge : sponge = null,             // allow the reentry of a previous sponge 
                              surface : surface = null,             // surface useful internals
                            } = {}) {
    const source = `${salt}:${key}`;
    sponge = sponge || new dosysponge.sponge( { rate, capacity, shift } );
    sponge.absorb( source, iterations );
    const formatted_derived_key = sponge.squeeze( output_length, { iterations , out_format } );
    if ( !! surface ) {
      Object.assign( surface, {
        source, sponge, formatted_derived_key,
        rate, capacity, iterations, shift, out_format
      });
    }
    return formatted_derived_key;
  }
  function test_kdf() {
    {
      const [key,salt] = ["",""];
      console.log( `key "${key}" salt "${salt}" kdf ${kdf(key, salt)}` );
    }
    {
      const [key,salt] = ["hello","goodbye"];
      console.log( `key "${key}" salt "${salt}" kdf ${kdf(key, salt)}` );
    }
    {
      const [key,salt] = ["hello","foodbye"];
      console.log( `key "${key}" salt "${salt}" kdf ${kdf(key, salt)}` );
    }
  }

