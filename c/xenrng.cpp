#include <cstdio>
#include "xenrng.h"

#if defined(_MSC_VER)

#define FORCE_INLINE	__forceinline

// Other compilers

#else	// defined(_MSC_VER)

#define	FORCE_INLINE inline __attribute__((always_inline))

#endif // !defined(_MSC_VER)

  //---------
  // update function : mix the state and provide an output value

    FORCE_INLINE u32 update ( u32 * s )
    {
      int j = SZ-1;
      u32 sum = 1;
      for( int i = 0; i < SZ; i++ ) {
        s[j] ^= (s[i] >> SHIFT) ^ (sum << SHIFT);
        s[i] += s[j] + 1;
        j = ( j + 1 ) % SZ;
        sum += s[i];
      }
      return sum & MAX;
    }

  //---------
  // Key schedule function

    FORCE_INLINE void schedule( const u32 * msg, u32 * s, int len )
    {
      const u8 *m8  = (u8 *)msg;
      u8 *s8        = (u8 *)s;

      int i = 0;
      int Len = len >> 4;
      for( int i = 0; i < Len; i++ ) {
        s[i%SZ] += msg[i];
      }

      i <<= 4;

      while( i < len ) {
        s8[i%SZ4] += m8[i];
        i += 1;
      }
    }

  //---------
  // main hash function 

    void xen_64 ( const void * key, int len, u32 seed, void * out )
    {
      const u32 *key32    = (u32 *)key;
      const u32 *seed32   = (u32 *)&seed;
      const u8 output[8]  = {0};
      u32 s[SZ]           = {0};
      u32 *z              = (u32 *)output;
      u64 *h              = (u64 *)output;
      u32 SUM1, SUM2;

      schedule( seed32,  s,   4 );
      update( s );
      schedule( key32,   s, len );
      SUM1 = update( s );
      SUM2 = update( s );

      z[0] = SUM1;
      z[1] = SUM2;

      //printf("h = %#018" PRIx64 "\n\n", h[0]);

      ((u64 *)out)[0] = h[0];
    }
