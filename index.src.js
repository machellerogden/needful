'use strict';
const _ = exports;
const { clone } = require('mediary');
_.clone = clone;

/**
 * A safe reference to `undefined`.
 *
 * While it rarely happens in practice, `undefined` is not a keyword and it possible for it to be shadowed.
 *
 * @since 1.2.0
 * @name nil
 * @type {undefined} 
 * @see isNil, notNil
 */
_.nil = void 0;

/**
 * A convenient reference to `Array.isArray`.
 *
 * @since 1.2.1
 * @function isArray
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 */
_.isArray = Array.isArray;

/**
 * Checks if `value` is of `type`.
 *
 * @since 1.0.0
 * @function is
 * @param {*} value The value to check.
 * @param {'undefined' | 'boolean' | 'string' | 'number' | 'object' | 'function' | 'symbol'} type The type to check against.
 * @returns {boolean} Returns `true` if `value` is of given `type`, else `false`.
 * @example
 *
 * is({}, 'object');
 * // => true
 *
 * is([], 'object');
 * // => true
 *
 * is(null, 'object');
 * // => true
 *
 * is('foo', 'string');
 * // => true
 *
 * is(123, 'number');
 * // => true
 */
_.is = (v, t) => typeof v === t;

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @since 1.2.0
 * @function isNil
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @see nil, notNil
 * @example
 *
 * isNil(null)
 * // => true
 *
 * isNil(void 0)
 * // => true
 *
 * isNil(NaN)
 * // => false
 */
_.isNil = v => v == _.nil;

/**
 * Checks if `value` is not `null` and not `undefined`.
 *
 * Complements `isNil`.
 *
 * @since 1.2.1
 * @function notNil
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is not nullish, else `false`.
 * @see nil, isNil
 * @example
 *
 * notNil(null)
 * // => false
 *
 * notNil(void 0)
 * // => false
 *
 * notNil(NaN)
 * // => true
 */
_.notNil = v => v != _.nil;

/**
 * Checks if `value` is not null and has a typeof 'object'.
 *
 * @since 0.0.1
 * @function isObject
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
_.isObject = v => _.notNil(v) && _.is(v, 'object');

/**
 * Compares `value` to `other` and tests for strict equality.
 *
 * @since 1.4.0
 * @function isEqual
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are strictly equal, else `false`.
 * @example
 *
 * isEqual({}, {})
 * // => false
 *
 * isEqual([], [])
 * // => false
 *
 * const foo = {};
 * const bar = foo;
 * isEqual(foo, bar);
 * // => true
 *
 * isEqual('a', 'a');
 * // => true
 *
 */
_.isEqual = (a, b) => [ a, b ].every(_.isObject)
    ? Object.is(a, b)
    : a === b;

/**
 * Checks if `value` is `false`.
 *
 * @since 1.2.0
 * @function isFalse
 * @returns {boolean} Returns true when `value` is equal to `false`.
 * @see isTrue, isFalsy, isTruthy, not
 */
_.isFalse = v => _.isEqual(v, false);

/**
 * Checks if `value` is falsy.
 *
 * @since 1.2.0
 * @function isFalsy
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` is `null`, `undefined' or `false`.
 * @see isTrue, isFalse, isTruthy, not
 */
_.isFalsy = v => _.isNil(v) || _.isFalse(v);

/**
 * Given a function returns a function which when invoked will return the logically opposite value.
 *
 * Note: `0` is considered to be truthy.
 *
 * @since 1.2.1
 * @function complement
 * @param {Function} fn The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * complement(() => true)();
 * // => false
 *
 * complement(() => false)();
 * // => true
 *
 * complement(() => nil)();
 * // => true
 *
 * complement(() => 0)();
 * // => false
 */
_.complement = fn => (...args) => _.isFalsy(fn(...args));

/**
 * Checks if `value` is truthy.
 *
 * @since 0.0.2
 * @function isTruthy
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` is not `null`, not `undefined' and not `false`.
 * @see isTrue, isFalse, isFalsy, not
 */
