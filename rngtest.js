import fs from 'fs';
import rng from './dosyrng.js';

const chunk = 1000000;
const words = (1024**3)/2;
const instance = rng.bs();

test_iterate();
test_1Gb();

function test_1Gb() {
  const buf = new ArrayBuffer(words*2);
  const store = new Uint16Array(buf);
  let i = 0;
  let threshold = 0;
  console.log(`Generating ${words} words...`);
  for( const val of instance ) {
    store[i] = val;
    i++;
    if ( i > words ) break;
    if ( i > threshold ) {
      console.log(`${(100*i/words).toFixed(2)}% done.`);
      threshold += chunk;
    }
  }

  console.log(`100% done. Writing...`);
  fs.writeFileSync('1gb.xen.rng.out.bin', Buffer.from(buf));
  console.log(`Wrote ${words*2} bytes.`);
}

function test_iterate() {
  let i = 0;
  for( const val of instance ) {
    if ( i++ > 20 ) break;
  }
}
