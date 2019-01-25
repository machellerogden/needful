'use strict';

const chai = require('chai');
const { expect } = chai;

const {
    and,
    or,
    complement,
    falsy,
    truthy,
    bang,
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
    splice,
    unshift,
    concat,
    includes,
    indexOf,
    join,
    lastIndexOf,
    slice,
    entries,
    every,
    filter,
    find,
    findIndex,
    forEach,
    keys,
    map,
    reduce,
    reduceRight,
    some,
    values,
    isEmpty,
    isEqiv,
    isEqual,
    merge
} = require('.');

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

describe('#splice', () => {
    it('returns new array with given items spliced in', () => {
        let arr = [ 'foo', 'bar', 'qux' ];
        let result = splice(arr, 2, 0, 'bam', 'boom');
        expect(result).to.eql([ 'foo', 'bar', 'bam', 'boom', 'qux' ]);
        expect(arr).to.eql([ 'foo', 'bar', 'qux' ]);
        expect(arr).not.to.equal(result);
        let sub = { foo: 'bar' };
        arr = [ sub, 'foo', 'bar', 'qux' ];
        result = splice(arr, 3, 0, 'bam', 'boom');
        expect(result).to.eql([ sub, 'foo', 'bar', 'bam', 'boom', 'qux' ]);
        expect(arr).to.eql([ sub, 'foo', 'bar', 'qux' ]);
        expect(arr).not.to.equal(result);
        expect(sub).not.to.equal(result[0]);
    });
});

describe('#concat', () => {
    it('returns new array that is a concatenation of all given arrays', () => {
        let a = [ 'foo', 'bar' ];
        let b = [ 'qux', 'xyzzy' ];
        let c = [ { foo: 'bar' } ];
        let result = concat(a, b, c);
        expect(result).to.eql([ 'foo', 'bar', 'qux', 'xyzzy', { foo: 'bar' } ]);
        expect(a).to.eql([ 'foo', 'bar' ]);
        expect(b).to.eql([ 'qux', 'xyzzy' ]);
        expect(c).to.eql([ { foo: 'bar' } ]);
        expect(c[0]).not.to.equal(result[result.length - 1]);
    });
});

describe('#includes', () => {
    it('returns boolean indicating if a given array contains a given value', () => {
        let arr = [ 'foo', 'bar' ];
        let result = includes(arr, 'foo');
        expect(result).to.eql(true);
        arr = [ 'foo', 'bar' ];
        result = includes(arr, 'qux');
        expect(result).to.eql(false);
        let obj = {
            an: 'object'
        };
        arr = [ 'foo', obj, 'bar' ];
        result = includes(arr, obj);
        expect(result).to.eql(true);
    });
});

describe('#indexOf', () => {
    it('returns index of a given value in a given array', () => {
        let arr = [ 'foo', 'bar' ];
        let result = indexOf(arr, 'foo');
        expect(result).to.eql(0);
        arr = [ 'foo', 'bar' ];
        result = indexOf(arr, 'bar');
        expect(result).to.eql(1);
        arr = [ 'foo', 'bar' ];
        result = indexOf(arr, 'qux');
        expect(result).to.eql(-1);
        let obj = {
            an: 'object'
        };
        arr = [ 'foo', obj, 'bar' ];
        result = indexOf(arr, obj);
        expect(result).to.eql(1);
    });
});

describe('#lastIndexOf', () => {
    it('returns the last index of a given value in a given array', () => {
        let arr = [ 'foo', 'bar', 'foo' ];
        let result = lastIndexOf(arr, 'foo');
        expect(result).to.eql(2);
        arr = [ 'foo', 'bar' ];
        result = lastIndexOf(arr, 'qux');
        expect(result).to.eql(-1);
        let obj = {
            an: 'object'
        };
        arr = [ 'foo', obj, 'bar', obj ];
        result = lastIndexOf(arr, obj);
        expect(result).to.eql(3);
    });
});

