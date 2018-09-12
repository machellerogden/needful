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
    && !Array.isArray(v);

exports.isPlainObject = v => v != null
    && typeof v === 'object'
    && !Array.isArray(v)
    && typeof v !== 'function'
    && !util.types.isProxy(v)
    && !util.types.isAnyArrayBuffer(v)
    && !util.types.isArgumentsObject(v)
    && !util.types.isAsyncFunction(v)
    && !util.types.isBigInt64Array(v)
    && !util.types.isBigUint64Array(v)
    && !util.types.isBooleanObject(v)
    && !util.types.isDataView(v)
    && !util.types.isExternal(v)
    && !util.types.isFloat64Array(v)
    && !util.types.isGeneratorFunction(v)
    && !util.types.isGeneratorObject(v)
    && !util.types.isInt8Array(v)
    && !util.types.isInt16Array(v)
    && !util.types.isInt32Array(v)
    && !util.types.isMap(v)
    && !util.types.isMapIterator(v)
    && !util.types.isModuleNamespaceObject(v)
    && !util.types.isNativeError(v)
    && !util.types.isNumberObject(v)
    && !util.types.isPromise(v)
    && !util.types.isProxy(v)
    && !util.types.isRegExp(v)
    && !util.types.isSet(v)
    && !util.types.isSetIterator(v)
    && !util.types.isStringObject(v)
    && !util.types.isSymbolObject(v)
    && !util.types.isTypedArray(v)
    && !util.types.isUint8ClampedArray(v)
    && !util.types.isUint16Array(v)
    && !util.types.isUint32Array(v)
    && !util.types.isWeakMap(v)
    && !util.types.isWeakSet(v)
    && !util.types.isWebAssemblyCompiledModule(v);
