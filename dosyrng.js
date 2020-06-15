  import {beamsplitter, state32} from 'beamsplitter';

  // DOSYRNG - A family of 32-bit PRNGs ( CSPRNGs ) that are extraordinarily simple & pass PracRand
  // For ref of PracRand - http://pracrand.sourceforge.net/
  // To access the state ( to say, 'key' the generator ), pass in a 'surface' object
  const BI_MAX = 0x10ffffn;
  const MAX = 0x10ffff;
  const dosyrng = {
    bs: surface => iterator( null, null, surface),
    d451: surface => iterator( 45, 1, surface ), // passes PracRand
    d453: surface => iterator( 45, 3, surface ), // passes PracRand
    custom: iterator // other values are untested. Set your own!
  };
  // Node.js or Browser, either is fine
	export default dosyrng;

  // The main DOSY round function very simple and easy to memorize
  function update( s, SZ, shift ) {
    let j = SZ-1;
    let sum = 1;
    for( let i = 0; i < SZ; i++ ) {
      s[j] ^= (s[i] >> shift) ^ (sum << shift);
      s[i] += s[j] + 1;
      j = ( j + 1 ) % SZ;
      sum += s[i];
    }
    return sum % MAX;
  }
  // An iterator wrapper to create the state and turn the round function
  function iterator( state_sz = 45 /* double words */, shift = 1 /* bits */, surface = {} /* .s is the state */) {
    let s 
    let update_state;
    if ( state_sz && shift ) {
      s = new Uint32Array(state_sz);
      update_state = update.bind( null, s, state_sz, shift );
    } else {
      s = new Uint32Array(8);
      s = state32;
      update_state = () => {
        const X = s.reduce((S,x) => S+'/'+x.toString(16), 'xen');
        console.log({X, s});
        return Number(beamsplitter(X, 92133) % BI_MAX);
      };
    }
    expose( surface, 'state', s );
    return {
      round() {
        return update_state();
      },
      [Symbol.iterator]() {
        return make_iterable( { 
          func_source: update_state, 
          max_iterations: this.length 
        } );
      }
    };
  }
  function make_iterable( { 
      func_source : func_source = () => 0, 
      max_iterations : max_iterations = null } = {} 
    ) {
      if ( Number.isInteger(max_iterations) ) {
        const length = max_iterations;
        let i = 0;
        return {
          next() {
            if ( i < length ) {
              i++;
              return { value : func_source(), done : false };
            } else {
              return { done: true }; 
            }
          }
        };
      } else {
        return {
          next() {
            return { value : func_source(), done : false };
          }
        }
      }
  }
  function expose( obj, key, val ) {
    Object.defineProperty( obj, key, { enumerable: true, get : () => val } );
  }