describe('#join', () => {
    it('returns a string containing elements of given array joined by a given delimiter', () => {
        expect(join([ 'foo', 'bar', 'baz' ], '-')).to.eql('foo-bar-baz');
    });
});

describe('#slice', () => {
    it('returns a new array from given start index up until given end index', () => {
        expect(slice([ 1, 2, 3, 4 ], 1, 3)).to.eql([ 2, 3 ]);
        expect(slice([ 1, 2, 3, 4 ], 1)).to.eql([ 2, 3, 4 ]);
        // TODO: test immutability
    });
});

describe('#entries', () => {
    it('returns a new array containing key value pairs of given object or array', () => {
        expect(entries([ 1, 2, 3 ])).to.eql([ [ 0, 1], [ 1, 2 ], [ 2, 3] ]);
        expect(entries({ foo: 'bar', baz: 'qux', bam: 'boom' })).to.eql([ [ 'foo', 'bar' ], [ 'baz', 'qux' ], [ 'bam', 'boom' ] ]);
    });
});

describe('#every', () => {
    it('returns boolean indicating if given predicate returns true for each element in a given array', () => {
        expect(every([ 1, 2, 3 ], v => typeof v === 'number')).to.be.true;
        expect(every([ 1, 'foo', 3 ], v => typeof v === 'number')).to.be.false;
    });
});

describe('#filter', () => {
    it('returns new array containing only elements of given array which pass given predicate', () => {
        expect(filter([ 1, 2, 3 ], v => v % 2)).to.eql([ 1, 3]);
        // TODO: test immutability
    });
});

describe('#find', () => {
    it('returns first element from given array which matches predicate', () => {
        expect(find([ 1, 2, 3 ], v => v === 2)).to.eql(2);
        // TODO: test immutability
    });
});

describe('#findIndex', () => {
    it('returns index of first element from given array which matches predicate', () => {
        expect(findIndex([ 1, 2, 3 ], v => v === 2)).to.eql(1);
        // TODO: test immutability
    });
});

describe('#forEach', () => {
    it('iterates over each element in a given array', () => {
        const result = [];
        forEach([ 'foo', 'bar' ], (v, i) => result.push([ i, v ]));
        expect(result).to.eql([ [ 0, 'foo' ], [ 1, 'bar' ] ]);
        // TODO - more tests
    });
});

describe('#map', () => {
    it('returns a new array with values of given array mapped to given function', () => {
        expect(map([ 'foo', 'bar' ], v => v + 'boom')).to.eql([ 'fooboom', 'barboom' ]);
        // TODO - more tests
    });
});

describe('#reduce', () => {
    it('returns a new accumulated value based on given array and a reducing function', () => {
        //expect(reduce([ 'foo', 'bar', 'baz' ], (a = '', v) => (a + v, a))).to.eql('foobarbaz');
        // TODO - more tests
    });
});

describe('#reduceRight', () => {
    it('same as reduce but works right to left', () => {
        //expect(reduceRight([ 'foo', 'bar', 'baz' ], (a = '', v) => (a + v, a))).to.eql('bazbarfoo');
        // TODO
    });
});

describe('#some', () => {
    it('returns boolean indicating if given predicate returns true for each element in a given array', () => {
        expect(some([ 'foo', 'bar', 3 ], v => typeof v === 'number')).to.be.true;
        expect(some([ 'foo', 'bar', 'baz' ], v => typeof v === 'number')).to.be.false;
    });
});

describe('#isEmpty', () => {
    it('returns boolean indicating whether a given value is empty', () => {
        expect(isEmpty('foo')).to.be.false;
        expect(isEmpty('')).to.be.true;
        expect(isEmpty([ 'foo' ])).to.be.false;
        expect(isEmpty([])).to.be.true;
        expect(isEmpty({ foo: 'bar' })).to.be.false;
        expect(isEmpty({})).to.be.true;
        expect(isEmpty(void 0)).to.be.true;
        expect(isEmpty(null)).to.be.true;
        expect(isEmpty(false)).to.be.false;
        expect(isEmpty(0)).to.be.false;
    });
});

