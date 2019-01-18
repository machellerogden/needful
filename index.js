'use strict';
const _ = exports;

// logical truthiness
_.falsy = v => v == null || v === false;
_.truthy = v => v != null && v !== false;
_.or = (v, alt) => v != null && v !== false ? v : alt;
_.and = (v, alt) => v == null || v === false ? v : alt;

// partial application
_.complement = fn => (...args) => !fn(...args);
_.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
_.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);

// functional composition
_.pipe = (first, ...rest) => (...args) => rest.reduce((acc, fn) => fn(acc), first(...args));
_.compose = (...fns) => ((f) => (...args) => _.pipe(...f)(...args))([ ...fns ].reverse());

// types
_.is = (v, t) => typeof v === t;
_.isString = v => _.is(v, 'string');
_.isNumber = v => _.is(v, 'number');
_.isBoolean = v => _.is(v, 'boolean');
_.isUndefined = v => _.is(v, 'undefined');
_.isNull = v => v === null;
_.isNil = v => v == null;
_.isObject = v => v != null && _.is(v, 'object');
_.isPlainObject = v => Object.prototype.toString.call(v) === '[object Object]';

// objects
_.shallow = v => !_.isObject(v) && v || Array.isArray(v) ? [ ...v ] : { ...v };
_.keypath = v => {
    if (Array.isArray(v)) return _.shallow(v);
    const chars = v.split('');
    const result = [ '' ];
    let i = 0;
    while (i < chars.length) {
        if (chars[i] === '.') {
            result.push('');
            i++;
            continue;
        }
        if (chars[i] === ']') {
            i++;
            continue;
        }
        if (chars[i] === '[') {
            let edge = i === 0;
            i++;
            let value = '';
            if ([ "'", '"' ].includes(chars[i])) {
                const q = chars[i++];
                while (chars[i] !== q) {
                    if (chars[i] === '\\') value += chars[i++];
                    value += chars[i++];
                }
                i++;
                if (edge) {
                    result[result.length - 1] += value;
                } else {
                    result.push(value);
                }
                continue;
            }
            if (/[0-9]/.test(chars[i])) {
                while (chars[i] !== ']') value += chars[i++];
                if (edge) {
                    result[result.length - 1] += +value;
                } else {
                    result.push(+value);
                }
                continue;
            }
            while (chars[i] !== ']') value += chars[i++];
            result.push(value);
            continue;
        }
        result[result.length - 1] += chars[i];
        i++;
    }
    return result;
};
_.get = (o, p) => _.keypath(p).reduce((a, k) => (_.isObject(a) && a[k] || void 0), o);
_.has = (o, p) => _.get(o, p) != null;
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
_.assoc = (o, p, v) => _.walk(o, p, (cursor, k, next) => next == null
    ? cursor[k] = v
    : cursor[k] = _.shallow(cursor[k] == null && typeof next === 'number' ? [] : cursor[k]));
_.dissoc = (o, p) => _.walk(o, p, (cursor, k, next) => next == null
    ? Array.isArray(cursor)
        ? cursor.splice(next == null, cursor.length)
        : (delete cursor[k])
    : cursor[k] = _.shallow(cursor[k]));
