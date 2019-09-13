'use strict';
const _ = exports;
const numberTypes = new Set(['string', 'number']);
_.nil = void 0;
_.isArray = Array.isArray;
_.is = (v, t) => typeof v === t;
_.isNil = v => v == _.nil;
_.notNil = v => v != _.nil;
_.isObject = v => _.notNil(v) && _.is(v, 'object');
_.isEqual = (a, b) => [ a, b ].every(_.isObject)
    ? Object.is(a, b)
    : a === b;
_.isFalse = v => _.isEqual(v, false);
_.isFalsy = v => _.isNil(v) || _.isFalse(v);
_.complement = fn => (...args) => _.isFalsy(fn(...args));
_.isTruthy = _.complement(_.isFalsy);
_.isZero = v => v === 0;
_.isString = v => _.is(v, 'string');
_.isNumber = v => _.is(v, 'number');
_.isNumeric = n => numberTypes.has(typeof n) && !isNaN(parseInt(n, 10)) && isFinite(n);
_.isBoolean = v => _.is(v, 'boolean');
_.isUndefined = v => _.is(v, 'undefined');
_.isNull = v => v === null;
_.isPlainObject = v => Object.prototype.toString.call(v) === '[object Object]';
_.not = _.isFalsy;
_.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
_.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);
_.deepClone = x => _.isArray(x)
    ? [ ...x ].map(_.deepClone)
    : _.isObject(x)
        ? Object.entries({ ...x }).reduce((a, [k, v]) => (a[k] = _.deepClone(v), a), {})
        : x;
[ 'fill', 'push', 'reverse', 'unshift', 'splice' ].forEach((k, r) =>
    _[k] = (v, ...args) => (r = _.deepClone(v) || [], [][k].apply(r, args), r));
[ 'concat', 'join', 'slice', 'every', 'filter', 'find', 'findIndex', 'forEach', 'map', 'reduce', 'reduceRight', 'some' ].forEach(k =>
    _[k] = (v, ...args) => [][k].apply(_.deepClone(v) || [], args.map(_.deepClone)));
[ 'entries', 'keys', 'values' ].forEach(k => _[k] = (v) => _.isArray(v) ? [ ...[][k].apply(v || []) ] : Object[k](v));
[ 'pop', 'shift' ].forEach(k => _[k] = v => _.deepClone(v)[k]());
[ 'includes', 'indexOf', 'lastIndexOf' ].forEach(k => _[k] = (v, x) => v[k](x));
_.sort = (v, fn) => _.deepClone(v).sort(_.every(v, _.isNumber) ? (a, b) => a - b : fn);
_.and = (...args) => _.reduce(args, (a, b) => _.isFalsy(a) ? a : b);
_.or = (...args) => _.reduce(args, (a, b) => _.isFalsy(a) ? b : a);
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
_.pipe = (first, ...rest) => (...args) => _.reduce(rest, (acc, fn) => fn(acc), first(...args));
_.compose = (...fns) => ((f) => (...args) => _.pipe(...f)(...args))(_.reverse([ ...fns ]));
_.isEmpty = v => _.isArray(v) || _.isString(v)
    ? !v.length
    : _.isObject(v)
        ? !Object.keys(v).length
        : _.isNil(v);
_.castPath = v => {
    if (_.isArray(v)) return [ ...v ];
    const chars = ('' + v).split('');
    const result = [];
    let value = '';
    let i = 0;
    const set = v => (result.push(_.isNumeric(v) ? +v : v), value = '');
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
_.get = (o, p, d) => _.pipe(_.castPath, _.partialRight(_.reduce, (a, k) => _.isObject(a) && a[k] || _.nil, o))(p) || d;
_.has = (o, p) => _.pipe(_.isNil, _.not)(_.get(o, p));
_.walkPath = (o, p, fn, mutate = false) => {
    const kp = _.castPath(p);
    const result = o == null
        ? _.isNumber(kp[0])
            ? []
            : {}
        : mutate
            ? o
            : _.deepClone(o) || {};
    let cursor = result;
    while (kp.length) {
        let c = kp.shift();
        let n = kp[0];
        fn(cursor, c, n);
        if (n != null) cursor = cursor[c];
    }
    return result;
};
_.assoc = (o, p, v, m = false) => _.walkPath(o, p, (c, k, n) => (_.isNil(n)
    ? c[k] = v
    : c[k] = _.deepClone(_.isNil(c[k]) && _.isNumber(n) ? [] : c[k]) || {}), m);
_.dissoc = (o, p, m = false) => _.walkPath(o, p, (c, k, n) => (_.isNil(n)
    ? _.isArray(c)
        ? c.splice(_.isNil(n), c.length)
        : (delete c[k])
    : c[k] = _.deepClone(c[k]) || {}), m);
_.set = _.partialRight(_.assoc, true);
_.drop = _.partialRight(_.dissoc, true);
_.assign = Object.assign;
_.merge = (...args) => _.reduce(args, (a, arg) => {
    _.forEach(_.entries(arg), ([ k, v ]) => {
        if (_.isObject(a[k]) && _.isObject(v)) {
            a[k] = _.merge(a[k], v);
        } else if (_.notNil(v)) {
            a[k] = v;
        }
    });
    return a;
});
