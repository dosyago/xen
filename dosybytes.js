  const dosybytes = {
    bin2hex, hex2bin,
    toBinary, toHex, 
    fromBinary, fromHex,
    pad
  };

	export default dosybytes;

  function bin2hex( binstr ) {
    return toHex( fromBinary( binstr ) );
  }
  function hex2bin( hexstr ) {
    return toBinary( fromHex( hexstr ) );
  }
  function toHex( bytes ) {
    return Array.from( bytes ).reduce( (hs,bv) => hs + pad( bv.toString(16), 2, '0', true ), "" );
  }
  function fromHex( hexstr ) {
    return new Uint8Array( Array.from( hexstr ).reduce( 
      (pa,c,i) => i % 2 ? (pa[pa.length-1]+=c, pa) : (pa.push(c), pa) ,
      []
    ).reduce( 
      (ba,hn) => (ba.push( parseInt(hn, 16)), ba),
      []
    ) );
  }

  function pad( str, width, char, left, right ) {
    const padding_length = Math.max( 0, width - str.length );
    const padding = new Array( padding_length + 1 ).join( char );
    if( left ) {
      str = padding + str
    }
    if ( right ) {
      str = str + padding;
    }
    return str;
  }
  
  function toBinary(bytes) {
    const bs = [];
    for( const byte of bytes ) {
      bs.push(String.fromCharCode(byte));
    }
    return bs.join('');
  }

  function fromBinary(str) {
    const b = [];
    for( const char of str ) {
      b.push(char.charCodeAt(0));
    }
    return new Uint16Array(b);
  }
