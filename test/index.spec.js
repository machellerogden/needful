'use strict';

const chai = require('chai');
const { expect } = chai;

const {
    complement,
    falsy,
    truthy,
    or,
    and,
    partial,
    partialRight,
    pipe,
    compose,
    isObject,
    isPlainObject
} = require('..');

describe('#complement', () => {
    it('takes a given function and returns a new function which will return the opposite truth value', () => {
        const isTrue = () => true;
        expect(complement(isTrue)()).to.equal(false);
    });
});

describe('#falsy', () => {
    it('returns true if null or false', () => {
        expect(falsy(true)).to.be.false;
        expect(falsy(null)).to.be.true;
        expect(falsy(false)).to.be.true;
        expect(falsy(0)).to.be.false;
        expect(falsy('')).to.be.false;
        expect(falsy('foo')).to.be.false;
        expect(falsy([])).to.be.false;
        expect(falsy([ 1, 2, 3 ])).to.be.false;
        expect(falsy({})).to.be.false;
        expect(falsy({ foo: 'bar' })).to.be.false;
    });
});

describe('#truthy', () => {
    it('returns true if not null and not false', () => {
        expect(truthy(true)).to.be.true;
        expect(truthy(null)).to.be.false;
        expect(truthy(false)).to.be.false;
        expect(truthy(0)).to.be.true;
        expect(truthy('')).to.be.true;
        expect(truthy('foo')).to.be.true;
        expect(truthy([])).to.be.true;
        expect(truthy([ 1, 2, 3 ])).to.be.true;
        expect(truthy({})).to.be.true;
        expect(truthy({ foo: 'bar' })).to.be.true;
    });
});

describe('#or', () => {
    it('takes two arguments and returns the first one which is not null/false, or if both are null/false returns the last value', () => {
        expect(or(null, null)).to.equal(null);
        expect(or('foo', 'bar')).to.equal('foo');
        expect(or(null, 'bar')).to.equal('bar');
        expect(or(false, 'bar')).to.equal('bar');
        expect(or(0, 'bar')).to.equal(0);
        expect(or(1, 2)).to.equal(1);
        expect(or(0, 2)).to.equal(0);
        expect(or(-1, 2)).to.equal(-1);
        expect(or(null, 2)).to.equal(2);
        expect(or(null, {})).to.eql({});
    });
});

describe('#and', () => {
    it('takes two arguments and if the first value is null/false returns that value other returns the last value', () => {
        expect(and(null, null)).to.equal(null);
        expect(and('foo', 'bar')).to.equal('bar');
        expect(and(null, 'bar')).to.equal(null);
        expect(and(false, 'bar')).to.equal(false);
        expect(and(0, 'bar')).to.equal('bar');
        expect(and(1, 2)).to.equal(2);
        expect(and(0, 2)).to.equal(2);
        expect(and(-1, 2)).to.equal(2);
        expect(and(null, 2)).to.equal(null);
        expect(and(null, {})).to.eql(null);
    });
});

describe('#partial', () => {
    it('takes a given function and an arbitrary number of addtional arguments and returns a new function which will concat the given arguments with any arguments which are passed to the new function and apply them to the given function.', () => {
        const stringConcat = (a, b) => `${a}${b}`;
        expect(partial(stringConcat, 'foo-')('bar')).to.equal('foo-bar');
    });
});

describe('#partialRight', () => {
    it('takes a given function and an arbitrary number of addtional arguments and returns a new function which will concat the given arguments with any arguments which are passed to the new function and apply them to the given function.', () => {
        const stringConcat = (a, b) => `${a}${b}`;
        expect(partialRight(stringConcat, '-foo')('bar')).to.equal('bar-foo');
    });
});

describe('#pipe', () => {
    it('performs left-to-right function composition', () => {
        const fooify = (v) => `${v}-foo`;
        const barify = (v) => `${v}-bar`;
        const bazify = (v) => `${v}-baz`;
        expect(pipe(fooify, barify, bazify)('xxx')).to.equal('xxx-foo-bar-baz');
    });
});

describe('#compose', () => {
    it('performs right-to-left function composition', () => {
        const fooify = (v) => `${v}-foo`;
        const barify = (v) => `${v}-bar`;
        const bazify = (v) => `${v}-baz`;
        expect(compose(bazify, barify, fooify)('xxx')).to.equal('xxx-foo-bar-baz');
    });
});

describe('#isObject', () => {
    it('returns true if given what is general safe to assume is an object', () => {
        expect(isObject({ foo: 'bar' })).to.be.true;
    });
    it('returns false if given anything that is obviously not an object', () => {
        expect(isObject("foo")).to.be.false;
        expect(isObject(123)).to.be.false;
        expect(isObject(null)).to.be.false;
        expect(isObject(Infinity)).to.be.false;
    });
});

describe('#isPlainObject', () => {
    it('returns true if given a plain object', () => {
        expect(isPlainObject({ foo: 'bar' })).to.be.true;
    });
    it('returns false if given anything other than a plain object', () => {
        expect(isPlainObject("foo")).to.be.false;
        expect(isPlainObject(123)).to.be.false;
        expect(isPlainObject(Infinity)).to.be.false;
        expect(isPlainObject(null)).to.be.false;
        expect(isPlainObject([ 1, 2, 3 ])).to.be.false;
        expect(isPlainObject(function foo() {})).to.be.false;
        expect(isPlainObject(async function foo() {})).to.be.false;
        expect(isPlainObject((function foo(a) { return arguments; }('foo')))).to.be.false;
        expect(isPlainObject(new Set())).to.be.false;
        expect(isPlainObject(new Map())).to.be.false;
        expect(isPlainObject(new Promise(() => {}))).to.be.false;
        expect(isPlainObject(new WeakSet())).to.be.false;
        expect(isPlainObject(new WeakMap())).to.be.false;
        expect(isPlainObject(new Int8Array())).to.be.false;
        expect(isPlainObject(new Uint8Array())).to.be.false;
        expect(isPlainObject(new Uint8ClampedArray())).to.be.false;
        expect(isPlainObject(new Int16Array())).to.be.false;
        expect(isPlainObject(new Uint16Array())).to.be.false;
        expect(isPlainObject(new Int32Array())).to.be.false;
        expect(isPlainObject(new Uint32Array())).to.be.false;
        expect(isPlainObject(new Float32Array())).to.be.false;
        expect(isPlainObject(new Float64Array())).to.be.false;
        expect(isPlainObject(new ArrayBuffer())).to.be.false;
        expect(isPlainObject(new SharedArrayBuffer(8))).to.be.false;
        expect(isPlainObject(new DataView(new ArrayBuffer(8)))).to.be.false;
        expect(isPlainObject(new WebAssembly.Module(new Int8Array([ 0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00 ])))).to.be.false;

        // next test will fail, on Node >= 10 you can use util.types.isProxy(v) to test for Proxy instances if needed
        //expect(isPlainObject(new Proxy({}, () => {}))).to.be.false;
    });
});