_.isTruthy = _.complement(_.isFalsy);

/**
 * Checks if `value` is `0`.
 *
 * JavaScript treats `0` as falsy, Needful treats `0` as truthy, so it makes sense to provide a functional helper for `0` checks.
 *
 * @since 1.5.3
 * @function isZero
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` is `0`.
 */
_.isZero = v => v === 0;

/**
 * Checks if `value` is a string.
 *
 * @since 0.0.2
 * @function isString
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` of type 'string'.
 */
_.isString = v => _.is(v, 'string');

/**
 * Checks if `value` is a number.
 *
 * @since 0.0.2
 * @function isNumber
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` of type 'number'.
 */
_.isNumber = v => _.is(v, 'number');

/**
 * Checks if `value` is a boolean.
 *
 * @since 0.0.2
 * @function isBoolean
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` of type 'boolean'.
 */
_.isBoolean = v => _.is(v, 'boolean');

/**
 * Checks if `value` is undefined.
 *
 * @since 0.0.2
 * @function isUndefined
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` of type 'undefined'.
 */
_.isUndefined = v => _.is(v, 'undefined');

/**
 * Checks if `value` is null.
 *
 * @since 0.0.2
 * @function isNull
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` is `null`.
 */
_.isNull = v => v === null;

/**
 * Checks if `value` is a plain object.
 *
 * @since 0.0.1
 * @function isPlainObject
 * @param {*} value The value to check.
 * @returns {boolean} Returns true when `value` is a plain old JavaScript object.
 */
_.isPlainObject = v => Object.prototype.toString.call(v) === '[object Object]';

/**
 * Functional bang.
 *
 * @since 0.0.1
 * @function not
 * @alias isFalsy
 */
_.not = _.isFalsy;

/**
 * Partially apply arguments.
 *
 * @since 0.0.1
 * @function partial
 * @param {Function} fn Function to partial apply arguments to.
 * @param {...*} args Argument to partially apply.
 * @example
 *
 * const concat = (a, b) => '' + a + b;
 * const fooify = partial(concat, 'foo');
 * fooify('bar');
 * // => 'foobar'
 */
_.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);

/**
 * Partially apply arguments, starting from the right of the arguments given at call time.
 *
 * @since 0.0.1
 * @function partialRight
 * @param {Function} fn Function to partial apply arguments to.
 * @param {...*} args Argument to partially apply.
 * @example
 *
 * const concat = (a, b) => '' + a + b;
 * const fooify = partialRight(concat, 'foo');
 * fooify('bar');
 * // => 'barfoo'
 */
_.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);

/**
 * Deeply clones plain objects and arrays. Primitives are passed through unchanged.
 *
 * @since 1.5.0
 * @function clone
 * @param {*} value Value to clone.
 */
_.deepClone = x => _.isArray(x)
    ? [ ...x ].map(_.deepClone)
    : _.isObject(x)
        ? Object.entries({ ...x }).reduce((a, [k, v]) => (a[k] = _.deepClone(v), a), {})
        : x;

