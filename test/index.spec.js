'use strict';

const chai = require('chai');
const { expect } = chai;

const {
    isObject,
    isPlainObject,
    or,
    and,
    partial,
    partialRight,
    compose,
    pipe
} = require('..');

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
        expect(isPlainObject(new Proxy({}, () => {}))).to.be.false;
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
    });
});

