# :alien: [xen](https://github.com/dosyago/xen) ![npm downloads](https://img.shields.io/npm/dt/xen) ![npm version](https://img.shields.io/npm/v/xen)

**Crypto Tools**

Want to play with some message-verified encryption and hashing? See a [live code sandbox here](https://codesandbox.io/s/xen-crypto-explorer-bkf7n?from-embed).


**Please consider this primitive insecure as it does not pass SMHasher**

## construction

constructed using slow, novel and mostly unknown primitives that pass Dieharder and Practrand, combined using standard constructions like sponge, to produce a hash, a KDF, and symmetric encryption.

## disclaimer

no claims are made regarding the security of this system. 

## get

```console
npm i --save xen
```

## include

As a Node ES module:

```javascript
import xen from 'xen';
```

As old style modules:

```javascript
const xen = require('xen').default;
```

Using [Snowpack](https://github.com/pikapkg/snowpack) in a web app:

```javascript
import xen from './web_modules/xen.js';
```

## api

```javascript

xen.hash('');
xen.kdf('');
xen.decrypt(xen.encrypt(' ',' '),' '); // ' '

```

**For more API options, see the code**.

## technical details

Internally there's 1440 bits of state by default, but you can tune that. 

*We use the whole Unicode codepoint space (0 - 0x10ffff) and the hex encoding is to 6 nibbles which means in hex the range of values at some points appears to not vary, even tho underlying values evenly cover the full codepoint space.*

## Testing results

The below results are for the standard 45 double words, 1 shift variant, with output coerced to word (16-bit) size:

```text
cris@instance-10:~/xen$ dieharder -a -f 1gb.xen.rng.out.bin
#=============================================================================#
#            dieharder version 3.31.1 Copyright 2003 Robert G. Brown          #
#=============================================================================#
   rng_name    |           filename             |rands/second|
        mt19937|             1gb.xen.rng.out.bin|  1.27e+08  |
#=============================================================================#
        test_name   |ntup| tsamples |psamples|  p-value |Assessment
#=============================================================================#
   diehard_birthdays|   0|       100|     100|0.96036831|  PASSED
      diehard_operm5|   0|   1000000|     100|0.71573705|  PASSED
  diehard_rank_32x32|   0|     40000|     100|0.12596747|  PASSED
    diehard_rank_6x8|   0|    100000|     100|0.47240559|  PASSED
   diehard_bitstream|   0|   2097152|     100|0.01030500|  PASSED
        diehard_opso|   0|   2097152|     100|0.96209734|  PASSED
        diehard_oqso|   0|   2097152|     100|0.80851926|  PASSED
         diehard_dna|   0|   2097152|     100|0.29672829|  PASSED
diehard_count_1s_str|   0|    256000|     100|0.84686403|  PASSED
diehard_count_1s_byt|   0|    256000|     100|0.51561248|  PASSED
 diehard_parking_lot|   0|     12000|     100|0.89904007|  PASSED
    diehard_2dsphere|   2|      8000|     100|0.90053192|  PASSED
    diehard_3dsphere|   3|      4000|     100|0.19410570|  PASSED
     diehard_squeeze|   0|    100000|     100|0.57065250|  PASSED
        diehard_sums|   0|       100|     100|0.00418511|   WEAK
        diehard_runs|   0|    100000|     100|0.28503122|  PASSED
        diehard_runs|   0|    100000|     100|0.05366866|  PASSED
       diehard_craps|   0|    200000|     100|0.94251083|  PASSED
       diehard_craps|   0|    200000|     100|0.34371970|  PASSED
 marsaglia_tsang_gcd|   0|  10000000|     100|0.27545125|  PASSED
 marsaglia_tsang_gcd|   0|  10000000|     100|0.56598849|  PASSED
         sts_monobit|   1|    100000|     100|0.91612258|  PASSED
            sts_runs|   2|    100000|     100|0.49511769|  PASSED
          sts_serial|   1|    100000|     100|0.72213059|  PASSED
          sts_serial|   2|    100000|     100|0.76679286|  PASSED
          sts_serial|   3|    100000|     100|0.83514048|  PASSED
          sts_serial|   3|    100000|     100|0.81030450|  PASSED
          sts_serial|   4|    100000|     100|0.82768617|  PASSED
          sts_serial|   4|    100000|     100|0.46754443|  PASSED
          sts_serial|   5|    100000|     100|0.96120788|  PASSED
          sts_serial|   5|    100000|     100|0.97323946|  PASSED
          sts_serial|   6|    100000|     100|0.60306737|  PASSED
          sts_serial|   6|    100000|     100|0.37851658|  PASSED
          sts_serial|   7|    100000|     100|0.02575350|  PASSED
          sts_serial|   7|    100000|     100|0.08416806|  PASSED
          sts_serial|   8|    100000|     100|0.24489456|  PASSED
          sts_serial|   8|    100000|     100|0.03831823|  PASSED
          sts_serial|   9|    100000|     100|0.96478415|  PASSED
          sts_serial|   9|    100000|     100|0.70819202|  PASSED
          sts_serial|  10|    100000|     100|0.99546807|   WEAK
          sts_serial|  10|    100000|     100|0.98543310|  PASSED
          sts_serial|  11|    100000|     100|0.18371832|  PASSED
          sts_serial|  11|    100000|     100|0.90420599|  PASSED
          sts_serial|  12|    100000|     100|0.04089707|  PASSED
          sts_serial|  12|    100000|     100|0.10797428|  PASSED
          sts_serial|  13|    100000|     100|0.05549032|  PASSED
          sts_serial|  13|    100000|     100|0.24133768|  PASSED
          sts_serial|  14|    100000|     100|0.17077136|  PASSED
          sts_serial|  14|    100000|     100|0.64065524|  PASSED
          sts_serial|  15|    100000|     100|0.56244057|  PASSED
          sts_serial|  15|    100000|     100|0.99904728|   WEAK
          sts_serial|  16|    100000|     100|0.40001248|  PASSED
          sts_serial|  16|    100000|     100|0.56049399|  PASSED
         rgb_bitdist|   1|    100000|     100|0.49050454|  PASSED
         rgb_bitdist|   2|    100000|     100|0.30143259|  PASSED
         rgb_bitdist|   3|    100000|     100|0.60823421|  PASSED
         rgb_bitdist|   4|    100000|     100|0.89386079|  PASSED
         rgb_bitdist|   5|    100000|     100|0.94773587|  PASSED
         rgb_bitdist|   6|    100000|     100|0.69181612|  PASSED
         rgb_bitdist|   7|    100000|     100|0.11613717|  PASSED
         rgb_bitdist|   8|    100000|     100|0.94271484|  PASSED
         rgb_bitdist|   9|    100000|     100|0.23143010|  PASSED
         rgb_bitdist|  10|    100000|     100|0.54497828|  PASSED
         rgb_bitdist|  11|    100000|     100|0.79666201|  PASSED
         rgb_bitdist|  12|    100000|     100|0.36608128|  PASSED
rgb_minimum_distance|   2|     10000|    1000|0.25059883|  PASSED
rgb_minimum_distance|   3|     10000|    1000|0.92905486|  PASSED
rgb_minimum_distance|   4|     10000|    1000|0.13050872|  PASSED
rgb_minimum_distance|   5|     10000|    1000|0.16362617|  PASSED
    rgb_permutations|   2|    100000|     100|0.03772893|  PASSED
    rgb_permutations|   3|    100000|     100|0.71575472|  PASSED
    rgb_permutations|   4|    100000|     100|0.69498931|  PASSED
    rgb_permutations|   5|    100000|     100|0.26300596|  PASSED
      rgb_lagged_sum|   0|   1000000|     100|0.49280475|  PASSED
      rgb_lagged_sum|   1|   1000000|     100|0.92466157|  PASSED
      rgb_lagged_sum|   2|   1000000|     100|0.70364648|  PASSED
      rgb_lagged_sum|   3|   1000000|     100|0.98901563|  PASSED
      rgb_lagged_sum|   4|   1000000|     100|0.10279447|  PASSED
      rgb_lagged_sum|   5|   1000000|     100|0.78100130|  PASSED
      rgb_lagged_sum|   6|   1000000|     100|0.73941744|  PASSED
      rgb_lagged_sum|   7|   1000000|     100|0.96851717|  PASSED
      rgb_lagged_sum|   8|   1000000|     100|0.03791670|  PASSED
      rgb_lagged_sum|   9|   1000000|     100|0.85495473|  PASSED
      rgb_lagged_sum|  10|   1000000|     100|0.09857342|  PASSED
      rgb_lagged_sum|  11|   1000000|     100|0.98061275|  PASSED
      rgb_lagged_sum|  12|   1000000|     100|0.92620080|  PASSED
      rgb_lagged_sum|  13|   1000000|     100|0.84801927|  PASSED
      rgb_lagged_sum|  14|   1000000|     100|0.91634331|  PASSED
      rgb_lagged_sum|  15|   1000000|     100|0.42431580|  PASSED
      rgb_lagged_sum|  16|   1000000|     100|0.35895106|  PASSED
      rgb_lagged_sum|  17|   1000000|     100|0.76407463|  PASSED
      rgb_lagged_sum|  18|   1000000|     100|0.71788511|  PASSED
      rgb_lagged_sum|  19|   1000000|     100|0.58594585|  PASSED
      rgb_lagged_sum|  20|   1000000|     100|0.43899939|  PASSED
      rgb_lagged_sum|  21|   1000000|     100|0.14719679|  PASSED
      rgb_lagged_sum|  22|   1000000|     100|0.45508404|  PASSED
      rgb_lagged_sum|  23|   1000000|     100|0.99049379|  PASSED
      rgb_lagged_sum|  24|   1000000|     100|0.53705886|  PASSED
      rgb_lagged_sum|  25|   1000000|     100|0.68011403|  PASSED
      rgb_lagged_sum|  26|   1000000|     100|0.65388169|  PASSED
      rgb_lagged_sum|  27|   1000000|     100|0.88683464|  PASSED
      rgb_lagged_sum|  28|   1000000|     100|0.94040782|  PASSED
      rgb_lagged_sum|  29|   1000000|     100|0.87568565|  PASSED
      rgb_lagged_sum|  30|   1000000|     100|0.38911682|  PASSED
      rgb_lagged_sum|  31|   1000000|     100|0.19874888|  PASSED
      rgb_lagged_sum|  32|   1000000|     100|0.08649854|  PASSED
     rgb_kstest_test|   0|     10000|    1000|0.81752438|  PASSED
     dab_bytedistrib|   0|  51200000|       1|0.64475585|  PASSED
             dab_dct| 256|     50000|       1|0.83524643|  PASSED
Preparing to run test 207.  ntuple = 0
        dab_filltree|  32|  15000000|       1|0.75032073|  PASSED
        dab_filltree|  32|  15000000|       1|0.08097498|  PASSED
Preparing to run test 208.  ntuple = 0
       dab_filltree2|   0|   5000000|       1|0.98227270|  PASSED
       dab_filltree2|   1|   5000000|       1|0.74040798|  PASSED
Preparing to run test 209.  ntuple = 0
        dab_monobit2|  12|  65000000|       1|0.96511344|  PASSED
```

The below results are for an 18-byte, 1 shift variant.

*The regular variant is 45-double words, 1 shift.*

### Dieharder

```text
Bytes: 1049999851 
TOTAL 115
PASSED = 113
WEAK = 2
FAILED = 0
#=============================================================================#
#            dieharder version 3.31.1 Copyright 2003 Robert G. Brown          #
#=============================================================================#
   rng_name    |           filename             |rands/second|
 file_input_raw|                  r181.split.out|  4.75e+07  |
#=============================================================================#
        test_name   |ntup| tsamples |psamples|  p-value |Assessment
#=============================================================================#
   diehard_birthdays|   0|       100|     100|0.92723929|  PASSED  
      diehard_operm5|   0|   1000000|     100|0.47760232|  PASSED  
  diehard_rank_32x32|   0|     40000|     100|0.03910271|  PASSED  
# The file file_input_raw was rewound 1 times
    diehard_rank_6x8|   0|    100000|     100|0.94121630|  PASSED  
# The file file_input_raw was rewound 1 times
   diehard_bitstream|   0|   2097152|     100|0.44695602|  PASSED  
# The file file_input_raw was rewound 2 times
        diehard_opso|   0|   2097152|     100|0.43179769|  PASSED  
# The file file_input_raw was rewound 2 times
        diehard_oqso|   0|   2097152|     100|0.41859610|  PASSED  
# The file file_input_raw was rewound 2 times
         diehard_dna|   0|   2097152|     100|0.17040425|  PASSED  
# The file file_input_raw was rewound 2 times
diehard_count_1s_str|   0|    256000|     100|0.82902815|  PASSED  
# The file file_input_raw was rewound 3 times
diehard_count_1s_byt|   0|    256000|     100|0.71179584|  PASSED  
# The file file_input_raw was rewound 3 times
 diehard_parking_lot|   0|     12000|     100|0.99690014|   WEAK   
# The file file_input_raw was rewound 3 times
    diehard_2dsphere|   2|      8000|     100|0.93277148|  PASSED  
# The file file_input_raw was rewound 3 times
    diehard_3dsphere|   3|      4000|     100|0.45783669|  PASSED  
# The file file_input_raw was rewound 4 times
     diehard_squeeze|   0|    100000|     100|0.26785435|  PASSED  
# The file file_input_raw was rewound 4 times
        diehard_sums|   0|       100|     100|0.05890031|  PASSED  
# The file file_input_raw was rewound 4 times
        diehard_runs|   0|    100000|     100|0.19139022|  PASSED  
        diehard_runs|   0|    100000|     100|0.07485795|  PASSED  
# The file file_input_raw was rewound 4 times
       diehard_craps|   0|    200000|     100|0.05325070|  PASSED  
       diehard_craps|   0|    200000|     100|0.56034223|  PASSED  
# The file file_input_raw was rewound 12 times
 marsaglia_tsang_gcd|   0|  10000000|     100|0.21589144|  PASSED  
 marsaglia_tsang_gcd|   0|  10000000|     100|0.00031067|   WEAK   
# The file file_input_raw was rewound 12 times
         sts_monobit|   1|    100000|     100|0.87082252|  PASSED  
# The file file_input_raw was rewound 12 times
            sts_runs|   2|    100000|     100|0.41938494|  PASSED  
# The file file_input_raw was rewound 12 times
          sts_serial|   1|    100000|     100|0.06958963|  PASSED  
          sts_serial|   2|    100000|     100|0.90725113|  PASSED  
          sts_serial|   3|    100000|     100|0.03570966|  PASSED  
          sts_serial|   3|    100000|     100|0.06106414|  PASSED  
          sts_serial|   4|    100000|     100|0.39969465|  PASSED  
          sts_serial|   4|    100000|     100|0.47186399|  PASSED  
          sts_serial|   5|    100000|     100|0.12683975|  PASSED  
          sts_serial|   5|    100000|     100|0.73210329|  PASSED  
          sts_serial|   6|    100000|     100|0.22638112|  PASSED  
          sts_serial|   6|    100000|     100|0.25446505|  PASSED  
          sts_serial|   7|    100000|     100|0.03417102|  PASSED  
          sts_serial|   7|    100000|     100|0.26537917|  PASSED  
          sts_serial|   8|    100000|     100|0.06080285|  PASSED  
          sts_serial|   8|    100000|     100|0.41022724|  PASSED  
          sts_serial|   9|    100000|     100|0.88276306|  PASSED  
          sts_serial|   9|    100000|     100|0.19466985|  PASSED  
          sts_serial|  10|    100000|     100|0.15659617|  PASSED  
          sts_serial|  10|    100000|     100|0.29321215|  PASSED  
          sts_serial|  11|    100000|     100|0.96555231|  PASSED  
          sts_serial|  11|    100000|     100|0.40227992|  PASSED  
          sts_serial|  12|    100000|     100|0.68199951|  PASSED  
          sts_serial|  12|    100000|     100|0.58583093|  PASSED  
          sts_serial|  13|    100000|     100|0.08924861|  PASSED  
          sts_serial|  13|    100000|     100|0.25598892|  PASSED  
          sts_serial|  14|    100000|     100|0.29236906|  PASSED  
          sts_serial|  14|    100000|     100|0.61767877|  PASSED  
          sts_serial|  15|    100000|     100|0.75141862|  PASSED  
          sts_serial|  15|    100000|     100|0.67147308|  PASSED  
          sts_serial|  16|    100000|     100|0.30323828|  PASSED  
          sts_serial|  16|    100000|     100|0.79686412|  PASSED  
# The file file_input_raw was rewound 12 times
         rgb_bitdist|   1|    100000|     100|0.12112314|  PASSED  
# The file file_input_raw was rewound 12 times
         rgb_bitdist|   2|    100000|     100|0.95301213|  PASSED  
# The file file_input_raw was rewound 12 times
         rgb_bitdist|   3|    100000|     100|0.68097274|  PASSED  
# The file file_input_raw was rewound 13 times
         rgb_bitdist|   4|    100000|     100|0.04983059|  PASSED  
# The file file_input_raw was rewound 13 times
         rgb_bitdist|   5|    100000|     100|0.94431308|  PASSED  
# The file file_input_raw was rewound 14 times
         rgb_bitdist|   6|    100000|     100|0.04591628|  PASSED  
# The file file_input_raw was rewound 14 times
         rgb_bitdist|   7|    100000|     100|0.64598414|  PASSED  
# The file file_input_raw was rewound 15 times
         rgb_bitdist|   8|    100000|     100|0.29345469|  PASSED  
# The file file_input_raw was rewound 15 times
         rgb_bitdist|   9|    100000|     100|0.90775321|  PASSED  
# The file file_input_raw was rewound 16 times
         rgb_bitdist|  10|    100000|     100|0.38200975|  PASSED  
# The file file_input_raw was rewound 17 times
         rgb_bitdist|  11|    100000|     100|0.73679171|  PASSED  
# The file file_input_raw was rewound 18 times
         rgb_bitdist|  12|    100000|     100|0.49187950|  PASSED  
# The file file_input_raw was rewound 18 times
rgb_minimum_distance|   2|     10000|    1000|0.47153918|  PASSED  
# The file file_input_raw was rewound 18 times
rgb_minimum_distance|   3|     10000|    1000|0.32289677|  PASSED  
# The file file_input_raw was rewound 18 times
rgb_minimum_distance|   4|     10000|    1000|0.27812495|  PASSED  
# The file file_input_raw was rewound 19 times
rgb_minimum_distance|   5|     10000|    1000|0.48091913|  PASSED  
# The file file_input_raw was rewound 19 times
    rgb_permutations|   2|    100000|     100|0.49155762|  PASSED  
# The file file_input_raw was rewound 19 times
    rgb_permutations|   3|    100000|     100|0.25832504|  PASSED  
# The file file_input_raw was rewound 19 times
    rgb_permutations|   4|    100000|     100|0.90925164|  PASSED  
# The file file_input_raw was rewound 19 times
    rgb_permutations|   5|    100000|     100|0.20177772|  PASSED  
# The file file_input_raw was rewound 19 times
      rgb_lagged_sum|   0|   1000000|     100|0.14484404|  PASSED  
# The file file_input_raw was rewound 20 times
      rgb_lagged_sum|   1|   1000000|     100|0.11496179|  PASSED  
# The file file_input_raw was rewound 21 times
      rgb_lagged_sum|   2|   1000000|     100|0.42443795|  PASSED  
# The file file_input_raw was rewound 23 times
      rgb_lagged_sum|   3|   1000000|     100|0.30335982|  PASSED  
# The file file_input_raw was rewound 25 times
      rgb_lagged_sum|   4|   1000000|     100|0.02497863|  PASSED  
# The file file_input_raw was rewound 27 times
      rgb_lagged_sum|   5|   1000000|     100|0.50741271|  PASSED  
# The file file_input_raw was rewound 30 times
      rgb_lagged_sum|   6|   1000000|     100|0.36569162|  PASSED  
# The file file_input_raw was rewound 33 times
      rgb_lagged_sum|   7|   1000000|     100|0.19504328|  PASSED  
# The file file_input_raw was rewound 36 times
      rgb_lagged_sum|   8|   1000000|     100|0.97423245|  PASSED  
# The file file_input_raw was rewound 40 times
      rgb_lagged_sum|   9|   1000000|     100|0.40978920|  PASSED  
# The file file_input_raw was rewound 44 times
      rgb_lagged_sum|  10|   1000000|     100|0.99078147|  PASSED  
# The file file_input_raw was rewound 49 times
      rgb_lagged_sum|  11|   1000000|     100|0.25426169|  PASSED  
# The file file_input_raw was rewound 54 times
      rgb_lagged_sum|  12|   1000000|     100|0.11950098|  PASSED  
# The file file_input_raw was rewound 59 times
      rgb_lagged_sum|  13|   1000000|     100|0.78388235|  PASSED  
# The file file_input_raw was rewound 65 times
      rgb_lagged_sum|  14|   1000000|     100|0.02593055|  PASSED  
# The file file_input_raw was rewound 71 times
      rgb_lagged_sum|  15|   1000000|     100|0.65883533|  PASSED  
# The file file_input_raw was rewound 77 times
      rgb_lagged_sum|  16|   1000000|     100|0.43238933|  PASSED  
# The file file_input_raw was rewound 84 times
      rgb_lagged_sum|  17|   1000000|     100|0.47412083|  PASSED  
# The file file_input_raw was rewound 91 times
      rgb_lagged_sum|  18|   1000000|     100|0.53642656|  PASSED  
# The file file_input_raw was rewound 99 times
      rgb_lagged_sum|  19|   1000000|     100|0.01731273|  PASSED  
# The file file_input_raw was rewound 107 times
      rgb_lagged_sum|  20|   1000000|     100|0.81624921|  PASSED  
# The file file_input_raw was rewound 115 times
      rgb_lagged_sum|  21|   1000000|     100|0.37076559|  PASSED  
# The file file_input_raw was rewound 124 times
      rgb_lagged_sum|  22|   1000000|     100|0.10511535|  PASSED  
# The file file_input_raw was rewound 133 times
      rgb_lagged_sum|  23|   1000000|     100|0.97138171|  PASSED  
# The file file_input_raw was rewound 143 times
      rgb_lagged_sum|  24|   1000000|     100|0.61872584|  PASSED  
# The file file_input_raw was rewound 153 times
      rgb_lagged_sum|  25|   1000000|     100|0.40320308|  PASSED  
# The file file_input_raw was rewound 163 times
      rgb_lagged_sum|  26|   1000000|     100|0.09356220|  PASSED  
# The file file_input_raw was rewound 174 times
      rgb_lagged_sum|  27|   1000000|     100|0.15753766|  PASSED  
# The file file_input_raw was rewound 185 times
      rgb_lagged_sum|  28|   1000000|     100|0.31117463|  PASSED  
# The file file_input_raw was rewound 196 times
      rgb_lagged_sum|  29|   1000000|     100|0.61946538|  PASSED  
# The file file_input_raw was rewound 208 times
      rgb_lagged_sum|  30|   1000000|     100|0.45962428|  PASSED  
# The file file_input_raw was rewound 220 times
      rgb_lagged_sum|  31|   1000000|     100|0.85071396|  PASSED  
# The file file_input_raw was rewound 233 times
      rgb_lagged_sum|  32|   1000000|     100|0.98321314|  PASSED  
# The file file_input_raw was rewound 233 times
     rgb_kstest_test|   0|     10000|    1000|0.47707737|  PASSED  
# The file file_input_raw was rewound 233 times
     dab_bytedistrib|   0|  51200000|       1|0.18226421|  PASSED  
# The file file_input_raw was rewound 233 times
             dab_dct| 256|     50000|       1|0.26880668|  PASSED  
Preparing to run test 207.  ntuple = 0
# The file file_input_raw was rewound 234 times
        dab_filltree|  32|  15000000|       1|0.85269907|  PASSED  
        dab_filltree|  32|  15000000|       1|0.72140822|  PASSED  
Preparing to run test 208.  ntuple = 0
# The file file_input_raw was rewound 234 times
       dab_filltree2|   0|   5000000|       1|0.04826330|  PASSED  
       dab_filltree2|   1|   5000000|       1|0.11462744|  PASSED  
Preparing to run test 209.  ntuple = 0
# The file file_input_raw was rewound 234 times
        dab_monobit2|  12|  65000000|       1|0.20846600|  PASSED  
```

### Practrand

```text
RNG_test using PractRand version 0.93
RNG = RNG_stdin, seed = 0x99dc689f
test set = normal, folding = standard(unknown format)
rng=RNG_stdin, seed=0x99dc689f
length= 128 megabytes (2^27 bytes), time= 2.4 seconds
  Test Name                         Raw       Processed     Evaluation
  BCFN(2+0,13-3,T)                  R=  +6.0  p = 0.011     normal           
  BCFN(2+1,13-3,T)                  R=  -0.2  p = 0.522     normal           
  BCFN(2+2,13-3,T)                  R=  -3.8  p = 0.948     normal           
  BCFN(2+3,13-3,T)                  R=  -2.1  p = 0.802     normal           
  BCFN(2+4,13-4,T)                  R=  -2.1  p = 0.800     normal           
  BCFN(2+5,13-5,T)                  R=  +0.9  p = 0.335     normal           
  BCFN(2+6,13-5,T)                  R=  +0.0  p = 0.471     normal           
  BCFN(2+7,13-6,T)                  R=  +0.1  p = 0.452     normal           
  BCFN(2+8,13-6,T)                  R=  -1.1  p = 0.657     normal           
  BCFN(2+9,13-7,T)                  R=  +1.4  p = 0.246     normal           
  BCFN(2+10,13-8,T)                 R=  -0.5  p = 0.519     normal           
  BCFN(2+11,13-8,T)                 R=  +0.8  p = 0.314     normal           
  BCFN(2+12,13-9,T)                 R=  +1.9  p = 0.170     normal           
  BCFN(2+13,13-9,T)                 R=  +0.2  p = 0.379     normal           
  DC6-9x1Bytes-1                    R=  -1.1  p = 0.824     normal           
  Gap-16:A                          R=  +0.7  p = 0.459     normal           
  Gap-16:B                          R=  +0.1  p = 0.477     normal           
  FPF-14+6/16:(0,14-0)              R=  +2.0  p = 0.081     normal           
  FPF-14+6/16:(1,14-0)              R=  -1.7  p = 0.885     normal           
  FPF-14+6/16:(2,14-0)              R=  -0.4  p = 0.604     normal           
  FPF-14+6/16:(3,14-1)              R=  +0.2  p = 0.451     normal           
  FPF-14+6/16:(4,14-2)              R=  +1.4  p = 0.169     normal           
  FPF-14+6/16:(5,14-2)              R=  -1.2  p = 0.801     normal           
  FPF-14+6/16:(6,14-3)              R=  -2.0  p = 0.929     normal           
  FPF-14+6/16:(7,14-4)              R=  +1.2  p = 0.202     normal           
  FPF-14+6/16:(8,14-5)              R=  +1.8  p = 0.107     normal           
  FPF-14+6/16:(9,14-5)              R=  +0.7  p = 0.310     normal           
  FPF-14+6/16:(10,14-6)             R=  -2.2  p = 0.942     normal           
  FPF-14+6/16:(11,14-7)             R=  +1.5  p = 0.150     normal           
  FPF-14+6/16:(12,14-8)             R=  +0.9  p = 0.253     normal           
  FPF-14+6/16:(13,14-8)             R=  -0.3  p = 0.560     normal           
  FPF-14+6/16:(14,14-9)             R=  +0.4  p = 0.350     normal           
  FPF-14+6/16:(15,14-10)            R=  +0.1  p = 0.420     normal           
  FPF-14+6/16:(16,14-11)            R=  +0.1  p = 0.414     normal           
  FPF-14+6/16:(17,14-11)            R=  +0.5  p = 0.308     normal           
  FPF-14+6/16:all                   R=  +0.1  p = 0.476     normal           
  FPF-14+6/16:all2                  R=  -0.7  p = 0.772     normal           
  FPF-14+6/16:cross                 R=  +0.4  p = 0.304     normal           
  BRank(12):128(4)                  R=  -1.4  p~= 0.890     normal           
  BRank(12):256(4)                  R=  -0.1  p~= 0.490     normal           
  BRank(12):384(1)                  R=  -0.7  p~= 0.689     normal           
  BRank(12):512(2)                  R=  -0.2  p~= 0.554     normal           
  BRank(12):768(1)                  R=  +0.4  p~= 0.366     normal           
  BRank(12):1K(2)                   R=  -0.2  p~= 0.554     normal           
  BRank(12):1536(1)                 R=  +0.4  p~= 0.366     normal           
  [Low1/8]BCFN(2+0,13-5,T)          R=  -0.5  p = 0.564     normal           
  [Low1/8]BCFN(2+1,13-5,T)          R=  -2.5  p = 0.851     normal           
  [Low1/8]BCFN(2+2,13-5,T)          R=  -0.0  p = 0.479     normal           
  [Low1/8]BCFN(2+3,13-5,T)          R=  -4.0  p = 0.965     normal           
  [Low1/8]BCFN(2+4,13-6,T)          R=  +2.3  p = 0.162     normal           
  [Low1/8]BCFN(2+5,13-6,T)          R=  -1.0  p = 0.633     normal           
  [Low1/8]BCFN(2+6,13-7,T)          R=  -2.7  p = 0.892     normal           
  [Low1/8]BCFN(2+7,13-8,T)          R=  +6.0  p = 0.019     normal           
  [Low1/8]BCFN(2+8,13-8,T)          R=  +3.1  p = 0.096     normal           
  [Low1/8]BCFN(2+9,13-9,T)          R=  +1.0  p = 0.262     normal           
  [Low1/8]BCFN(2+10,13-9,T)         R=  -2.2  p = 0.868     normal           
  [Low1/8]DC6-9x1Bytes-1            R=  +2.2  p = 0.230     normal           
  [Low1/8]Gap-16:A                  R=  +1.1  p = 0.378     normal           
  [Low1/8]Gap-16:B                  R=  -0.7  p = 0.684     normal           
  [Low1/8]FPF-14+6/16:(0,14-1)      R=  +0.8  p = 0.293     normal           
  [Low1/8]FPF-14+6/16:(1,14-2)      R=  +1.4  p = 0.169     normal           
  [Low1/8]FPF-14+6/16:(2,14-2)      R=  -0.5  p = 0.641     normal           
  [Low1/8]FPF-14+6/16:(3,14-3)      R=  +1.8  p = 0.105     normal           
  [Low1/8]FPF-14+6/16:(4,14-4)      R=  -0.4  p = 0.622     normal           
  [Low1/8]FPF-14+6/16:(5,14-5)      R=  -0.4  p = 0.604     normal           
  [Low1/8]FPF-14+6/16:(6,14-5)      R=  +1.1  p = 0.223     normal           
  [Low1/8]FPF-14+6/16:(7,14-6)      R=  +1.0  p = 0.249     normal           
  [Low1/8]FPF-14+6/16:(8,14-7)      R=  -2.0  p = 0.934     normal           
  [Low1/8]FPF-14+6/16:(9,14-8)      R=  -0.1  p = 0.516     normal           
  [Low1/8]FPF-14+6/16:(10,14-8)     R=  +3.9  p =  7.2e-3   normal           
  [Low1/8]FPF-14+6/16:(11,14-9)     R=  -1.3  p = 0.824     normal           
  [Low1/8]FPF-14+6/16:(12,14-10)    R=  +0.9  p = 0.247     normal           
  [Low1/8]FPF-14+6/16:(13,14-11)    R=  -0.7  p = 0.639     normal           
  [Low1/8]FPF-14+6/16:(14,14-11)    R=  +2.0  p = 0.095     normal           
  [Low1/8]FPF-14+6/16:all           R=  +1.7  p = 0.122     normal           
  [Low1/8]FPF-14+6/16:all2          R=  +0.1  p = 0.362     normal           
  [Low1/8]FPF-14+6/16:cross         R=  -0.4  p = 0.600     normal           
  [Low1/8]BRank(12):128(4)          R=  -0.1  p~= 0.490     normal           
  [Low1/8]BRank(12):256(2)          R=  +0.8  p~= 0.293     normal           
  [Low1/8]BRank(12):384(1)          R=  +1.8  p~= 0.146     normal           
  [Low1/8]BRank(12):512(2)          R=  -0.2  p~= 0.554     normal           
  [Low1/8]BRank(12):768(1)          R=  +1.8  p~= 0.146     normal           
  [Low4/32]BCFN(2+0,13-5,T)         R=  -2.1  p = 0.810     normal           
  [Low4/32]BCFN(2+1,13-5,T)         R=  +2.9  p = 0.119     normal           
  [Low4/32]BCFN(2+2,13-5,T)         R=  +3.3  p = 0.095     normal           
  [Low4/32]BCFN(2+3,13-5,T)         R=  +1.4  p = 0.263     normal           
  [Low4/32]BCFN(2+4,13-6,T)         R=  -2.1  p = 0.814     normal           
  [Low4/32]BCFN(2+5,13-6,T)         R=  -0.4  p = 0.535     normal           
  [Low4/32]BCFN(2+6,13-7,T)         R=  -5.4  p =1-3.1e-4   normal           
  [Low4/32]BCFN(2+7,13-8,T)         R=  -2.1  p = 0.830     normal           
  [Low4/32]BCFN(2+8,13-8,T)         R=  -1.8  p = 0.781     normal           
  [Low4/32]BCFN(2+9,13-9,T)         R=  -1.6  p = 0.749     normal           
  [Low4/32]BCFN(2+10,13-9,T)        R=  -3.1  p = 0.986     normal           
  [Low4/32]DC6-9x1Bytes-1           R=  +0.9  p = 0.469     normal           
  [Low4/32]Gap-16:A                 R=  +0.0  p = 0.663     normal           
  [Low4/32]Gap-16:B                 R=  -0.3  p = 0.576     normal           
  [Low4/32]FPF-14+6/16:(0,14-1)     R=  +0.5  p = 0.365     normal           
  [Low4/32]FPF-14+6/16:(1,14-2)     R=  -0.2  p = 0.570     normal           
  [Low4/32]FPF-14+6/16:(2,14-2)     R=  +0.7  p = 0.311     normal           
  [Low4/32]FPF-14+6/16:(3,14-3)     R=  +2.4  p = 0.050     normal           
  [Low4/32]FPF-14+6/16:(4,14-4)     R=  -2.0  p = 0.922     normal           
  [Low4/32]FPF-14+6/16:(5,14-5)     R=  -0.5  p = 0.639     normal           
  [Low4/32]FPF-14+6/16:(6,14-5)     R=  -1.5  p = 0.856     normal           
  [Low4/32]FPF-14+6/16:(7,14-6)     R=  +0.5  p = 0.368     normal           
  [Low4/32]FPF-14+6/16:(8,14-7)     R=  -0.2  p = 0.540     normal           
  [Low4/32]FPF-14+6/16:(9,14-8)     R=  +2.6  p = 0.045     normal           
  [Low4/32]FPF-14+6/16:(10,14-8)    R=  -1.5  p = 0.869     normal           
  [Low4/32]FPF-14+6/16:(11,14-9)    R=  -0.3  p = 0.541     normal           
  [Low4/32]FPF-14+6/16:(12,14-10)   R=  +3.0  p = 0.031     normal           
  [Low4/32]FPF-14+6/16:(13,14-11)   R=  -0.9  p = 0.713     normal           
  [Low4/32]FPF-14+6/16:(14,14-11)   R=  -1.5  p = 0.891     normal           
  [Low4/32]FPF-14+6/16:all          R=  +0.7  p = 0.328     normal           
  [Low4/32]FPF-14+6/16:all2         R=  -0.1  p = 0.433     normal           
  [Low4/32]FPF-14+6/16:cross        R=  -0.7  p = 0.744     normal           
  [Low4/32]BRank(12):128(4)         R=  -0.8  p~= 0.670     normal           
  [Low4/32]BRank(12):256(2)         R=  -1.0  p~= 0.744     normal           
  [Low4/32]BRank(12):384(1)         R=  -0.7  p~= 0.689     normal           
  [Low4/32]BRank(12):512(2)         R=  -0.2  p~= 0.554     normal           
  [Low4/32]BRank(12):768(1)         R=  -0.7  p~= 0.689     normal           
  [Low1/32]BCFN(2+0,13-6,T)         R=  +1.1  p = 0.295     normal           
  [Low1/32]BCFN(2+1,13-6,T)         R=  +1.3  p = 0.268     normal           
  [Low1/32]BCFN(2+2,13-6,T)         R=  -0.7  p = 0.587     normal           
  [Low1/32]BCFN(2+3,13-6,T)         R=  -0.5  p = 0.552     normal           
  [Low1/32]BCFN(2+4,13-7,T)         R=  +1.7  p = 0.210     normal           
  [Low1/32]BCFN(2+5,13-8,T)         R=  -4.0  p =1-5.2e-3   normal           
  [Low1/32]BCFN(2+6,13-8,T)         R=  +4.7  p = 0.040     normal           
  [Low1/32]BCFN(2+7,13-9,T)         R=  -3.0  p = 0.982     normal           
  [Low1/32]BCFN(2+8,13-9,T)         R=  -2.5  p = 0.924     normal           
  [Low1/32]DC6-9x1Bytes-1           R=  -2.3  p = 0.934     normal           
  [Low1/32]Gap-16:A                 R=  +1.3  p = 0.327     normal           
  [Low1/32]Gap-16:B                 R=  -0.7  p = 0.693     normal           
  [Low1/32]FPF-14+6/16:(0,14-2)     R=  +1.3  p = 0.190     normal           
  [Low1/32]FPF-14+6/16:(1,14-3)     R=  +2.3  p = 0.054     normal           
  [Low1/32]FPF-14+6/16:(2,14-4)     R=  +1.7  p = 0.117     normal           
  [Low1/32]FPF-14+6/16:(3,14-5)     R=  +1.5  p = 0.149     normal           
  [Low1/32]FPF-14+6/16:(4,14-5)     R=  +0.5  p = 0.357     normal           
  [Low1/32]FPF-14+6/16:(5,14-6)     R=  +0.1  p = 0.455     normal           
  [Low1/32]FPF-14+6/16:(6,14-7)     R=  -1.2  p = 0.802     normal           
  [Low1/32]FPF-14+6/16:(7,14-8)     R=  -0.4  p = 0.580     normal           
  [Low1/32]FPF-14+6/16:(8,14-8)     R=  +0.2  p = 0.426     normal           
  [Low1/32]FPF-14+6/16:(9,14-9)     R=  +0.3  p = 0.385     normal           
  [Low1/32]FPF-14+6/16:(10,14-10)   R=  -1.4  p = 0.836     normal           
  [Low1/32]FPF-14+6/16:(11,14-11)   R=  -1.6  p = 0.916     normal           
  [Low1/32]FPF-14+6/16:(12,14-11)   R=  -1.1  p = 0.767     normal           
  [Low1/32]FPF-14+6/16:all          R=  +2.5  p = 0.042     normal           
  [Low1/32]FPF-14+6/16:all2         R=  -0.6  p = 0.722     normal           
  [Low1/32]FPF-14+6/16:cross        R=  -1.2  p = 0.905     normal           
  [Low1/32]BRank(12):128(2)         R=  +1.6  p~= 0.168     normal           
  [Low1/32]BRank(12):256(2)         R=  -0.2  p~= 0.554     normal           
  [Low1/32]BRank(12):384(1)         R=  +0.4  p~= 0.366     normal           
  [Low1/32]BRank(12):512(1)         R=  +0.4  p~= 0.366     normal           
rng=RNG_stdin, seed=0x99dc689f
length= 256 megabytes (2^28 bytes), time= 5.4 seconds
  Test Name                         Raw       Processed     Evaluation
  BCFN(2+0,13-2,T)                  R=  +4.9  p = 0.026     normal           
  BCFN(2+1,13-2,T)                  R=  +3.7  p = 0.070     normal           
  BCFN(2+2,13-3,T)                  R=  -1.7  p = 0.757     normal           
  BCFN(2+3,13-3,T)                  R=  -1.9  p = 0.775     normal           
  BCFN(2+4,13-3,T)                  R=  +0.4  p = 0.426     normal           
  BCFN(2+5,13-4,T)                  R=  -2.7  p = 0.868     normal           
  BCFN(2+6,13-5,T)                  R=  +0.3  p = 0.417     normal           
  BCFN(2+7,13-5,T)                  R=  -0.9  p = 0.623     normal           
  BCFN(2+8,13-6,T)                  R=  +0.4  p = 0.404     normal           
  BCFN(2+9,13-6,T)                  R=  -3.8  p = 0.964     normal           
  BCFN(2+10,13-7,T)                 R=  -0.5  p = 0.530     normal           
  BCFN(2+11,13-8,T)                 R=  +0.4  p = 0.374     normal           
  BCFN(2+12,13-8,T)                 R=  -0.3  p = 0.490     normal           
  BCFN(2+13,13-9,T)                 R=  +0.4  p = 0.346     normal           
  BCFN(2+14,13-9,T)                 R=  -1.9  p = 0.812     normal           
  DC6-9x1Bytes-1                    R=  -1.4  p = 0.868     normal           
  Gap-16:A                          R=  -0.9  p = 0.829     normal           
  Gap-16:B                          R=  -1.7  p = 0.881     normal           
  FPF-14+6/16:(0,14-0)              R=  +0.6  p = 0.335     normal           
  FPF-14+6/16:(1,14-0)              R=  -1.8  p = 0.897     normal           
  FPF-14+6/16:(2,14-0)              R=  -1.2  p = 0.795     normal           
  FPF-14+6/16:(3,14-0)              R=  +1.3  p = 0.174     normal           
  FPF-14+6/16:(4,14-1)              R=  +0.1  p = 0.469     normal           
  FPF-14+6/16:(5,14-2)              R=  +0.6  p = 0.348     normal           
  FPF-14+6/16:(6,14-2)              R=  -0.2  p = 0.557     normal           
  FPF-14+6/16:(7,14-3)              R=  +1.2  p = 0.210     normal           
  FPF-14+6/16:(8,14-4)              R=  +1.9  p = 0.089     normal           
  FPF-14+6/16:(9,14-5)              R=  +1.1  p = 0.228     normal           
  FPF-14+6/16:(10,14-5)             R=  +1.0  p = 0.232     normal           
  FPF-14+6/16:(11,14-6)             R=  +2.4  p = 0.054     normal           
  FPF-14+6/16:(12,14-7)             R=  +1.5  p = 0.153     normal           
  FPF-14+6/16:(13,14-8)             R=  -0.2  p = 0.532     normal           
  FPF-14+6/16:(14,14-8)             R=  +0.8  p = 0.274     normal           
  FPF-14+6/16:(15,14-9)             R=  -0.8  p = 0.709     normal           
  FPF-14+6/16:(16,14-10)            R=  +0.2  p = 0.402     normal           
  FPF-14+6/16:(17,14-11)            R=  -0.8  p = 0.674     normal           
  FPF-14+6/16:(18,14-11)            R=  -1.4  p = 0.862     normal           
  FPF-14+6/16:all                   R=  +0.5  p = 0.385     normal           
  FPF-14+6/16:all2                  R=  -1.0  p = 0.882     normal           
  FPF-14+6/16:cross                 R=  +1.5  p = 0.080     normal           
  BRank(12):128(4)                  R=  -1.4  p~= 0.890     normal           
  BRank(12):256(4)                  R=  -0.1  p~= 0.490     normal           
  BRank(12):384(1)                  R=  -0.7  p~= 0.689     normal           
  BRank(12):512(2)                  R=  -0.2  p~= 0.554     normal           
  BRank(12):768(1)                  R=  +0.4  p~= 0.366     normal           
  BRank(12):1K(2)                   R=  -0.2  p~= 0.554     normal           
  BRank(12):1536(1)                 R=  +0.4  p~= 0.366     normal           
  BRank(12):2K(1)                   R=  -0.7  p~= 0.689     normal           
  [Low1/8]BCFN(2+0,13-4,T)          R=  +0.6  p = 0.388     normal           
  [Low1/8]BCFN(2+1,13-4,T)          R=  -2.4  p = 0.840     normal           
  [Low1/8]BCFN(2+2,13-5,T)          R=  +2.1  p = 0.191     normal           
  [Low1/8]BCFN(2+3,13-5,T)          R=  -4.0  p = 0.964     normal           
  [Low1/8]BCFN(2+4,13-5,T)          R=  -0.5  p = 0.558     normal           
  [Low1/8]BCFN(2+5,13-6,T)          R=  +3.0  p = 0.109     normal           
  [Low1/8]BCFN(2+6,13-6,T)          R=  -1.7  p = 0.752     normal           
  [Low1/8]BCFN(2+7,13-7,T)          R=  +1.9  p = 0.189     normal           
  [Low1/8]BCFN(2+8,13-8,T)          R=  -0.7  p = 0.554     normal           
  [Low1/8]BCFN(2+9,13-8,T)          R=  +0.2  p = 0.394     normal           
  [Low1/8]BCFN(2+10,13-9,T)         R=  -0.4  p = 0.491     normal           
  [Low1/8]BCFN(2+11,13-9,T)         R=  -1.1  p = 0.642     normal           
  [Low1/8]DC6-9x1Bytes-1            R=  +0.8  p = 0.496     normal           
  [Low1/8]Gap-16:A                  R=  +1.1  p = 0.365     normal           
  [Low1/8]Gap-16:B                  R=  +1.5  p = 0.139     normal           
  [Low1/8]FPF-14+6/16:(0,14-0)      R=  -0.6  p = 0.665     normal           
  [Low1/8]FPF-14+6/16:(1,14-1)      R=  +1.6  p = 0.135     normal           
  [Low1/8]FPF-14+6/16:(2,14-2)      R=  -1.8  p = 0.903     normal           
  [Low1/8]FPF-14+6/16:(3,14-2)      R=  +0.1  p = 0.471     normal           
  [Low1/8]FPF-14+6/16:(4,14-3)      R=  +0.9  p = 0.272     normal           
  [Low1/8]FPF-14+6/16:(5,14-4)      R=  +1.8  p = 0.104     normal           
  [Low1/8]FPF-14+6/16:(6,14-5)      R=  +3.3  p = 0.014     normal           
  [Low1/8]FPF-14+6/16:(7,14-5)      R=  +1.4  p = 0.169     normal           
  [Low1/8]FPF-14+6/16:(8,14-6)      R=  -0.5  p = 0.642     normal           
  [Low1/8]FPF-14+6/16:(9,14-7)      R=  +0.3  p = 0.400     normal           
  [Low1/8]FPF-14+6/16:(10,14-8)     R=  +3.8  p =  9.0e-3   normal           
  [Low1/8]FPF-14+6/16:(11,14-8)     R=  +0.7  p = 0.307     normal           
  [Low1/8]FPF-14+6/16:(12,14-9)     R=  +0.4  p = 0.369     normal           
  [Low1/8]FPF-14+6/16:(13,14-10)    R=  -2.0  p = 0.946     normal           
  [Low1/8]FPF-14+6/16:(14,14-11)    R=  -0.6  p = 0.598     normal           
  [Low1/8]FPF-14+6/16:(15,14-11)    R=  +0.3  p = 0.359     normal           
  [Low1/8]FPF-14+6/16:all           R=  +0.9  p = 0.275     normal           
  [Low1/8]FPF-14+6/16:all2          R=  +0.6  p = 0.211     normal           
  [Low1/8]FPF-14+6/16:cross         R=  -1.0  p = 0.833     normal           
  [Low1/8]BRank(12):128(4)          R=  -0.1  p~= 0.490     normal           
  [Low1/8]BRank(12):256(2)          R=  +0.8  p~= 0.293     normal           
  [Low1/8]BRank(12):384(1)          R=  +1.8  p~= 0.146     normal           
  [Low1/8]BRank(12):512(2)          R=  -0.2  p~= 0.554     normal           
  [Low1/8]BRank(12):768(1)          R=  +1.8  p~= 0.146     normal           
  [Low1/8]BRank(12):1K(1)           R=  -0.7  p~= 0.689     normal           
  [Low4/32]BCFN(2+0,13-4,T)         R=  -3.5  p = 0.936     normal           
  [Low4/32]BCFN(2+1,13-4,T)         R=  +1.2  p = 0.300     normal           
  [Low4/32]BCFN(2+2,13-5,T)         R=  +2.9  p = 0.121     normal           
  [Low4/32]BCFN(2+3,13-5,T)         R=  +4.6  p = 0.040     normal           
  [Low4/32]BCFN(2+4,13-5,T)         R=  +1.3  p = 0.283     normal           
  [Low4/32]BCFN(2+5,13-6,T)         R=  -3.0  p = 0.908     normal           
  [Low4/32]BCFN(2+6,13-6,T)         R=  -4.6  p = 0.989     normal           
  [Low4/32]BCFN(2+7,13-7,T)         R=  -1.9  p = 0.782     normal           
  [Low4/32]BCFN(2+8,13-8,T)         R=  -0.6  p = 0.537     normal           
  [Low4/32]BCFN(2+9,13-8,T)         R=  -3.1  p = 0.958     normal           
  [Low4/32]BCFN(2+10,13-9,T)        R=  -0.9  p = 0.596     normal           
  [Low4/32]BCFN(2+11,13-9,T)        R=  +1.9  p = 0.164     normal           
  [Low4/32]DC6-9x1Bytes-1           R=  +5.0  p = 0.016     normal           
  [Low4/32]Gap-16:A                 R=  -0.7  p = 0.828     normal           
  [Low4/32]Gap-16:B                 R=  +0.3  p = 0.396     normal           
  [Low4/32]FPF-14+6/16:(0,14-0)     R=  -1.1  p = 0.785     normal           
  [Low4/32]FPF-14+6/16:(1,14-1)     R=  -0.0  p = 0.513     normal           
  [Low4/32]FPF-14+6/16:(2,14-2)     R=  -1.9  p = 0.913     normal           
  [Low4/32]FPF-14+6/16:(3,14-2)     R=  +0.0  p = 0.502     normal           
  [Low4/32]FPF-14+6/16:(4,14-3)     R=  -0.3  p = 0.573     normal           
  [Low4/32]FPF-14+6/16:(5,14-4)     R=  -2.2  p = 0.947     normal           
  [Low4/32]FPF-14+6/16:(6,14-5)     R=  +0.9  p = 0.255     normal           
  [Low4/32]FPF-14+6/16:(7,14-5)     R=  -2.2  p = 0.945     normal           
  [Low4/32]FPF-14+6/16:(8,14-6)     R=  +0.2  p = 0.445     normal           
  [Low4/32]FPF-14+6/16:(9,14-7)     R=  -1.3  p = 0.825     normal           
  [Low4/32]FPF-14+6/16:(10,14-8)    R=  -1.0  p = 0.749     normal           
  [Low4/32]FPF-14+6/16:(11,14-8)    R=  -1.6  p = 0.884     normal           
  [Low4/32]FPF-14+6/16:(12,14-9)    R=  +0.8  p = 0.274     normal           
  [Low4/32]FPF-14+6/16:(13,14-10)   R=  -1.0  p = 0.756     normal           
  [Low4/32]FPF-14+6/16:(14,14-11)   R=  +0.0  p = 0.426     normal           
  [Low4/32]FPF-14+6/16:(15,14-11)   R=  -1.7  p = 0.935     normal           
  [Low4/32]FPF-14+6/16:all          R=  -2.1  p = 0.938     normal           
  [Low4/32]FPF-14+6/16:all2         R=  -0.5  p = 0.646     normal           
  [Low4/32]FPF-14+6/16:cross        R=  +0.0  p = 0.449     normal           
  [Low4/32]BRank(12):128(4)         R=  -0.8  p~= 0.670     normal           
  [Low4/32]BRank(12):256(2)         R=  -1.0  p~= 0.744     normal           
  [Low4/32]BRank(12):384(1)         R=  -0.7  p~= 0.689     normal           
  [Low4/32]BRank(12):512(2)         R=  -0.2  p~= 0.554     normal           
  [Low4/32]BRank(12):768(1)         R=  -0.7  p~= 0.689     normal           
  [Low4/32]BRank(12):1K(1)          R=  -0.7  p~= 0.689     normal           
  [Low1/32]BCFN(2+0,13-5,T)         R=  -1.5  p = 0.715     normal           
  [Low1/32]BCFN(2+1,13-5,T)         R=  +3.6  p = 0.078     normal           
  [Low1/32]BCFN(2+2,13-6,T)         R=  -2.0  p = 0.793     normal           
  [Low1/32]BCFN(2+3,13-6,T)         R=  -1.0  p = 0.638     normal           
  [Low1/32]BCFN(2+4,13-6,T)         R=  -0.4  p = 0.531     normal           
  [Low1/32]BCFN(2+5,13-7,T)         R=  -1.0  p = 0.623     normal           
  [Low1/32]BCFN(2+6,13-8,T)         R=  +0.8  p = 0.311     normal           
  [Low1/32]BCFN(2+7,13-8,T)         R=  -2.2  p = 0.846     normal           
  [Low1/32]BCFN(2+8,13-9,T)         R=  -0.4  p = 0.497     normal           
  [Low1/32]BCFN(2+9,13-9,T)         R=  -1.8  p = 0.793     normal           
  [Low1/32]DC6-9x1Bytes-1           R=  -1.4  p = 0.867     normal           
  [Low1/32]Gap-16:A                 R=  -0.2  p = 0.730     normal           
  [Low1/32]Gap-16:B                 R=  +1.0  p = 0.233     normal           
  [Low1/32]FPF-14+6/16:(0,14-2)     R=  +2.0  p = 0.078     normal           
  [Low1/32]FPF-14+6/16:(1,14-2)     R=  +4.2  p =  1.8e-3   normal           
  [Low1/32]FPF-14+6/16:(2,14-3)     R=  +0.4  p = 0.397     normal           
  [Low1/32]FPF-14+6/16:(3,14-4)     R=  +0.3  p = 0.418     normal           
  [Low1/32]FPF-14+6/16:(4,14-5)     R=  -1.3  p = 0.825     normal           
  [Low1/32]FPF-14+6/16:(5,14-5)     R=  +1.5  p = 0.141     normal           
  [Low1/32]FPF-14+6/16:(6,14-6)     R=  -0.4  p = 0.599     normal           
  [Low1/32]FPF-14+6/16:(7,14-7)     R=  -2.7  p = 0.981     normal           
  [Low1/32]FPF-14+6/16:(8,14-8)     R=  -2.1  p = 0.941     normal           
  [Low1/32]FPF-14+6/16:(9,14-8)     R=  -0.7  p = 0.665     normal           
  [Low1/32]FPF-14+6/16:(10,14-9)    R=  -1.1  p = 0.771     normal           
  [Low1/32]FPF-14+6/16:(11,14-10)   R=  -1.0  p = 0.741     normal           
  [Low1/32]FPF-14+6/16:(12,14-11)   R=  -2.0  p = 0.980     normal           
  [Low1/32]FPF-14+6/16:(13,14-11)   R=  +0.9  p = 0.228     normal           
  [Low1/32]FPF-14+6/16:all          R=  +3.1  p = 0.018     normal           
  [Low1/32]FPF-14+6/16:all2         R=  +2.2  p = 0.036     normal           
  [Low1/32]FPF-14+6/16:cross        R=  -2.1  p =1-1.1e-3   unusual          
  [Low1/32]BRank(12):128(2)         R=  +1.6  p~= 0.168     normal           
  [Low1/32]BRank(12):256(2)         R=  -0.2  p~= 0.554     normal           
  [Low1/32]BRank(12):384(1)         R=  +0.4  p~= 0.366     normal           
  [Low1/32]BRank(12):512(1)         R=  +0.4  p~= 0.366     normal           
rng=RNG_stdin, seed=0x99dc689f
length= 512 megabytes (2^29 bytes), time= 10.7 seconds
  Test Name                         Raw       Processed     Evaluation
  BCFN(2+0,13-1,T)                  R=  +2.8  p = 0.128     normal           
  BCFN(2+1,13-1,T)                  R=  +2.2  p = 0.179     normal           
  BCFN(2+2,13-2,T)                  R=  -0.7  p = 0.612     normal           
  BCFN(2+3,13-2,T)                  R=  +2.1  p = 0.195     normal           
  BCFN(2+4,13-3,T)                  R=  +0.7  p = 0.372     normal           
  BCFN(2+5,13-3,T)                  R=  +0.2  p = 0.447     normal           
  BCFN(2+6,13-4,T)                  R=  +2.0  p = 0.199     normal           
  BCFN(2+7,13-5,T)                  R=  -1.7  p = 0.756     normal           
  BCFN(2+8,13-5,T)                  R=  +0.2  p = 0.444     normal           
  BCFN(2+9,13-6,T)                  R=  +0.9  p = 0.324     normal           
  BCFN(2+10,13-6,T)                 R=  -0.1  p = 0.477     normal           
  BCFN(2+11,13-7,T)                 R=  +0.4  p = 0.392     normal           
  BCFN(2+12,13-8,T)                 R=  -1.7  p = 0.765     normal           
  BCFN(2+13,13-8,T)                 R=  +2.4  p = 0.138     normal           
  BCFN(2+14,13-9,T)                 R=  -2.6  p = 0.935     normal           
  BCFN(2+15,13-9,T)                 R=  -0.9  p = 0.594     normal           
  DC6-9x1Bytes-1                    R=  -1.2  p = 0.830     normal           
  Gap-16:A                          R=  -1.1  p = 0.860     normal           
  Gap-16:B                          R=  -1.2  p = 0.805     normal           
  FPF-14+6/16:(0,14-0)              R=  -0.4  p = 0.613     normal           
  FPF-14+6/16:(1,14-0)              R=  +2.6  p = 0.034     normal           
  FPF-14+6/16:(2,14-0)              R=  -1.9  p = 0.914     normal           
  FPF-14+6/16:(3,14-0)              R=  +0.0  p = 0.495     normal           
  FPF-14+6/16:(4,14-0)              R=  -0.3  p = 0.576     normal           
  FPF-14+6/16:(5,14-1)              R=  +0.7  p = 0.320     normal           
  FPF-14+6/16:(6,14-2)              R=  +0.3  p = 0.413     normal           
  FPF-14+6/16:(7,14-2)              R=  +0.2  p = 0.451     normal           
  FPF-14+6/16:(8,14-3)              R=  +2.0  p = 0.080     normal           
  FPF-14+6/16:(9,14-4)              R=  -0.5  p = 0.632     normal           
  FPF-14+6/16:(10,14-5)             R=  -0.3  p = 0.572     normal           
  FPF-14+6/16:(11,14-5)             R=  +0.1  p = 0.479     normal           
  FPF-14+6/16:(12,14-6)             R=  -0.8  p = 0.699     normal           
  FPF-14+6/16:(13,14-7)             R=  +0.0  p = 0.476     normal           
  FPF-14+6/16:(14,14-8)             R=  -0.4  p = 0.580     normal           
  FPF-14+6/16:(15,14-8)             R=  -1.7  p = 0.900     normal           
  FPF-14+6/16:(16,14-9)             R=  +0.2  p = 0.426     normal           
  FPF-14+6/16:(17,14-10)            R=  +0.6  p = 0.299     normal           
  FPF-14+6/16:(18,14-11)            R=  -0.4  p = 0.540     normal           
  FPF-14+6/16:(19,14-11)            R=  -1.9  p = 0.961     normal           
  FPF-14+6/16:all                   R=  +0.4  p = 0.393     normal           
  FPF-14+6/16:all2                  R=  -0.8  p = 0.798     normal           
  FPF-14+6/16:cross                 R=  -1.1  p = 0.874     normal           
  BRank(12):128(4)                  R=  -1.4  p~= 0.890     normal           
  BRank(12):256(4)                  R=  -0.1  p~= 0.490     normal           
  BRank(12):384(1)                  R=  -0.7  p~= 0.689     normal           
  BRank(12):512(2)                  R=  -0.2  p~= 0.554     normal           
  BRank(12):768(1)                  R=  +0.4  p~= 0.366     normal           
  BRank(12):1K(2)                   R=  -0.2  p~= 0.554     normal           
  BRank(12):1536(1)                 R=  +0.4  p~= 0.366     normal           
  BRank(12):2K(1)                   R=  -0.7  p~= 0.689     normal           
  [Low1/8]BCFN(2+0,13-3,T)          R=  +1.7  p = 0.237     normal           
  [Low1/8]BCFN(2+1,13-3,T)          R=  -2.8  p = 0.881     normal           
  [Low1/8]BCFN(2+2,13-4,T)          R=  +2.2  p = 0.180     normal           
  [Low1/8]BCFN(2+3,13-4,T)          R=  -2.5  p = 0.855     normal           
  [Low1/8]BCFN(2+4,13-5,T)          R=  -2.4  p = 0.842     normal           
  [Low1/8]BCFN(2+5,13-5,T)          R=  +0.2  p = 0.433     normal           
  [Low1/8]BCFN(2+6,13-6,T)          R=  -1.6  p = 0.727     normal           
  [Low1/8]BCFN(2+7,13-6,T)          R=  -1.6  p = 0.730     normal           
  [Low1/8]BCFN(2+8,13-7,T)          R=  -0.6  p = 0.552     normal           
  [Low1/8]BCFN(2+9,13-8,T)          R=  -0.1  p = 0.451     normal           
  [Low1/8]BCFN(2+10,13-8,T)         R=  -0.8  p = 0.579     normal           
  [Low1/8]BCFN(2+11,13-9,T)         R=  -2.2  p = 0.885     normal           
  [Low1/8]BCFN(2+12,13-9,T)         R=  -1.2  p = 0.672     normal           
  [Low1/8]DC6-9x1Bytes-1            R=  +0.7  p = 0.518     normal           
  [Low1/8]Gap-16:A                  R=  -1.1  p = 0.873     normal           
  [Low1/8]Gap-16:B                  R=  -0.3  p = 0.575     normal           
  [Low1/8]FPF-14+6/16:(0,14-0)      R=  -0.5  p = 0.640     normal           
  [Low1/8]FPF-14+6/16:(1,14-0)      R=  +1.0  p = 0.254     normal           
  [Low1/8]FPF-14+6/16:(2,14-1)      R=  +0.4  p = 0.405     normal           
  [Low1/8]FPF-14+6/16:(3,14-2)      R=  -1.9  p = 0.910     normal           
  [Low1/8]FPF-14+6/16:(4,14-2)      R=  +0.1  p = 0.476     normal           
  [Low1/8]FPF-14+6/16:(5,14-3)      R=  +0.8  p = 0.285     normal           
  [Low1/8]FPF-14+6/16:(6,14-4)      R=  +2.5  p = 0.042     normal           
  [Low1/8]FPF-14+6/16:(7,14-5)      R=  -1.9  p = 0.916     normal           
  [Low1/8]FPF-14+6/16:(8,14-5)      R=  -0.3  p = 0.583     normal           
  [Low1/8]FPF-14+6/16:(9,14-6)      R=  +0.3  p = 0.406     normal           
  [Low1/8]FPF-14+6/16:(10,14-7)     R=  +3.1  p = 0.020     normal           
  [Low1/8]FPF-14+6/16:(11,14-8)     R=  +2.1  p = 0.077     normal           
  [Low1/8]FPF-14+6/16:(12,14-8)     R=  +0.6  p = 0.323     normal           
  [Low1/8]FPF-14+6/16:(13,14-9)     R=  +2.4  p = 0.057     normal           
  [Low1/8]FPF-14+6/16:(14,14-10)    R=  -1.1  p = 0.781     normal           
  [Low1/8]FPF-14+6/16:(15,14-11)    R=  +1.7  p = 0.124     normal           
  [Low1/8]FPF-14+6/16:(16,14-11)    R=  -0.4  p = 0.555     normal           
  [Low1/8]FPF-14+6/16:all           R=  +0.4  p = 0.394     normal           
  [Low1/8]FPF-14+6/16:all2          R=  +0.0  p = 0.391     normal           
  [Low1/8]FPF-14+6/16:cross         R=  -0.5  p = 0.658     normal           
  [Low1/8]BRank(12):128(4)          R=  -0.1  p~= 0.490     normal           
  [Low1/8]BRank(12):256(2)          R=  +0.8  p~= 0.293     normal           
  [Low1/8]BRank(12):384(1)          R=  +1.8  p~= 0.146     normal           
  [Low1/8]BRank(12):512(2)          R=  -0.2  p~= 0.554     normal           
  [Low1/8]BRank(12):768(1)          R=  +1.8  p~= 0.146     normal           
  [Low1/8]BRank(12):1K(1)           R=  -0.7  p~= 0.689     normal           
  [Low4/32]BCFN(2+0,13-3,T)         R=  +2.5  p = 0.151     normal           
  [Low4/32]BCFN(2+1,13-3,T)         R=  +0.7  p = 0.369     normal           
  [Low4/32]BCFN(2+2,13-4,T)         R=  +4.1  p = 0.056     normal           
  [Low4/32]BCFN(2+3,13-4,T)         R=  +0.1  p = 0.457     normal           
  [Low4/32]BCFN(2+4,13-5,T)         R=  -0.2  p = 0.505     normal           
  [Low4/32]BCFN(2+5,13-5,T)         R=  -3.1  p = 0.908     normal           
  [Low4/32]BCFN(2+6,13-6,T)         R=  -3.3  p = 0.933     normal           
  [Low4/32]BCFN(2+7,13-6,T)         R=  -1.2  p = 0.669     normal           
  [Low4/32]BCFN(2+8,13-7,T)         R=  +2.0  p = 0.179     normal           
  [Low4/32]BCFN(2+9,13-8,T)         R=  -2.6  p = 0.898     normal           
  [Low4/32]BCFN(2+10,13-8,T)        R=  +0.3  p = 0.380     normal           
  [Low4/32]BCFN(2+11,13-9,T)        R=  -0.5  p = 0.516     normal           
  [Low4/32]BCFN(2+12,13-9,T)        R=  +0.5  p = 0.333     normal           
  [Low4/32]DC6-9x1Bytes-1           R=  +2.4  p = 0.204     normal           
  [Low4/32]Gap-16:A                 R=  +0.0  p = 0.640     normal           
  [Low4/32]Gap-16:B                 R=  +0.9  p = 0.258     normal           
  [Low4/32]FPF-14+6/16:(0,14-0)     R=  +0.9  p = 0.268     normal           
  [Low4/32]FPF-14+6/16:(1,14-0)     R=  +1.4  p = 0.173     normal           
  [Low4/32]FPF-14+6/16:(2,14-1)     R=  +0.1  p = 0.475     normal           
  [Low4/32]FPF-14+6/16:(3,14-2)     R=  -1.1  p = 0.794     normal           
  [Low4/32]FPF-14+6/16:(4,14-2)     R=  -1.0  p = 0.764     normal           
  [Low4/32]FPF-14+6/16:(5,14-3)     R=  -2.3  p = 0.950     normal           
  [Low4/32]FPF-14+6/16:(6,14-4)     R=  +1.3  p = 0.179     normal           
  [Low4/32]FPF-14+6/16:(7,14-5)     R=  -4.0  p =1-1.2e-3   normal           
  [Low4/32]FPF-14+6/16:(8,14-5)     R=  +0.1  p = 0.471     normal           
  [Low4/32]FPF-14+6/16:(9,14-6)     R=  -2.1  p = 0.940     normal           
  [Low4/32]FPF-14+6/16:(10,14-7)    R=  -2.2  p = 0.952     normal           
  [Low4/32]FPF-14+6/16:(11,14-8)    R=  +0.8  p = 0.268     normal           
  [Low4/32]FPF-14+6/16:(12,14-8)    R=  -0.1  p = 0.494     normal           
  [Low4/32]FPF-14+6/16:(13,14-9)    R=  +0.4  p = 0.353     normal           
  [Low4/32]FPF-14+6/16:(14,14-10)   R=  -0.1  p = 0.476     normal           
  [Low4/32]FPF-14+6/16:(15,14-11)   R=  -1.4  p = 0.846     normal           
  [Low4/32]FPF-14+6/16:(16,14-11)   R=  -0.4  p = 0.543     normal           
  [Low4/32]FPF-14+6/16:all          R=  -0.3  p = 0.598     normal           
  [Low4/32]FPF-14+6/16:all2         R=  +1.2  p = 0.105     normal           
  [Low4/32]FPF-14+6/16:cross        R=  -0.2  p = 0.525     normal           
  [Low4/32]BRank(12):128(4)         R=  -0.8  p~= 0.670     normal           
  [Low4/32]BRank(12):256(2)         R=  -1.0  p~= 0.744     normal           
  [Low4/32]BRank(12):384(1)         R=  -0.7  p~= 0.689     normal           
  [Low4/32]BRank(12):512(2)         R=  -0.2  p~= 0.554     normal           
  [Low4/32]BRank(12):768(1)         R=  -0.7  p~= 0.689     normal           
  [Low4/32]BRank(12):1K(1)          R=  -0.7  p~= 0.689     normal           
  [Low1/32]BCFN(2+0,13-5,T)         R=  +2.4  p = 0.158     normal           
  [Low1/32]BCFN(2+1,13-5,T)         R=  +1.6  p = 0.243     normal           
  [Low1/32]BCFN(2+2,13-5,T)         R=  -1.0  p = 0.635     normal           
  [Low1/32]BCFN(2+3,13-5,T)         R=  -4.0  p = 0.964     normal           
  [Low1/32]BCFN(2+4,13-6,T)         R=  +1.3  p = 0.270     normal           
  [Low1/32]BCFN(2+5,13-6,T)         R=  +2.9  p = 0.116     normal           
  [Low1/32]BCFN(2+6,13-7,T)         R=  +3.4  p = 0.086     normal           
  [Low1/32]BCFN(2+7,13-8,T)         R=  -3.2  p = 0.958     normal           
  [Low1/32]BCFN(2+8,13-8,T)         R=  -2.2  p = 0.848     normal           
  [Low1/32]BCFN(2+9,13-9,T)         R=  -0.5  p = 0.512     normal           
  [Low1/32]BCFN(2+10,13-9,T)        R=  -0.5  p = 0.510     normal           
  [Low1/32]DC6-9x1Bytes-1           R=  -3.3  p = 0.983     normal           
  [Low1/32]Gap-16:A                 R=  +1.1  p = 0.360     normal           
  [Low1/32]Gap-16:B                 R=  +1.3  p = 0.177     normal           
  [Low1/32]FPF-14+6/16:(0,14-1)     R=  -1.2  p = 0.806     normal           
  [Low1/32]FPF-14+6/16:(1,14-2)     R=  +1.3  p = 0.186     normal           
  [Low1/32]FPF-14+6/16:(2,14-2)     R=  +0.8  p = 0.299     normal           
  [Low1/32]FPF-14+6/16:(3,14-3)     R=  +0.4  p = 0.396     normal           
  [Low1/32]FPF-14+6/16:(4,14-4)     R=  -0.5  p = 0.645     normal           
  [Low1/32]FPF-14+6/16:(5,14-5)     R=  -0.5  p = 0.646     normal           
  [Low1/32]FPF-14+6/16:(6,14-5)     R=  -0.4  p = 0.599     normal           
  [Low1/32]FPF-14+6/16:(7,14-6)     R=  -1.4  p = 0.846     normal           
  [Low1/32]FPF-14+6/16:(8,14-7)     R=  -2.3  p = 0.960     normal           
  [Low1/32]FPF-14+6/16:(9,14-8)     R=  -0.8  p = 0.713     normal           
  [Low1/32]FPF-14+6/16:(10,14-8)    R=  +1.9  p = 0.098     normal           
  [Low1/32]FPF-14+6/16:(11,14-9)    R=  +0.4  p = 0.359     normal           
  [Low1/32]FPF-14+6/16:(12,14-10)   R=  -2.0  p = 0.955     normal           
  [Low1/32]FPF-14+6/16:(13,14-11)   R=  +1.0  p = 0.211     normal           
  [Low1/32]FPF-14+6/16:(14,14-11)   R=  -0.6  p = 0.609     normal           
  [Low1/32]FPF-14+6/16:all          R=  -0.3  p = 0.591     normal           
  [Low1/32]FPF-14+6/16:all2         R=  -0.6  p = 0.686     normal           
  [Low1/32]FPF-14+6/16:cross        R=  -0.9  p = 0.824     normal           
  [Low1/32]BRank(12):128(4)         R=  +0.4  p~= 0.340     normal           
  [Low1/32]BRank(12):256(2)         R=  -0.2  p~= 0.554     normal           
  [Low1/32]BRank(12):384(1)         R=  +0.4  p~= 0.366     normal           
  [Low1/32]BRank(12):512(2)         R=  +0.6  p~= 0.322     normal           
  [Low1/32]BRank(12):768(1)         R=  -0.7  p~= 0.689     normal           
rng=RNG_stdin, seed=0x99dc689f
length= 1 gigabyte (2^30 bytes), time= 20.7 seconds
  Test Name                         Raw       Processed     Evaluation
  BCFN(2+0,13-1,T)                  R=  +2.4  p = 0.163     normal           
  BCFN(2+1,13-1,T)                  R=  +0.7  p = 0.388     normal           
  BCFN(2+2,13-1,T)                  R=  +0.6  p = 0.399     normal           
  BCFN(2+3,13-1,T)                  R=  +2.8  p = 0.129     normal           
  BCFN(2+4,13-2,T)                  R=  +1.3  p = 0.289     normal           
  BCFN(2+5,13-3,T)                  R=  +2.0  p = 0.206     normal           
  BCFN(2+6,13-3,T)                  R=  -0.2  p = 0.511     normal           
  BCFN(2+7,13-4,T)                  R=  +1.9  p = 0.216     normal           
  BCFN(2+8,13-5,T)                  R=  +0.2  p = 0.437     normal           
  BCFN(2+9,13-5,T)                  R=  +1.2  p = 0.297     normal           
  BCFN(2+10,13-6,T)                 R=  +1.0  p = 0.312     normal           
  BCFN(2+11,13-6,T)                 R=  -1.9  p = 0.775     normal           
  BCFN(2+12,13-7,T)                 R=  -1.7  p = 0.748     normal           
  BCFN(2+13,13-8,T)                 R=  -1.0  p = 0.621     normal           
  BCFN(2+14,13-8,T)                 R=  -1.9  p = 0.801     normal           
  BCFN(2+15,13-9,T)                 R=  +1.3  p = 0.225     normal           
  BCFN(2+16,13-9,T)                 R=  -0.2  p = 0.449     normal           
  DC6-9x1Bytes-1                    R=  +1.3  p = 0.332     normal           
  Gap-16:A                          R=  -2.3  p = 0.972     normal           
  Gap-16:B                          R=  -0.6  p = 0.666     normal           
  FPF-14+6/16:(0,14-0)              R=  -1.5  p = 0.865     normal           
  FPF-14+6/16:(1,14-0)              R=  +0.2  p = 0.434     normal           
  FPF-14+6/16:(2,14-0)              R=  +0.1  p = 0.464     normal           
  FPF-14+6/16:(3,14-0)              R=  +0.3  p = 0.424     normal           
  FPF-14+6/16:(4,14-0)              R=  +1.2  p = 0.193     normal           
  FPF-14+6/16:(5,14-0)              R=  -1.6  p = 0.877     normal           
  FPF-14+6/16:(6,14-1)              R=  +1.9  p = 0.099     normal           
  FPF-14+6/16:(7,14-2)              R=  -1.6  p = 0.879     normal           
  FPF-14+6/16:(8,14-2)              R=  +0.4  p = 0.401     normal           
  FPF-14+6/16:(9,14-3)              R=  +1.3  p = 0.185     normal           
  FPF-14+6/16:(10,14-4)             R=  +0.6  p = 0.331     normal           
  FPF-14+6/16:(11,14-5)             R=  -1.6  p = 0.875     normal           
  FPF-14+6/16:(12,14-5)             R=  -0.9  p = 0.729     normal           
  FPF-14+6/16:(13,14-6)             R=  -0.2  p = 0.548     normal           
  FPF-14+6/16:(14,14-7)             R=  -1.0  p = 0.757     normal           
  FPF-14+6/16:(15,14-8)             R=  -0.6  p = 0.653     normal           
  FPF-14+6/16:(16,14-8)             R=  -1.7  p = 0.896     normal           
  FPF-14+6/16:(17,14-9)             R=  -1.5  p = 0.860     normal           
  FPF-14+6/16:(18,14-10)            R=  +0.2  p = 0.398     normal           
  FPF-14+6/16:(19,14-11)            R=  -0.4  p = 0.561     normal           
  FPF-14+6/16:(20,14-11)            R=  -1.9  p = 0.959     normal           
  FPF-14+6/16:all                   R=  -0.2  p = 0.576     normal           
  FPF-14+6/16:all2                  R=  -0.9  p = 0.832     normal           
  FPF-14+6/16:cross                 R=  +0.6  p = 0.256     normal           
  BRank(12):128(8)                  R=  -0.7  p~= 0.670     normal           
  BRank(12):256(4)                  R=  -0.1  p~= 0.490     normal           
  BRank(12):384(1)                  R=  -0.7  p~= 0.689     normal           
  BRank(12):512(4)                  R=  +1.0  p~= 0.180     normal           
  BRank(12):768(1)                  R=  +0.4  p~= 0.366     normal           
  BRank(12):1K(2)                   R=  -0.2  p~= 0.554     normal           
  BRank(12):1536(1)                 R=  +0.4  p~= 0.366     normal           
  BRank(12):2K(2)                   R=  +0.8  p~= 0.293     normal           
  BRank(12):3K(1)                   R=  -0.7  p~= 0.689     normal           
  [Low1/8]BCFN(2+0,13-3,T)          R=  +4.4  p = 0.042     normal           
  [Low1/8]BCFN(2+1,13-3,T)          R=  +0.3  p = 0.440     normal           
  [Low1/8]BCFN(2+2,13-3,T)          R=  +1.5  p = 0.266     normal           
  [Low1/8]BCFN(2+3,13-3,T)          R=  +2.7  p = 0.138     normal           
  [Low1/8]BCFN(2+4,13-4,T)          R=  -3.0  p = 0.901     normal           
  [Low1/8]BCFN(2+5,13-5,T)          R=  -1.1  p = 0.655     normal           
  [Low1/8]BCFN(2+6,13-5,T)          R=  +4.0  p = 0.060     normal           
  [Low1/8]BCFN(2+7,13-6,T)          R=  -1.0  p = 0.630     normal           
  [Low1/8]BCFN(2+8,13-6,T)          R=  +2.5  p = 0.151     normal           
  [Low1/8]BCFN(2+9,13-7,T)          R=  -0.1  p = 0.462     normal           
  [Low1/8]BCFN(2+10,13-8,T)         R=  -0.7  p = 0.558     normal           
  [Low1/8]BCFN(2+11,13-8,T)         R=  -0.6  p = 0.542     normal           
  [Low1/8]BCFN(2+12,13-9,T)         R=  -1.6  p = 0.750     normal           
  [Low1/8]BCFN(2+13,13-9,T)         R=  -1.4  p = 0.699     normal           
  [Low1/8]DC6-9x1Bytes-1            R=  -2.3  p = 0.942     normal           
  [Low1/8]Gap-16:A                  R=  +0.6  p = 0.492     normal           
  [Low1/8]Gap-16:B                  R=  -0.6  p = 0.668     normal           
  [Low1/8]FPF-14+6/16:(0,14-0)      R=  +0.6  p = 0.326     normal           
  [Low1/8]FPF-14+6/16:(1,14-0)      R=  +0.6  p = 0.333     normal           
  [Low1/8]FPF-14+6/16:(2,14-0)      R=  +1.7  p = 0.114     normal           
  [Low1/8]FPF-14+6/16:(3,14-1)      R=  +0.2  p = 0.452     normal           
  [Low1/8]FPF-14+6/16:(4,14-2)      R=  -0.9  p = 0.739     normal           
  [Low1/8]FPF-14+6/16:(5,14-2)      R=  +2.6  p = 0.034     normal           
  [Low1/8]FPF-14+6/16:(6,14-3)      R=  -1.1  p = 0.793     normal           
  [Low1/8]FPF-14+6/16:(7,14-4)      R=  -0.4  p = 0.607     normal           
  [Low1/8]FPF-14+6/16:(8,14-5)      R=  +2.3  p = 0.054     normal           
  [Low1/8]FPF-14+6/16:(9,14-5)      R=  -0.1  p = 0.534     normal           
  [Low1/8]FPF-14+6/16:(10,14-6)     R=  +0.3  p = 0.413     normal           
  [Low1/8]FPF-14+6/16:(11,14-7)     R=  -1.2  p = 0.804     normal           
  [Low1/8]FPF-14+6/16:(12,14-8)     R=  -0.2  p = 0.537     normal           
  [Low1/8]FPF-14+6/16:(13,14-8)     R=  +0.2  p = 0.413     normal           
  [Low1/8]FPF-14+6/16:(14,14-9)     R=  +1.6  p = 0.128     normal           
  [Low1/8]FPF-14+6/16:(15,14-10)    R=  +0.3  p = 0.384     normal           
  [Low1/8]FPF-14+6/16:(16,14-11)    R=  -0.6  p = 0.605     normal           
  [Low1/8]FPF-14+6/16:(17,14-11)    R=  -2.0  p = 0.968     normal           
  [Low1/8]FPF-14+6/16:all           R=  +1.8  p = 0.112     normal           
  [Low1/8]FPF-14+6/16:all2          R=  -0.5  p = 0.643     normal           
  [Low1/8]FPF-14+6/16:cross         R=  -1.0  p = 0.854     normal           
  [Low1/8]BRank(12):128(4)          R=  -0.1  p~= 0.490     normal           
  [Low1/8]BRank(12):256(4)          R=  +1.1  p~= 0.110     normal           
  [Low1/8]BRank(12):384(1)          R=  +1.8  p~= 0.146     normal           
  [Low1/8]BRank(12):512(2)          R=  -0.2  p~= 0.554     normal           
  [Low1/8]BRank(12):768(1)          R=  +1.8  p~= 0.146     normal           
  [Low1/8]BRank(12):1K(2)           R=  -0.2  p~= 0.554     normal           
  [Low1/8]BRank(12):1536(1)         R=  +0.4  p~= 0.366     normal           
  [Low4/32]BCFN(2+0,13-3,T)         R=  +4.5  p = 0.038     normal           
  [Low4/32]BCFN(2+1,13-3,T)         R=  -0.1  p = 0.500     normal           
  [Low4/32]BCFN(2+2,13-3,T)         R=  +4.2  p = 0.049     normal           
  [Low4/32]BCFN(2+3,13-3,T)         R=  -2.3  p = 0.822     normal           
  [Low4/32]BCFN(2+4,13-4,T)         R=  -0.5  p = 0.567     normal           
  [Low4/32]BCFN(2+5,13-5,T)         R=  -3.6  p = 0.946     normal           
  [Low4/32]BCFN(2+6,13-5,T)         R=  -4.8  p = 0.988     normal           
  [Low4/32]BCFN(2+7,13-6,T)         R=  +0.1  p = 0.442     normal           
  [Low4/32]BCFN(2+8,13-6,T)         R=  +2.2  p = 0.177     normal           
  [Low4/32]BCFN(2+9,13-7,T)         R=  -1.2  p = 0.661     normal           
  [Low4/32]BCFN(2+10,13-8,T)        R=  -0.7  p = 0.555     normal           
  [Low4/32]BCFN(2+11,13-8,T)        R=  -0.8  p = 0.590     normal           
  [Low4/32]BCFN(2+12,13-9,T)        R=  -1.9  p = 0.806     normal           
  [Low4/32]BCFN(2+13,13-9,T)        R=  -0.6  p = 0.533     normal           
  [Low4/32]DC6-9x1Bytes-1           R=  +3.0  p = 0.107     normal           
  [Low4/32]Gap-16:A                 R=  +0.5  p = 0.510     normal           
  [Low4/32]Gap-16:B                 R=  +0.2  p = 0.444     normal           
  [Low4/32]FPF-14+6/16:(0,14-0)     R=  +0.2  p = 0.438     normal           
  [Low4/32]FPF-14+6/16:(1,14-0)     R=  +1.0  p = 0.238     normal           
  [Low4/32]FPF-14+6/16:(2,14-0)     R=  +1.6  p = 0.139     normal           
  [Low4/32]FPF-14+6/16:(3,14-1)     R=  -3.1  p = 0.986     normal           
  [Low4/32]FPF-14+6/16:(4,14-2)     R=  -0.8  p = 0.706     normal           
  [Low4/32]FPF-14+6/16:(5,14-2)     R=  -1.0  p = 0.762     normal           
  [Low4/32]FPF-14+6/16:(6,14-3)     R=  +2.5  p = 0.040     normal           
  [Low4/32]FPF-14+6/16:(7,14-4)     R=  -2.0  p = 0.925     normal           
  [Low4/32]FPF-14+6/16:(8,14-5)     R=  -0.4  p = 0.619     normal           
  [Low4/32]FPF-14+6/16:(9,14-5)     R=  -1.6  p = 0.876     normal           
  [Low4/32]FPF-14+6/16:(10,14-6)    R=  +0.5  p = 0.355     normal           
  [Low4/32]FPF-14+6/16:(11,14-7)    R=  +3.0  p = 0.024     normal           
  [Low4/32]FPF-14+6/16:(12,14-8)    R=  -1.4  p = 0.837     normal           
  [Low4/32]FPF-14+6/16:(13,14-8)    R=  -1.3  p = 0.823     normal           
  [Low4/32]FPF-14+6/16:(14,14-9)    R=  -0.3  p = 0.568     normal           
  [Low4/32]FPF-14+6/16:(15,14-10)   R=  -0.1  p = 0.469     normal           
  [Low4/32]FPF-14+6/16:(16,14-11)   R=  -1.1  p = 0.767     normal           
  [Low4/32]FPF-14+6/16:(17,14-11)   R=  -1.5  p = 0.891     normal           
  [Low4/32]FPF-14+6/16:all          R=  -0.0  p = 0.521     normal           
  [Low4/32]FPF-14+6/16:all2         R=  +0.3  p = 0.290     normal           
  [Low4/32]FPF-14+6/16:cross        R=  -0.4  p = 0.607     normal           
  [Low4/32]BRank(12):128(4)         R=  -0.8  p~= 0.670     normal           
  [Low4/32]BRank(12):256(4)         R=  -0.8  p~= 0.670     normal           
  [Low4/32]BRank(12):384(1)         R=  -0.7  p~= 0.689     normal           
  [Low4/32]BRank(12):512(2)         R=  -0.2  p~= 0.554     normal           
  [Low4/32]BRank(12):768(1)         R=  -0.7  p~= 0.689     normal           
  [Low4/32]BRank(12):1K(2)          R=  +0.8  p~= 0.293     normal           
  [Low4/32]BRank(12):1536(1)        R=  +1.8  p~= 0.146     normal           
  [Low1/32]BCFN(2+0,13-4,T)         R=  +0.3  p = 0.440     normal           
  [Low1/32]BCFN(2+1,13-4,T)         R=  +1.5  p = 0.264     normal           
  [Low1/32]BCFN(2+2,13-5,T)         R=  +1.1  p = 0.307     normal           
  [Low1/32]BCFN(2+3,13-5,T)         R=  -0.7  p = 0.588     normal           
  [Low1/32]BCFN(2+4,13-5,T)         R=  +4.8  p = 0.035     normal           
  [Low1/32]BCFN(2+5,13-6,T)         R=  +4.0  p = 0.063     normal           
  [Low1/32]BCFN(2+6,13-6,T)         R=  -0.1  p = 0.488     normal           
  [Low1/32]BCFN(2+7,13-7,T)         R=  -1.8  p = 0.763     normal           
  [Low1/32]BCFN(2+8,13-8,T)         R=  -2.1  p = 0.832     normal           
  [Low1/32]BCFN(2+9,13-8,T)         R=  -2.1  p = 0.822     normal           
  [Low1/32]BCFN(2+10,13-9,T)        R=  -1.5  p = 0.741     normal           
  [Low1/32]BCFN(2+11,13-9,T)        R=  -2.2  p = 0.876     normal           
  [Low1/32]DC6-9x1Bytes-1           R=  -0.8  p = 0.789     normal           
  [Low1/32]Gap-16:A                 R=  -0.6  p = 0.798     normal           
  [Low1/32]Gap-16:B                 R=  +0.6  p = 0.335     normal           
  [Low1/32]FPF-14+6/16:(0,14-0)     R=  -0.3  p = 0.594     normal           
  [Low1/32]FPF-14+6/16:(1,14-1)     R=  -1.6  p = 0.875     normal           
  [Low1/32]FPF-14+6/16:(2,14-2)     R=  +1.1  p = 0.217     normal           
  [Low1/32]FPF-14+6/16:(3,14-2)     R=  +1.3  p = 0.178     normal           
  [Low1/32]FPF-14+6/16:(4,14-3)     R=  +1.7  p = 0.122     normal           
  [Low1/32]FPF-14+6/16:(5,14-4)     R=  -2.0  p = 0.930     normal           
  [Low1/32]FPF-14+6/16:(6,14-5)     R=  -0.4  p = 0.621     normal           
  [Low1/32]FPF-14+6/16:(7,14-5)     R=  -1.5  p = 0.860     normal           
  [Low1/32]FPF-14+6/16:(8,14-6)     R=  -1.8  p = 0.907     normal           
  [Low1/32]FPF-14+6/16:(9,14-7)     R=  +3.7  p =  8.8e-3   normal           
  [Low1/32]FPF-14+6/16:(10,14-8)    R=  +3.9  p =  7.3e-3   normal           
  [Low1/32]FPF-14+6/16:(11,14-8)    R=  -1.6  p = 0.885     normal           
  [Low1/32]FPF-14+6/16:(12,14-9)    R=  -2.3  p = 0.964     normal           
  [Low1/32]FPF-14+6/16:(13,14-10)   R=  +2.4  p = 0.060     normal           
  [Low1/32]FPF-14+6/16:(14,14-11)   R=  -1.3  p = 0.840     normal           
  [Low1/32]FPF-14+6/16:(15,14-11)   R=  -0.9  p = 0.723     normal           
  [Low1/32]FPF-14+6/16:all          R=  -0.2  p = 0.572     normal           
  [Low1/32]FPF-14+6/16:all2         R=  +1.8  p = 0.058     normal           
  [Low1/32]FPF-14+6/16:cross        R=  -1.3  p = 0.928     normal           
  [Low1/32]BRank(12):128(4)         R=  +0.4  p~= 0.340     normal           
  [Low1/32]BRank(12):256(2)         R=  -0.2  p~= 0.554     normal           
  [Low1/32]BRank(12):384(1)         R=  +0.4  p~= 0.366     normal           
  [Low1/32]BRank(12):512(2)         R=  +0.6  p~= 0.322     normal           
  [Low1/32]BRank(12):768(1)         R=  -0.7  p~= 0.689     normal           
  [Low1/32]BRank(12):1K(1)          R=  -0.7  p~= 0.689     normal      
```

---------

# *Discover unknown!*