[

/**
 * Fills all the elements of an array from a start index to an end index with a static value. The end index is not included.
 *
 * @since 1.2.0
 * @function fill
 * @param {Array} array Array
 * @param {*} value Value to fill.
 * @param {number} start Start index, defaults to `0`.
 * @param {number} end End index.
 * @returns {Array} Returns new array filled with given value from given start index through given end index.
 * @example
 *
 * fill([ 1, 2, 3, 4 ], 0, 2, 4);
 * // => [1, 2, 0, 0]
 */
    'fill',

/**
 * Adds one or more elements to the end of an array.
 *
 * @since 1.2.0
 * @function push
 * @param {Array} array Array
 * @param {...*} value Value(s) to be added.
 * @returns {Array} Returns new array with given value(s) added to the end.
 * @example
 *
 * push([ 1, 2, 3 ], 4);
 * // => [1, 2, 3, 4]
 */
    'push',

/**
 * Reverse the order of a given array.
 *
 * @since 1.2.0
 * @function reverse
 * @param {Array} array Array
 * @returns {Array} Returns new array with values in reverse order.
 * @example
 *
 * reverse([ 1, 2, 3 ]);
 * // => [3, 2, 1]
 */
    'reverse',

/**
 * Adds one or more elements to the beginning of an array.
 *
 * @since 1.2.0
 * @function unshift
 * @param {Array} array Array
 * @param {...*} value Value(s) to be added.
 * @returns {Array} Returns new array with given value(s) added to the beginning.
 * @example
 *
 * unshift([ 1, 2, 3 ], 0);
 * // => [0, 1, 2, 3]
 */
    'unshift',

/**
 * Changes the contents of an array by removing or replacing existing elements and/or adding new elements.
 *
 * @since 1.2.0
 * @function splice
 * @param {Array} array Array
 * @param {number} start Start index.
 * @param {number} count Delete count.
 * @param {...*} values Values to add.
 * @returns {Array} Returns new array with `count` elements removed from `start` and `values` added at `start`.
 * @example
 *
 * splice([ 1, 2, 3, 4 ], 1, 1, 4);
 * // => [1, 4, 3, 4]
 */
    'splice'
].forEach((k, r) => _[k] = (v, ...args) => (r = clone(v) || [], [][k].apply(r, args), r));

[
/**
 * Merges two or more arrays.
 *
 * @function concat
 * @param {...Array} arrays Arrays to merge.
 * @returns {Array} Returns new array with `arrays` concatenated.
 * @example
 *
 * concat([ 1, 2 ], [ 3, 4 ]);
 * // => [1, 2, 3, 4]
 */
    'concat',

/**
 * TODO
 *
 * @function join
 */
    'join',

/**
 * TODO
 *
 * @function slice
 */
    'slice',

/**
 * TODO
 *
 * @function every
 */
    'every',

/**
 * TODO
 *
 * @function filter
 */
    'filter',

/**
 * TODO
 *
 * @function find
 */
    'find',

/**
 * TODO
 *
 * @function findIndex
 */
    'findIndex',

/**
 * TODO
 *
 * @function forEach
 */
    'forEach',

/**
 * TODO
 *
 * @function map
 */
    'map',

/**
 * TODO
 *
 * @function reduce
 */
    'reduce',

/**
 * TODO
 *
 * @function reduceRight
 */
    'reduceRight',

/**
 * TODO
 *
 * @function some
 */
    'some'
].forEach(k => _[k] = (v, ...args) => [][k].apply(clone(v) || [], args.map(clone)));

[
/**
 * TODO
 *
 * @function entries
 */
    'entries',

/**
 * TODO
 *
 * @function keys
 */
    'keys',

/**
 * TODO
 *
 * @function values
 */
    'values'
].forEach(k => _[k] = (v) => _.isArray(v) ? [ ...[][k].apply(v || []) ] : Object[k](v));

[
/**
 * TODO
 *
 * @function pop
 */
    'pop',

/**
 * TODO
 *
 * @function shift
 */
    'shift'
].forEach(k => _[k] = v => clone(v)[k]());

[
/**
 * TODO
 *
 * @function includes
 */
    'includes',

/**
 * TODO
 *
 * @function indexOf
 */
    'indexOf',

/**
 * TODO
 *
 * @function lastIndexOf
 */
    'lastIndexOf'
].forEach(k => _[k] = (v, x) => v[k](x));

/**
 * TODO
 *
 * @function sort
 */
_.sort = (v, fn) => clone(v).sort(_.every(v, _.isNumber) ? (a, b) => a - b : fn);

/**
 * TODO
 *
 * @function and
 */
_.and = (...args) => _.reduce(args, (a, b) => _.isFalsy(a) ? a : b);

/**
 * TODO
 *
 * @function or
 */
_.or = (...args) => _.reduce(args, (a, b) => _.isFalsy(a) ? b : a);

/**
 * TODO
 *
 * @function isEquiv
 */
