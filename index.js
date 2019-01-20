'use strict';
const _ = exports;
[   'fill',
    'push',
    'reverse',
    'unshift',
    'sort',
    'splice'
].forEach((k, r) => _[k] = (v, ...args) => (r = [ ...(v || []) ], [][k].apply(r, args), r));
[   'pop',
    'shift'
].forEach(k => _[k] = v => [ ...v ][k]());
[   'concat',
    'includes',
    'indexOf',
    'join',
    'lastIndexOf',
    'slice',
    'every',
    'filter',
    'find',
    'findIndex',
    'forEach',
    'map',
    'reduce',
    'reduceRight',
    'some'
].forEach(k => _[k] = (v, ...args) => [][k].apply(v || [], args));
[   'entries',
    'keys',
    'values'
].forEach(k => _[k] = (v) => Array.isArray(v) ? [ ...[][k].apply(v || []) ] : Object[k](v));
_.nil = void 0;
_.not = v => !v;
_.and = (...args) => _.reduce(args, (a, b) => _.falsy(a) ? a : b);
_.or = (...args) => _.reduce(args, (a, b) => _.falsy(a) ? b : a);
_.complement = fn => (...args) => !fn(...args);
_.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
_.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);
_.isEqiv = (a, b) => {
    if (_.every([typeof a, typeof b ], v => v === 'object')) {
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
_.isEqual = (a, b) => _.every([typeof a, typeof b ], v => v === 'object')
    ? Object.is(a, b)
    : a === b;
_.isNil = v => _.isEqiv(v, _.nil);
_.notNil = _.complement(_.isNil);
_.isFalse = v => _.isEqual(v, false);
_.falsy = v => _.isNil(v) || _.isFalse(v);
_.truthy = _.complement(_.falsy);
_.is = (v, t) => _.isEqual(typeof v, t);
_.isString = v => _.is(v, 'string');
_.isNumber = v => _.is(v, 'number');
_.isBoolean = v => _.is(v, 'boolean');
_.isUndefined = v => _.is(v, 'undefined');
_.isNull = v => _.isEqual(v, null);
_.isArray = Array.isArray;
_.isObject = v => !_.isNil(v) && _.is(v, 'object');
_.isPlainObject = v => _.isEqual(Object.prototype.toString.call(v), '[object Object]');
_.pipe = (first, ...rest) => (...args) => _.reduce(rest, (acc, fn) => fn(acc), first(...args));
_.compose = (...fns) => ((f) => (...args) => _.pipe(...f)(...args))(_.reverse([ ...fns ]));
_.shallow = (v = {}) => _.isArray(v)
    ? [ ...v ]
    : _.isObject(v)
        ? { ...v }
        : v;
_.isEmpty = v => _.isArray(v) || _.isString(v)
    ? !v.length
    : _.isObject(v)
        ? !Object.keys(v).length
        : _.isNil(v);
_.keypath = v => {
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
_.get = (o, p, d) => _.pipe(_.keypath, _.partialRight(_.reduce, (a, k) => _.isObject(a) && a[k] || _.nil, o))(p) || d;
_.has = (o, p) => _.pipe(_.isNil, _.not)(_.get(o, p));
_.walk = (o, p, fn, mutate = false) => {
    const kp = _.keypath(p);
    const result = o == null
        ? _.isNumber(kp[0])
            ? []
            : {}
        : mutate
            ? o
            : _.shallow(o);
    let cursor = result;
    while (kp.length) {
        let current = kp.shift();
        let next = kp[0];
        fn(cursor, current, next);
        if (next != null) cursor = cursor[current];
    }
    return result;
};
_.assoc = (o, p, v, m = false) => _.walk(o, p, (c, k, n) => (_.isNil(n)
    ? c[k] = v
    : c[k] = _.shallow(_.isNil(c[k]) && _.isNumber(n) ? [] : c[k])), m);
_.dissoc = (o, p, m = false) => _.walk(o, p, (c, k, n) => (_.isNil(n)
    ? _.isArray(c)
        ? c.splice(_.isNil(n), c.length)
        : (delete c[k])
    : c[k] = _.shallow(c[k])), m);
_.set = _.partialRight(_.assoc, true);
_.drop = _.partialRight(_.dissoc, true);
_.assign = Object.assign;
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
