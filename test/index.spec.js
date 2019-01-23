'use strict';

const chai = require('chai');
const { expect } = chai;

const {
    and,
    or,
    complement,
    falsy,
    truthy,
    partial,
    partialRight,
    pipe,
    compose,
    isObject,
    isPlainObject,
    get,
    has,
    set,
    drop,
    assoc,
    dissoc,
    castPath,
    fill,
    pop,
    push,
    reverse,
    shift,
    sort,
    splice, // TODO
    unshift,
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
    keys,
    map, // TODO
    reduce, // TODO
    reduceRight, // TODO
    some, // TODO
    values,
    shallow, // TODO
    isEmpty, // TODO
    isEqiv,
    isEqual,
    merge
} = require('..');

describe('#or', () => {
    it('takes n arguments and returns the first one which is not null/false, or if both are null/false returns the last value', () => {
        expect(or(null, null)).to.equal(null);
        expect(or(null, null, true)).to.be.true;
        expect(or(null, true, 'bar')).to.be.true;
        expect(or('foo', 'bar')).to.equal('foo');
        expect(or(null, 'bar')).to.equal('bar');
        expect(or(false, 'bar')).to.equal('bar');
        expect(or(0, 'bar')).to.equal(0);
        expect(or(1, 2)).to.equal(1);
        expect(or(1, 2, 3, 4)).to.equal(1);
        expect(or(0, 2)).to.equal(0);
        expect(or(-1, 2)).to.equal(-1);
        expect(or(null, 2)).to.equal(2);
        expect(or(null, {})).to.eql({});
    });
});

describe('#and', () => {
    it('takes n arguments and if the first value is null/false returns that value other returns the last value', () => {
        expect(and(null, null)).to.equal(null);
        expect(and('foo', 'bar')).to.equal('bar');
        expect(and('foo', null, 'bar')).to.equal(null);
        expect(and(null, 'bar')).to.equal(null);
        expect(and(false, 'bar')).to.equal(false);
        expect(and(0, 'bar')).to.equal('bar');
        expect(and(1, 2)).to.equal(2);
        expect(and(1, 2, 3, 4, 5, 6)).to.equal(6);
        expect(and(null, 1, 2, 3, 4, 5, 6)).to.equal(null);
        expect(and(0, 2)).to.equal(2);
        expect(and(-1, 2)).to.equal(2);
        expect(and(null, 2)).to.equal(null);
        expect(and(null, {})).to.eql(null);
    });
});

describe('#isEqiv', () => {
    it('compares values with loose equality', () => {
        expect(isEqiv('foo', 'foo')).to.be.true;
        expect(isEqiv({ foo: 'bar' }, { foo: 'bar' })).to.be.true;
    });
});

