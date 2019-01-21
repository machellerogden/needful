'use strict';
const _ = exports;
[
    'fill',
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift'
].forEach((k, r) => _[k] = (v, ...args) => (r = [ ...(v || []) ], [][k].apply(r, args), r));
[
    'concat',
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
[
    'entries',
    'keys',
    'values'
].forEach(k => _[k] = (v) => Array.isArray(v) ? [ ...[][k].apply(v || []) ] : Object[k](v));
_.nil = void 0;
_.not = v => !v;
_.complement = fn => (...args) => !fn(...args);
_.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
_.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);
_.eql = (a, b) => {
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
_.equal = (a, b) => _.every([typeof a, typeof b ], v => v === 'object')
    ? Object.is(a, b)
    : a === b;
_.isNil = v => _.eql(v, _.nil);
_.notNil = _.complement(_.isNil);
_.isFalse = v => _.equal(v, false);
_.falsy = v => _.isNil(v) || _.isFalse(v);
_.truthy = _.complement(_.falsy);
_.is = (v, t) => _.equal(typeof v, t);
_.isString = v => _.is(v, 'string');
_.isNumber = v => _.is(v, 'number');
_.isBoolean = v => _.is(v, 'boolean');
_.isUndefined = v => _.is(v, 'undefined');
_.isNull = v => _.equal(v, null);
_.isArray = Array.isArray;
_.isObject = v => !_.isNil(v) && _.is(v, 'object');
_.isPlainObject = v => _.equal(Object.prototype.toString.call(v), '[object Object]');
_.pipe = (first, ...rest) => (...args) => _.reduce(rest, (acc, fn) => fn(acc), first(...args));
_.vpipe = (v, ...rest) => _.pipe(...rest)(v);
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
_.get = (o, p, d) => _.vpipe(p, _.keypath, _.partialRight(_.reduce, (a, k) => _.isObject(a) && a[k] || _.nil, o)) || d;
_.has = (o, p) => _.vpipe(_.get(o, p), _.isNil, _.not);
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
_.set = (o, p, v) => _.walk(o, p, (cursor, k, next) => (_.isNil(next)
    ? cursor[k] = v
    : cursor[k] = _.isNil(cursor[k]) && _.isNumber(next) ? [] : cursor[k]), true);
_.drop = (o, p) => _.walk(o, p, (cursor, k, next) => (_.isNil(next)
    ? _.isArray(cursor)
        ? cursor.splice(_.isNil(next), cursor.length)
        : (delete cursor[k])
    : cursor[k] = cursor[k]), true);
_.assoc = (o, p, v) => _.walk(o, p, (c, k, n) => _.isNil(n)
    ? c[k] = v
    : c[k] = _.shallow(_.isNil(c[k]) && _.isNumber(n) ? [] : c[k]));
_.dissoc = (o, p) => _.walk(o, p, (c, k, n) => _.isNil(n)
    ? _.isArray(c)
        ? c.splice(_.isNil(n), c.length)
        : (delete c[k])
    : c[k] = _.shallow(c[k]));
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
