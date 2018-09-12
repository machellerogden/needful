'use strict';

const util = require('util');

exports.or = (v, alt) => v != null ? v : alt;
exports.and = (v, alt) => v == null ? null : alt == null ? null : alt;
exports.compliment = fn => (...args) => !fn(...args);
exports.partial = (fn, ...args) => (...rest) => fn(...[ ...args, ...rest ]);
exports.partialRight = (fn, ...args) => (...rest) => fn(...[ ...rest, ...args ]);
exports.compose = (first, ...rest) => (...args) => rest.reduce((acc, fn) => fn(acc), first(...args));
exports.pipe = (...fns) => (...args) => compose(...fns.reverse())(...args);

exports.isObject = v => v != null
    && typeof v === 'object'
    && v.constructor
    && v.constructor.name === 'Object';

exports.isPlainObject = v => exports.isObject(v)
    && !util.types.isArgumentsObject(v) // Object.prototype.toString.call(v) === '[object Arguments]' 
    && !util.types.isProxy(v);
