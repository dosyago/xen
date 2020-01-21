#include <stdint.h>
#include <inttypes.h>

#ifndef _XEN_H_
#define _XEN_H_

#if defined(_MSC_VER) && (_MSC_VER < 1600)

typedef unsigned char               uint8_t;
typedef unsigned int                uint32_t;
typedef unsigned __int64            uint64_t;

// Other compilers

#else	// defined(_MSC_VER)

#include <stdint.h>

#endif // !defined(_MSC_VER)

typedef uint8_t                     u8;
typedef uint32_t                    u32;
typedef uint64_t                    u64;

const  u32 MAX    = 0xFFFFFFFF;
const  u32 SZ     = 11;
const  u32 SZ4    = SZ<<2;
const  u32 SHIFT  = 11;
const  u32 MASK   = (1<<SHIFT)-1;
const  u32 HIMASK = MASK << (32-SHIFT);

void xen_64          ( const void * key, int len, uint32_t seed, void * out );

#endif // _XEN_H_

