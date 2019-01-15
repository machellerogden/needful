'use strict';
const keypath = require('./keypath');
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
exports.get = (o, p) => (Array.isArray(p) ? p : keypath(p)).reduce((a, k) => (exports.isObject(a) && a[k] || void 0), o);
exports.has = (o, p) => exports.get(o, p) != null;
exports.set = (o, p, v) => {
    if (!exports.isObject(o)) return o;
    const result = Array.isArray(o)
        ? [ ...o ]
        : { ...o };
    const kp = [ ...(Array.isArray(p)
        ? p
        : keypath(p)) ];
    let cursor = result;
    let last = kp.pop();
    while (kp.length) {
        let c = kp.shift();
        cursor = cursor[c];
    }
    cursor[last] = v;
    return result;
};
