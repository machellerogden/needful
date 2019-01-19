'use strict';
const _ = exports;

_.nil = void 0;
[
    'fill',
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift',
    'concat',
    'includes',
    'indexOf',
    'join',
    'lastIndexOf',
    'slice',
    'entries',
    'every',
    'filter',
    'find',
    'findIndex',
    'forEach',
    'keys',
    'map',
    'reduce',
    'reduceRight',
    'some',
    'values'
].forEach(k => _[k] = (v, ...args) => [][k].apply([ ...(v || []) ], args));
_.not = v => !v;
_.complement = fn => (...args) => !fn(...args);
_.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
_.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);
_.eql = (a, b) => a == b;
_.equal = (a, b) => a === b;
_.isNil = v => _.eql(v, _.nil);
_.isFalse = v => _.equal(v, false);
_.falsy = v => _.isNil(v) || _.isFalse(v);
_.and = (...args) => _.reduce(args, (a, b) => _.falsy(a)
    ? a
    : b);
_.or = (...args) => _.reduce(args, (a, b) => _.falsy(a)
    ? b
    : a);
_.truthy = _.complement(_.falsy);
_.is = (v, t) => _.equal(typeof v, t);
_.isString = v => _.is(v, 'string');
_.isNumber = v => _.is(v, 'number');
_.isBoolean = v => _.is(v, 'boolean');
_.isUndefined = v => _.is(v, 'undefined');
_.isNull = v => _.equal(v, null);
_.isObject = v => _.and(!_.isNil(v), _.is(v, 'object'));
_.isPlainObject = v => _.equal(Object.prototype.toString.call(v), '[object Object]');
_.pipe = (first, ...rest) => (...args) => _.reduce(rest, (acc, fn) => fn(acc), first(...args));
_.vpipe = (v, ...rest) => _.pipe(...rest)(v);
_.compose = (...fns) => ((f) => (...args) => _.pipe(...f)(...args))(_.reverse([ ...fns ]));
_.shallow = (v = {}) => Array.isArray(v)
    ? [ ...v ]
    : _.isObject(v)
        ? { ...v }
        : v;
_.isEmpty = v => Array.isArray(v) || _.isString(v)
    ? !v.length
    : _.isObject(v)
        ? !Object.keys(v).length
        : _.isNil(v);
_.keypath = v => {
    if (Array.isArray(v)) return _.shallow(v);
    const chars = v.split('');
    const result = [ '' ];
    let i = 0;
    while (i < chars.length) {
        let edge = i === 0;
        if (chars[i] === '.') {
            result.push('');
            i++;
        } else if (chars[i] === ']') {
            i++;
        } else if (chars[i] === '[') {
            i++;
            let value = '';
            let q;
            if ([ "'", '"' ].includes(chars[i])) {
                q = chars[i++];
                while (chars[i] !== q) {
                    if (chars[i] === '\\') value += chars[i++];
                    value += chars[i++];
                }
                i++;
            } else {
               while (chars[i] !== ']') value += chars[i++];
            }
            value = !q && (/[0-9]/.test(value[0]))
                ? +value
                : value;
            if (edge) {
                result[result.length - 1] += value;
            } else {
                result.push(value);
            }
        } else {
            result[result.length - 1] += chars[i];
            i++;
        }
        continue;
    }
    return result;
};
_.get = (o, p) => _.vpipe(p, _.keypath, _.partialRight(_.reduce, (a, k) => _.or(_.isObject(a) && a[k], _.nil), o));
_.has = (o, p) => _.vpipe(_.get(o, p), _.isNil, _.not);
_.walk = (o, p, fn) => {
    const kp = _.keypath(p);
    const result = _.shallow(o);
    let cursor = result;
    while (kp.length) {
        let current = kp.shift();
        let next = kp[0];
        fn(cursor, current, next);
        if (next != null) cursor = cursor[current];
    }
    return result;
};
_.assoc = (o, p, v) => _.walk(o, p, (cursor, k, next) => _.isNil(next)
    ? cursor[k] = v
    : cursor[k] = _.shallow(_.isNil(cursor[k]) && _.isNumber(next) ? [] : cursor[k]));
_.dissoc = (o, p) => _.walk(o, p, (cursor, k, next) => _.isNil(next)
    ? Array.isArray(cursor)
        ? cursor.splice(_.isNil(next), cursor.length)
        : (delete cursor[k])
    : cursor[k] = _.shallow(cursor[k]));