describe('#isEqual', () => {
    it('compares values with strict equality', () => {
        expect(isEqual('foo', 'foo')).to.be.true;
        expect(isEqual({ foo: 'bar' }, { foo: 'bar' })).to.be.false;
        const foo = { foo: 'bar' };
        expect(isEqual(foo, foo)).to.be.true;
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

describe('#castPath', () => {
    it('returns array representing a keypath for a given keypath string', () => {
        expect(castPath('foo.bar')).to.eql([ 'foo', 'bar' ]);
        expect(castPath('foo["bar"]')).to.eql([ 'foo', 'bar' ]);
        expect(castPath('foo["b\\"ar"]')).to.eql([ 'foo', 'b\\"ar' ]);
        expect(castPath("foo['bar']")).to.eql([ 'foo', 'bar' ]);
        expect(castPath("foo['bar'].baz")).to.eql([ 'foo', 'bar', 'baz' ]);
        expect(castPath('foo[bar]')).to.eql([ 'foo', 'bar' ]);
        expect(castPath('foo[0]')).to.eql([ 'foo', 0 ]);
        expect(castPath('foo[0].bar')).to.eql([ 'foo', 0, 'bar' ]);
        expect(castPath('foo[0].bar[\'baz\'].qux')).to.eql([ 'foo', 0, 'bar', 'baz', 'qux' ]);
        expect(castPath('[0].bar[\'baz\'].qux')).to.eql([ 0, 'bar', 'baz', 'qux' ]);
        expect(castPath('["foo"].bar[\'baz\'].qux')).to.eql([ 'foo', 'bar', 'baz', 'qux' ]);
        expect(castPath(0)).to.eql([ 0 ]);
        expect(castPath('foo')).to.eql([ 'foo' ]);
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
        let obj;
        let result;
        obj = {
            foo: {
                bar: 'baz'
            }
        };
        result = assoc(obj, 'foo.bar', 'qux');
        expect(result).to.eql({
            foo: {
                bar: 'qux'
            }
        });
        expect(obj).to.eql({
            foo: {
                bar: 'baz'
            }
        });
        expect(obj).not.to.equal(result);
        obj = {
            foo: {
                bar: [
                    'baz',
                    'qux'
                ]
            }
        };
        result = assoc(obj, 'foo.bar[1]', 'foo');
        expect(result).to.eql({
            foo: {
                bar: [
                    'baz',
                    'foo'
                ]
            }
        });
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz',
                    'qux'
                ]
            }
        });
        expect(obj).not.to.equal(result);
        obj = {
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy'
                    }
                ]
            }
        };
        result = assoc(obj, 'foo.bar[1].bam', 'boom');
        expect(result).to.eql({
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy',
                        bam: 'boom'
                    }
                ]
            }
        });
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy'
                    }
                ]
            }
        });
        expect(obj).not.to.equal(result);
        obj = {};
        result = assoc({}, 'foo.bar[1]', 'foo');
        expect(result).to.eql({
            foo: {
                bar: [
                    void 0,
                    'foo'
                ]
            }
        });
        expect(obj).to.eql({});
        expect(obj).not.to.equal(result);
        obj = {};
        result = assoc(obj, 'foo.bar[1].qux', 'xyzzy');
        expect(result).to.eql({
            foo: {
                bar: [
                    void 0,
                    {
                        qux: 'xyzzy'
                    }
                ]
            }
        });
        expect(obj).to.eql({});
        expect(obj).not.to.equal(result);
        obj = [];
        result = assoc(obj, '[0].qux', 'xyzzy');
        expect(result).to.eql([
            {
                qux: 'xyzzy'
            }
        ]);
        expect(obj).to.eql([]);
        expect(obj).not.to.equal(result);
        obj = [];
        result = assoc(obj, '[1].qux', 'xyzzy');
        expect(result).to.eql([
            void 0,
            {
                qux: 'xyzzy'
            }
        ]);
        expect(obj).to.eql([]);
        expect(obj).not.to.equal(result);
        obj = [];
        result = assoc(obj, '[0]', 'xyzzy');
        expect(result).to.eql([ 'xyzzy' ]);
        expect(obj).to.eql([]);
        expect(obj).not.to.equal(result);
        expect(assoc(null, '[0]', 'xyzzy')).to.eql([ 'xyzzy' ]);
        expect(assoc(null, 'foo', 'bar')).to.eql({ foo: 'bar' });
    });
});

describe('#set', () => {
    it('set value at given path', () => {
        let obj;
        let result;
        obj = {
            foo: {
                bar: 'baz'
            }
        };
        result = set(obj, 'foo.bar', 'qux');
        expect(obj).to.eql({
            foo: {
                bar: 'qux'
            }
        });
        expect(result).to.equal(obj);
        obj = {
            foo: {
                bar: [
                    'baz',
                    'qux'
                ]
            }
        };
        result = set(obj, 'foo.bar[1]', 'foo');
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz',
                    'foo'
                ]
            }
        });
        expect(result).to.equal(obj);
        obj = {
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy'
                    }
                ]
            }
        };
        result = set(obj, 'foo.bar[1].bam', 'boom');
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy',
                        bam: 'boom'
                    }
                ]
            }
        });
        expect(result).to.equal(obj);
        obj = {};
        result = set(obj, 'foo.bar[1]', 'foo');
        expect(obj).to.eql({
            foo: {
                bar: [
                    void 0,
                    'foo'
                ]
            }
        });
        expect(result).to.equal(obj);
        obj = {};
        result = set(obj, 'foo.bar[1].qux', 'xyzzy');
        expect(obj).to.eql({
            foo: {
                bar: [
                    void 0,
                    {
                        qux: 'xyzzy'
                    }
                ]
            }
        });
        expect(result).to.equal(obj);
        obj = [];
        result = set(obj, '[0].qux', 'xyzzy');
        expect(obj).to.eql([
            {
                qux: 'xyzzy'
            }
        ]);
        expect(result).to.equal(obj);
        obj = [];
        result = set(obj, '[1].qux', 'xyzzy');
        expect(obj).to.eql([
            void 0,
            {
                qux: 'xyzzy'
            }
        ]);
        expect(result).to.equal(obj);
        obj = [];
        result = set(obj, '[0]', 'xyzzy');
        expect(obj).to.eql([ 'xyzzy' ]);
        expect(result).to.equal(obj);
        expect(set(null, '[0]', 'xyzzy')).to.eql([ 'xyzzy' ]);
        expect(set(null, 'foo', 'bar')).to.eql({ foo: 'bar' });
    });
});