_.isEqiv = (a, b) => {
    if ([ a, b ].every(_.isObject)) {
        const ks = _.keys(a);
        if (ks.length != _.keys(b).length) return false;
        while (ks.length) {
            let k = ks.pop();
            if (a[k] !== b[k]) return false;
        }
        return true;
    } else {
        return a == b;
    }
};

/**
 * TODO
 *
 * @function pipe
 */
_.pipe = (first, ...rest) => (...args) => _.reduce(rest, (acc, fn) => fn(acc), first(...args));

/**
 * TODO
 *
 * @function compose
 */
_.compose = (...fns) => ((f) => (...args) => _.pipe(...f)(...args))(_.reverse([ ...fns ]));

/**
 * TODO
 *
 * @function isEmpty
 */
_.isEmpty = v => _.isArray(v) || _.isString(v)
    ? !v.length
    : _.isObject(v)
        ? !Object.keys(v).length
        : _.isNil(v);

/**
 * TODO
 *
 * @function castPath
 */
_.castPath = v => {
    if (_.isArray(v)) return [ ...v ];
    const chars = ('' + v).split('');
    const result = [];
    let value = '';
    let i = 0;
    const set = v => (result.push(/^[0-9]+$/.test(v) ? +v : v), value = '');
    while (i < chars.length) {
        if ([ '.', '[', ']' ].includes(chars[i])) {
            if (i++ === 0) continue;
            if (chars[i - 2] !== ']') set(value);
        } else if ([ "'", '"' ].includes(chars[i])) {
            let q = chars[i++];
            while (chars[i] !== q) {
                if (chars[i] === '\\') value += chars[i++];
                value += chars[i++];
            }
            i++;
        } else {
            value += chars[i++];
        }
    }
    if (value.length) set(value);
    return result;
};

/**
 * TODO
 *
 * @function get
 */
_.get = (o, p, d) => _.pipe(_.castPath, _.partialRight(_.reduce, (a, k) => _.isObject(a) && a[k] || _.nil, o))(p) || d;

/**
 * TODO
 *
 * @function has
 */
_.has = (o, p) => _.pipe(_.isNil, _.not)(_.get(o, p));

/**
 * TODO
 *
 * @function walkPath
 */
_.walkPath = (o, p, fn, mutate = false) => {
    const kp = _.castPath(p);
    const result = o == null
        ? _.isNumber(kp[0])
            ? []
            : {}
        : mutate
            ? o
            : clone(o) || {};
    let cursor = result;
    while (kp.length) {
        let c = kp.shift();
        let n = kp[0];
        fn(cursor, c, n);
        if (n != null) cursor = cursor[c];
    }
    return result;
};

/**
 * TODO
 *
 * @function assoc
 */
_.assoc = (o, p, v, m = false) => _.walkPath(o, p, (c, k, n) => (_.isNil(n)
    ? c[k] = v
    : c[k] = clone(_.isNil(c[k]) && _.isNumber(n) ? [] : c[k]) || {}), m);

/**
 * TODO
 *
 * @function dissoc
 */
_.dissoc = (o, p, m = false) => _.walkPath(o, p, (c, k, n) => (_.isNil(n)
    ? _.isArray(c)
        ? c.splice(_.isNil(n), c.length)
        : (delete c[k])
    : c[k] = clone(c[k]) || {}), m);

/**
 * TODO
 *
 * @function set
 */
_.set = _.partialRight(_.assoc, true);

/**
 * TODO
 *
 * @function drop
 */
_.drop = _.partialRight(_.dissoc, true);

/**
 * TODO
 *
 * @function assign
 */
_.assign = Object.assign;

/**
 * TODO
 *
 * @function merge
 */
_.merge = (...args) => _.reduce(args, (a, arg) => {
        _.forEach(_.entries(arg), ([ k, v ]) => {
            if (_.isObject(v)) {
                a[k] = _.merge(a[k] || (_.isArray(v) ? [] : {}), v);
            } else if (_.notNil(v)) {
                a[k] = v;
            }
        });
        return a;
    });
