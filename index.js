'use strict';

// core utility fns
exports.falsy = v => v == null || v === false;
exports.truthy = v => v != null && v !== false;
exports.or = (v, alt) => v != null && v !== false ? v : alt;
exports.and = (v, alt) => v == null || v === false ? v : alt;
exports.complement = fn => (...args) => !fn(...args);
exports.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
exports.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);
exports.pipe = (first, ...rest) => (...args) => rest.reduce((acc, fn) => fn(acc), first(...args));
exports.compose = (...fns) => ((f) => (...args) => exports.pipe(...f)(...args))([ ...fns ].reverse());
exports.is = (t, v) => typeof v === t;
exports.isString = v => typeof v === 'string';
exports.isNumber = v => typeof v === 'number';
exports.isBoolean = v => typeof v === 'boolean';
exports.isUndefined = v => typeof v === 'undefined';
exports.isNull = v => v === null;
exports.isNil = v => v == null;
exports.isObject = v => v != null && typeof v === 'object';
exports.isPlainObject = v => Object.prototype.toString.call(v) === '[object Object]';
exports.shallow = v => !exports.isObject(v) && v || Array.isArray(v) ? [ ...v ] : { ...v };

// mutating in the name of immutability
// here be dragons... gigo
exports.keypath = v => {
    if (Array.isArray(v)) return exports.shallow(v);
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
            i++;
            let value = '';
            if ([ "'", '"' ].includes(chars[i])) {
                const q = chars[i++];
                while (chars[i] !== q) {
                    if (chars[i] === '\\') value += chars[i++];
                    value += chars[i++];
                }
                i++;
                result.push(value);
                continue;
            }
            if (/[0-9]/.test(chars[i])) {
                while (chars[i] !== ']') value += chars[i++];
                result.push(+value);
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
exports.get = (o, p) => exports.keypath(p).reduce((a, k) => (exports.isObject(a) && a[k] || void 0), o);
exports.has = (o, p) => exports.get(o, p) != null;
exports.walk = (o, p, fn) => {
    const result = exports.shallow(o);
    let cursor = result;
    const kp = exports.keypath(p);
    let last = kp.pop();
    while (kp.length) {
        let current = kp.shift();
        fn(cursor, current, false);
        cursor = cursor[current];
    }
    fn(cursor, last, true);
    return result;
};
exports.assoc = (o, p, v) => exports.walk(o, p, (cursor, k, last) => last
    ? cursor[k] = v
    : cursor[k] = exports.shallow(cursor[k]));
exports.dissoc = (o, p) => exports.walk(o, p, (cursor, k, last) => last
    ? Array.isArray(cursor)
        ? cursor.splice(last, cursor.length)
        : (delete cursor[last])
    : cursor[k] = exports.shallow(cursor[k]));
