'use strict';
exports.falsy = v => v == null || v === false;
exports.truthy = v => v != null && v !== false;
exports.or = (v, alt) => v != null && v !== false ? v : alt;
exports.and = (v, alt) => v == null || v === false ? v : alt;
exports.complement = fn => (...args) => !fn(...args);
exports.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
exports.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);
exports.pipe = (first, ...rest) => (...args) => rest.reduce((acc, fn) => fn(acc), first(...args));
exports.compose = (...fns) => {
    const f = [...fns].reverse();
    return (...args) => exports.pipe(...f)(...args);
};
exports.is = (t, v) => typeof v === t;
exports.isString = v => typeof v === 'string';
exports.isNumber = v => typeof v === 'number';
exports.isBoolean = v => typeof v === 'boolean';
exports.isUndefined = v => typeof v === 'undefined';
exports.isNull = v => v === null;
exports.isNil = v => v == null;
exports.isObject = v => v != null && typeof v === 'object';
exports.isPlainObject = v => Object.prototype.toString.call(v) === '[object Object]';
