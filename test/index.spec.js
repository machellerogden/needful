'use strict';

const chai = require('chai');
const { expect } = chai;

const {
    complement,
    falsy,
    truthy,
    partial,
    partialRight,
    pipe,
    vpipe,
    compose,
    isObject,
    isPlainObject,
    get,
    has,
    set, // TODO
    drop, // TODO
    assoc,
    dissoc,
    keypath,
    fill, // TODO
    pop, // TODO
    push, // TODO
    reverse, // TODO
    shift, // TODO
    sort, // TODO
    splice, // TODO
    unshift, // TODO
    concat, // TODO
    includes, // TODO
    indexOf, // TODO
    join, // TODO
    lastIndexOf, // TODO
    slice, // TODO
    entries, // TODO
    every, // TODO
    filter, // TODO
    find, // TODO
    findIndex, // TODO
    forEach, // TODO
    keys, // TODO
    map, // TODO
    reduce, // TODO
    reduceRight, // TODO
    some, // TODO
    values, // TODO
    shallow, // TODO
    isEmpty, // TODO
    eql,
    equal,
    merge
} = require('..');

describe('#eql', () => {
    it('compares values with loose equality', () => {
        expect(eql('foo', 'foo')).to.be.true;
        expect(eql({ foo: 'bar' }, { foo: 'bar' })).to.be.true;
    });
});

describe('#equal', () => {
    it('compares values with strict equality', () => {
        expect(equal('foo', 'foo')).to.be.true;
        expect(equal({ foo: 'bar' }, { foo: 'bar' })).to.be.false;
        const foo = { foo: 'bar' };
        expect(eql(foo, foo)).to.be.true;
    });
});

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

describe('#vpipe', () => {
    it('performs left-to-right function composition', () => {
        const fooify = (v) => `${v}-foo`;
        const barify = (v) => `${v}-bar`;
        const bazify = (v) => `${v}-baz`;
        expect(vpipe('xxx', fooify, barify, bazify)).to.equal('xxx-foo-bar-baz');
    });
});

describe('#compose', () => {
    it('performs right-to-left function composition', () => {
        const fooify = (v) => `${v}-foo`;
        const barify = (v) => `${v}-bar`;
        const bazify = (v) => `${v}-baz`;
        expect(compose(bazify, barify, fooify)('xxx')).to.equal('xxx-foo-bar-baz');
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

describe.only('#keypath', () => {
    it('returns array representing a keypath for a given keypath string', () => {
        expect(keypath('foo.bar')).to.eql([ 'foo', 'bar' ]);
        expect(keypath('foo["bar"]')).to.eql([ 'foo', 'bar' ]);
        expect(keypath('foo["b\\"ar"]')).to.eql([ 'foo', 'b\\"ar' ]);
        expect(keypath("foo['bar']")).to.eql([ 'foo', 'bar' ]);
        expect(keypath("foo['bar'].baz")).to.eql([ 'foo', 'bar', 'baz' ]);
        expect(keypath('foo[bar]')).to.eql([ 'foo', 'bar' ]);
        expect(keypath('foo[0]')).to.eql([ 'foo', 0 ]);
        expect(keypath('foo[0].bar')).to.eql([ 'foo', 0, 'bar' ]);
        expect(keypath('foo[0].bar[\'baz\'].qux')).to.eql([ 'foo', 0, 'bar', 'baz', 'qux' ]);
        expect(keypath('[0].bar[\'baz\'].qux')).to.eql([ 0, 'bar', 'baz', 'qux' ]);
        expect(keypath('["foo"].bar[\'baz\'].qux')).to.eql([ 'foo', 'bar', 'baz', 'qux' ]);
        expect(keypath(0)).to.eql([ 0 ]);
        expect(keypath('foo')).to.eql([ 'foo' ]);
    });
});

describe('#get', () => {
    it('returns value at given path', () => {
        expect(get({ foo: { bar: 'baz' } }, 'foo.bar')).to.equal('baz');
        expect(get({ foo: { bar: 'baz' } }, 'foo["bar"]')).to.equal('baz');
        expect(get({ foo: [ "bar", { baz: "qux" } ] }, 'foo[1].baz')).to.equal('qux');
        expect(get({ foo: { bar: 'baz' } }, [ 'foo', 'bar' ])).to.equal('baz');
        expect(get({ foo: [ "bar", { baz: "qux" } ] }, [ 'foo', 1, 'baz' ])).to.equal('qux');
        expect(get({ foo: [ "bar", { baz: "qux" } ] }, [ 'foo', 2, 'does', 'not', 'exist' ])).to.be.undefined;
    });
});

describe('#has', () => {
    it('returns value at given path', () => {
        expect(has({ foo: [ "bar", { baz: "qux" } ] }, 'foo[1].baz' )).to.be.true;
        expect(has({ foo: [ "bar", { baz: "qux" } ] }, [ 'foo', 1, 'baz' ])).to.be.true;
        expect(has({ foo: [ "bar", { baz: "qux" } ] }, [ 'foo', 1, 'qux' ])).to.be.false;
    });
});

describe('#assoc', () => {
    it('assoc value at given path', () => {
        expect(assoc({ foo: { bar: 'baz' } }, 'foo.bar', 'qux')).to.eql({ foo: { bar: 'qux' } });
        expect(assoc({ foo: { bar: [ 'baz', 'qux' ] } }, 'foo.bar[1]', 'foo')).to.eql({ foo: { bar: [ 'baz', 'foo' ] } });
        expect(assoc({}, 'foo.bar[1]', 'foo')).to.eql({ foo: { bar: [ void 0, 'foo' ] } });
        expect(assoc({}, 'foo.bar[1].qux', 'xyzzy')).to.eql({ foo: { bar: [ void 0, { qux: 'xyzzy' } ] } });
        expect(assoc([], '[0].qux', 'xyzzy')).to.eql([ { qux: 'xyzzy' } ]);
        expect(assoc([], '[1].qux', 'xyzzy')).to.eql([ void 0, { qux: 'xyzzy' } ]);
        expect(assoc([], '[0]', 'xyzzy')).to.eql([ 'xyzzy' ]);
        expect(assoc(null, '[0]', 'xyzzy')).to.eql([ 'xyzzy' ]);
        //expect(assoc(null, 'foo', 'bar')).to.eql({ foo: 'bar' });
    });
});

describe('#dissoc', () => {
    it('dissoc value at given path', () => {
        expect(dissoc({ foo: { bar: 'baz' } }, 'foo.bar')).to.eql({ foo: {} });
        expect(dissoc({ foo: { bar: [ 'baz', 'qux' ] } }, 'foo.bar[1]')).to.eql({ foo: { bar: [ 'baz' ] } });
    });
});

describe('#merge', () => {
    it('merge objects', () => {
        expect(merge({ foo: { bar: 'baz' } }, { foo: { qux: 'xyzzy' } })).to.eql({ foo: { bar: 'baz', qux: 'xyzzy' } });
        expect(merge({ foo: { bar: 'baz', qux: [ 'foo' ] } }, { foo: { qux: [ void 0, 'xyzzy' ], bam: 'boom' } })).to.eql({ foo: { bar: 'baz', qux: [ 'foo', 'xyzzy' ], bam: 'boom' } });
    });
});

describe('#entries', () => {
    it('gets kv pairs for given object ', () => {
        expect(entries({ foo: 'bar', baz: 'qux' })).to.eql([ [ 'foo', 'bar' ], [ 'baz', 'qux' ] ]);
        expect(entries([ 'foo', 'bar' ])).to.eql([ [ 0, 'foo' ], [ 1, 'bar' ] ]);
    });
});