describe('#dissoc', () => {
    it('dissoc value at given path', () => {
        let obj;
        let result;
        obj = {
            foo: {
                bar: 'baz'
            }
        };
        result = dissoc(obj, 'foo.bar');
        expect(result).to.eql({
            foo: {}
        });
        expect(obj).to.eql({
            foo: {
                bar: 'baz'
            }
        });
        expect(result).not.to.equal(obj);
        obj = {
            foo: {
                bar: [
                    'baz',
                    'qux'
                ]
            }
        };
        result = dissoc(obj, 'foo.bar[1]');
        expect(result).to.eql({
            foo: {
                bar: [
                    'baz'
                ]
            }
        });
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz',
                    'qux'
                ]
            }
        });
        expect(result).not.to.equal(obj);
        obj = {
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy',
                        bim: [ 'bam', 'boom' ]
                    }
                ]
            }
        };
        result = dissoc(obj, 'foo.bar[1].qux');
        expect(result).to.eql({
            foo: {
                bar: [
                    'baz',
                    {
                        bim: [ 'bam', 'boom' ]
                    }
                ]
            }
        });
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy',
                        bim: [ 'bam', 'boom' ]
                    }
                ]
            }
        });
        expect(result).not.to.equal(obj);
    });
});

describe('#drop', () => {
    it('drop value at given path', () => {
        let obj;
        let result;
        obj = {
            foo: {
                bar: 'baz'
            }
        };
        result = drop(obj, 'foo.bar');
        expect(obj).to.eql({
            foo: {}
        });
        expect(result).to.equal(obj)
        obj = {
            foo: {
                bar: [
                    'baz',
                    'qux'
                ]
            }
        };
        result = drop(obj, 'foo.bar[1]');
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz'
                ]
            }
        });
        expect(result).to.equal(obj);
        obj = {
            foo: {
                bar: [
                    'baz',
                    {
                        qux: 'xyzzy',
                        bim: [ 'bam', 'boom' ]
                    }
                ]
            }
        };
        result = drop(obj, 'foo.bar[1].qux');
        expect(obj).to.eql({
            foo: {
                bar: [
                    'baz',
                    {
                        bim: [ 'bam', 'boom' ]
                    }
                ]
            }
        });
        expect(result).to.equal(obj);
    });
});

describe('#merge', () => {
    it('merge objects', () => {
        expect(merge({
            foo: {
                bar: 'baz'
            }
        }, {
            foo: {
                qux: 'xyzzy'
            }
        })).to.eql({
            foo: {
                bar: 'baz',
                qux: 'xyzzy'
            }
        });
        expect(merge({
            foo: {
                bar: 'baz',
                qux: [
                    'foo'
                ]
            }
        }, {
            foo: {
                qux: [
                    void 0,
                    'xyzzy'
                ],
                bam: 'boom'
            }
        })).to.eql({
            foo: {
                bar: 'baz',
                qux: [
                    'foo',
                    'xyzzy'
                ],
                bam: 'boom'
            }
        });
    });
});

describe('#entries', () => {
    it('gets kv pairs for given object ', () => {
        expect(entries({
            foo: 'bar',
            baz: 'qux'
        })).to.eql([
            [ 'foo', 'bar' ],
            [ 'baz', 'qux' ]
        ]);
        expect(entries([
            'foo',
            'bar'
        ])).to.eql([
            [ 0, 'foo' ],
            [ 1, 'bar' ]
        ]);
    });
});

