  import UTF8Str from 'utf8str';

  const dosybytes = {
    bin2hex, hex2bin,
    toBinary, toHex, 
    fromBinary, fromHex,
    pad
  };

	export default dosybytes;

  function toBinary( bytes ) {
    if ( typeof bytes == "string" ) {
      bytes = new UTF8Str(bytes).bytes;
    }
    return Array.from( bytes ).reduce( (bs,bv) => bs + String.fromCharCode(bv), "" );
  }
  function bin2hex( binstr ) {
    return toHex( fromBinary( binstr ) );
  }
  function hex2bin( hexstr ) {
    return toBinary( fromHex( hexstr ) );
  }
  function toHex( bytes ) {
    if ( typeof bytes == "string" ) {
      bytes = new UTF8Str(bytes).bytes;
    }
    return Array.from( bytes ).reduce( (hs,bv) => hs + pad( bv.toString(16), 2, '0', true ), "" );
  }
  function fromBinary( binstr ) {
    return new Uint8Array( Array.from( binstr ).reduce( (ba,c) => (ba.push(c.charCodeAt(0)), ba), [] ) );
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

