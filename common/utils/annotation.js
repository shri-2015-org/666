import { assertInvariant } from './invariants.js';

const decoratorWrap = f => (_1, _2, d) => Object.assign({}, d, {value: f(d.value) });
const noWrap = f => f;

/*
  // Decorator example
  const identity = decoratorWrap(f => x => f (x));

  Usage:
  class X {
    @identity
    static someStaticMethod(...) {...}
  }
*/

function setMagic(invs, retInv, f) {
  f._annotationArgs = invs;
  f._annotationRet = retInv;
  return f;
}

const generalizedAnnotator = wrap => function(...invs) {
  return retInv => wrap(f => setMagic(invs, retInv, function(...args) {
    const N = invs.length;
    if (args.length !== N) {
      throw new Error(`The number of arguments does not match the annotation: ` +
                      `${args.length} vs. ${N}.`);
    }
    for (const i = 0; i < N; i++) {
      const arg = args[i];
      const inv = invs[i];
      assertInvariant(arg, inv);
    }
    const retVal = f(...args);
    assertInvariant(retVal, retInv);
    return retVal;
  }));
};

export const annotate = generalizedAnnotator(noWrap);
export const annotated = generalizedAnnotator(decoratorWrap);

/*
  // Usage examples:

  annotate(Num)(Num)(someFunction);
  annotate(Str, Str)(Str)((s1, s2) => s1 + s2);

  class X {
  @annotated(Str, Num)(Str)
  static someStaticMethod...
      static someStaticMethod(...) {...}
  }
*/