describe('#fill', () => {
    it('fills an array with a static value from a start index to an end index', () => {
        let arr;
        let result;
        arr = [ 1, 2, 3, 4 ];
        result = fill(arr, 0, 2, 4);
        expect(result).to.eql([
            1,
            2,
            0,
            0
        ]);
        expect(arr).not.to.equal(result);
        arr = new Array(4);
        result = fill(arr, 4);
        expect(result).to.eql([
            4,
            4,
            4,
            4
        ]);
        expect(arr).not.to.equal(result);
        arr = new Array(4);
        result = fill(arr, 4, 1);
        expect(result).to.eql([
            void 0,
            4,
            4,
            4
        ]);
        expect(arr).not.to.equal(result);
    });
});

describe('#pop', () => {
    it('returns last element of given array', () => {
        let arr;
        let result;
        arr = [ 1, 2, 3, 4 ];
        result = pop(arr);
        expect(result).to.eql(4);
        expect(arr).to.eql([ 1, 2, 3, 4 ]);
        expect(arr).not.to.equal(result);
    });
});

describe('#shift', () => {
    it('returns first element of given array', () => {
        let arr;
        let result;
        arr = [ 1, 2, 3, 4 ];
        result = shift(arr);
        expect(result).to.eql(1);
        expect(arr).to.eql([ 1, 2, 3, 4 ]);
        expect(arr).not.to.equal(result);
    });
});

describe('#push', () => {
    it('returns new array with given value added to the end', () => {
        let arr;
        let result;
        arr = [ 1, 2, 3 ];
        result = push(arr, 4);
        expect(result).to.eql([ 1, 2, 3, 4 ]);
        expect(arr).to.eql([ 1, 2, 3 ]);
        expect(arr).not.to.equal(result);
    });
});

describe('#unshift', () => {
    it('returns new array with given value added to the beginning', () => {
        let arr;
        let result;
        arr = [ 2, 3, 4 ];
        result = unshift(arr, 1);
        expect(result).to.eql([ 1, 2, 3, 4 ]);
        expect(arr).to.eql([ 2, 3, 4 ]);
        expect(arr).not.to.equal(result);
    });
});

describe('#reverse', () => {
    it('returns new array with elements of given array in reverse order', () => {
        let arr;
        let result;
        arr = [ 1, 2, 3 ];
        result = reverse(arr);
        expect(result).to.eql([ 3, 2, 1 ]);
        expect(arr).to.eql([ 1, 2, 3 ]);
        expect(arr).not.to.equal(result);
    });
});

describe('#sort', () => {
    it('returns a new array, sorted', () => {
        let arr;
        let result;
        arr = [ 2, 1, 3 ];
        result = sort(arr);
        expect(result).to.eql([ 1, 2, 3 ]);
        expect(arr).to.eql([ 2, 1, 3 ]);
        expect(arr).not.to.equal(result);
        arr = [ 12, 1, 3 ];
        result = sort(arr);
        expect(result).to.eql([ 1, 3, 12 ]);
        expect(arr).to.eql([ 12, 1, 3 ]);
        expect(arr).not.to.equal(result);
        arr = [ 'b', 'a', 'c' ];
        result = sort(arr);
        expect(result).to.eql([ 'a', 'b', 'c' ]);
        expect(arr).to.eql([ 'b', 'a', 'c' ]);
        expect(arr).not.to.equal(result);
    });
});

describe('#values', () => {
    it('returns values of given object', () => {
        expect(values({ foo: 'bar', bam: 'boom' })).to.eql([ 'bar', 'boom' ]);
        expect(values([ 'foo', 'bar', 'bam', 'boom' ])).to.eql([ 'foo', 'bar', 'bam', 'boom' ]);
    });
});

describe('#keys', () => {
    it('returns keys of given object', () => {
        expect(keys({ foo: 'bar', bam: 'boom' })).to.eql([ 'foo', 'bam' ]);
        expect(keys([ 'foo', 'bar', 'bam', 'boom' ])).to.eql([ 0, 1, 2, 3 ]);
    });
});
