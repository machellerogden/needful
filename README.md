# Needful

> Needful is a functionally-flavored micro library written in ECMAScript 2018.

[![Version](https://img.shields.io/npm/v/needful.svg)]() [![Travis](https://img.shields.io/travis/machellerogden/needful.svg)]() [![License](https://img.shields.io/npm/l/needful.svg)]()

> You can't always get what you want
> But if you try sometimes you just might find
> You get what you need

# A few reasons to use Needful:

* One tiny little UMD that covers the 90% use-case for functional-style JavaScript programming.
* All of the same `Array.prototype` methods you already know, but as immutable functions.
* Some of the most useful parts of lodash (such as keypath operations) without all the pieces you probably don't need.
* You understand how useful it is when `0` == `true` (clojurist-friendly)
* Did we mention immutability (with structural sharing courtest of [mediary](https://www.npmjs.com/package/mediary))?

# Why not use lodash / ramda / underscore?

Do you want a feature that Needful is missing? Use [Lodash](https://lodash.com/). It's got you covered.

Need automatic currying? Use [Ramda](https://ramdajs.com/). It's got your back.

Want something time-tested and battle-hardened? Use [Underscore](https://underscorejs.org/). It's been around forever—and it works.

Needful is smaller (~16kb) and simpler (a single export) than its peers while still covering practically everything you'll need for effective functional-style JavaScript programming (over 5 dozen functions!).

Needful does the needful, and no more.

# API

<a name="clone"></a>

## clone ⇒ <code>\*</code>
Fast, cheap & deep clone-like objects courtesy of [mediary](https://www.npmjs.com/package/mediary).

**Kind**: global variable  
**Returns**: <code>\*</code> - Returns cloned Object, Array or passes thru other values  
**See**: deepClone  
**Since**: 1.6.0  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value to clone. |

<a name="nil"></a>

## nil : <code>undefined</code>
A safe reference to `undefined`.

While it rarely happens in practice, `undefined` is not a keyword and it possible for it to be shadowed.

**Kind**: global variable  
**See**: isNil, notNil  
**Since**: 1.2.0  
<a name="isArray"></a>

## isArray(value) ⇒ <code>boolean</code>
A convenient reference to `Array.isArray`.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is an object, else `false`.  
**Since**: 1.2.1  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="is"></a>

## is(value, type) ⇒ <code>boolean</code>
Checks if `value` is of `type`.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is of given `type`, else `false`.  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |
| type | <code>&#x27;undefined&#x27;</code> \| <code>&#x27;boolean&#x27;</code> \| <code>&#x27;string&#x27;</code> \| <code>&#x27;number&#x27;</code> \| <code>&#x27;object&#x27;</code> \| <code>&#x27;function&#x27;</code> \| <code>&#x27;symbol&#x27;</code> | The type to check against. |

**Example**  
```js
is({}, 'object');
// => true

is([], 'object');
// => true

is(null, 'object');
// => true

is('foo', 'string');
// => true

is(123, 'number');
// => true
```
<a name="isNil"></a>

## isNil(value) ⇒ <code>boolean</code>
Checks if `value` is `null` or `undefined`.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is nullish, else `false`.  
**See**: nil, notNil  
**Since**: 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

**Example**  
```js
isNil(null)
// => true

isNil(void 0)
// => true

isNil(NaN)
// => false
```
<a name="notNil"></a>

## notNil(value) ⇒ <code>boolean</code>
Checks if `value` is not `null` and not `undefined`.

Complements `isNil`.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is not nullish, else `false`.  
**See**: nil, isNil  
**Since**: 1.2.1  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

**Example**  
```js
notNil(null)
// => false

notNil(void 0)
// => false

notNil(NaN)
// => true
```
<a name="isObject"></a>

## isObject(value) ⇒ <code>boolean</code>
Checks if `value` is not null and has a typeof 'object'.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is an object, else `false`.  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

**Example**  
```js
isObject({})
// => true

isObject([1, 2, 3])
// => true

isObject(Function)
// => true

isObject(null)
// => false
```
<a name="isEqual"></a>

## isEqual(value, other) ⇒ <code>boolean</code>
Compares `value` to `other` and tests for strict equality.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if the values are strictly equal, else `false`.  
**Since**: 1.4.0  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to compare. |
| other | <code>\*</code> | The other value to compare. |

**Example**  
```js
isEqual({}, {})
// => false

isEqual([], [])
// => false

const foo = {};
const bar = foo;
isEqual(foo, bar);
// => true

isEqual('a', 'a');
// => true
```
<a name="isFalse"></a>

## isFalse() ⇒ <code>boolean</code>
Checks if `value` is `false`.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` is equal to `false`.  
**See**: isTrue, isFalsy, isTruthy, not  
**Since**: 1.2.0  
<a name="isFalsy"></a>

## isFalsy(value) ⇒ <code>boolean</code>
Checks if `value` is falsy.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` is `null`, `undefined' or `false`.  
**See**: isTrue, isFalse, isTruthy, not  
**Since**: 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="complement"></a>

## complement(fn) ⇒ <code>boolean</code>
Given a function returns a function which when invoked will return the logically opposite value.

Note: `0` is considered to be truthy.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is an object, else `false`.  
**Since**: 1.2.1  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The value to check. |

**Example**  
```js
complement(() => true)();
// => false

complement(() => false)();
// => true

complement(() => nil)();
// => true

complement(() => 0)();
// => false
```
<a name="isTruthy"></a>

## isTruthy(value) ⇒ <code>boolean</code>
Checks if `value` is truthy.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` is not `null`, not `undefined' and not `false`.  
**See**: isTrue, isFalse, isFalsy, not  
**Since**: 0.0.2  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isZero"></a>

## isZero(value) ⇒ <code>boolean</code>
Checks if `value` is `0`.

JavaScript treats `0` as falsy, Needful treats `0` as truthy, so it makes sense to provide a functional helper for `0` checks.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` is `0`.  
**Since**: 1.5.3  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isString"></a>

## isString(value) ⇒ <code>boolean</code>
Checks if `value` is a string.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` of type 'string'.  
**Since**: 0.0.2  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isNumber"></a>

## isNumber(value) ⇒ <code>boolean</code>
Checks if `value` is a number.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` of type 'number'.  
**Since**: 0.0.2  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isBoolean"></a>

## isBoolean(value) ⇒ <code>boolean</code>
Checks if `value` is a boolean.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` of type 'boolean'.  
**Since**: 0.0.2  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isUndefined"></a>

## isUndefined(value) ⇒ <code>boolean</code>
Checks if `value` is undefined.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` of type 'undefined'.  
**Since**: 0.0.2  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isNull"></a>

## isNull(value) ⇒ <code>boolean</code>
Checks if `value` is null.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` is `null`.  
**Since**: 0.0.2  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="isPlainObject"></a>

## isPlainObject(value) ⇒ <code>boolean</code>
Checks if `value` is a plain object.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns true when `value` is a plain old JavaScript object.  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="not"></a>

## not()
Functional bang.

**Kind**: global function  
**Since**: 0.0.1  
<a name="partial"></a>

## partial(fn, ...args)
Partially apply arguments.

**Kind**: global function  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to partial apply arguments to. |
| ...args | <code>\*</code> | Argument to partially apply. |

**Example**  
```js
const concat = (a, b) => '' + a + b;
const fooify = partial(concat, 'foo');
fooify('bar');
// => 'foobar'
```
<a name="partialRight"></a>

## partialRight(fn, ...args)
Partially apply arguments, starting from the right of the arguments given at call time.

**Kind**: global function  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to partial apply arguments to. |
| ...args | <code>\*</code> | Argument to partially apply. |

**Example**  
```js
const concat = (a, b) => '' + a + b;
const fooify = partialRight(concat, 'foo');
fooify('bar');
// => 'barfoo'
```
<a name="clone"></a>

## clone(value) ⇒ <code>\*</code>
Deeply clones plain objects and arrays. Primitives are passed through unchanged.

**Kind**: global function  
**Returns**: <code>\*</code> - Returns cloned Object, Array or passes thru other values  
**Since**: 1.5.0  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Value to clone. |

<a name="fill"></a>

## fill(array, value, start, end) ⇒ <code>Array</code>
Fills all the elements of an array from a start index to an end index with a static value. The end index is not included.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns new array filled with given value from given start index through given end index.  
**Since**: 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array |
| value | <code>\*</code> | Value to fill. |
| start | <code>number</code> | Start index, defaults to `0`. |
| end | <code>number</code> | End index. |

**Example**  
```js
fill([ 1, 2, 3, 4 ], 0, 2, 4);
// => [1, 2, 0, 0]
```
<a name="push"></a>

## push(array, ...value) ⇒ <code>Array</code>
Adds one or more elements to the end of an array.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns new array with given value(s) added to the end.  
**Since**: 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array |
| ...value | <code>\*</code> | Value(s) to be added. |

**Example**  
```js
push([ 1, 2, 3 ], 4);
// => [1, 2, 3, 4]
```
<a name="reverse"></a>

## reverse(array) ⇒ <code>Array</code>
Reverse the order of a given array.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns new array with values in reverse order.  
**Since**: 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array |

**Example**  
```js
reverse([ 1, 2, 3 ]);
// => [3, 2, 1]
```
<a name="unshift"></a>

## unshift(array, ...value) ⇒ <code>Array</code>
Adds one or more elements to the beginning of an array.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns new array with given value(s) added to the beginning.  
**Since**: 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array |
| ...value | <code>\*</code> | Value(s) to be added. |

**Example**  
```js
unshift([ 1, 2, 3 ], 0);
// => [0, 1, 2, 3]
```
<a name="splice"></a>

## splice(array, start, count, ...values) ⇒ <code>Array</code>
Changes the contents of an array by removing or replacing existing elements and/or adding new elements.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns new array with `count` elements removed from `start` and `values` added at `start`.  
**Since**: 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array |
| start | <code>number</code> | Start index. |
| count | <code>number</code> | Delete count. |
| ...values | <code>\*</code> | Values to add. |

**Example**  
```js
splice([ 1, 2, 3, 4 ], 1, 1, 4);
// => [1, 4, 3, 4]
```
<a name="concat"></a>

## concat(...arrays) ⇒ <code>Array</code>
Merges two or more arrays.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns new array with `arrays` concatenated.  

| Param | Type | Description |
| --- | --- | --- |
| ...arrays | <code>Array</code> | Arrays to merge. |

**Example**  
```js
concat([ 1, 2 ], [ 3, 4 ]);
// => [1, 2, 3, 4]
```
<a name="join"></a>

## join(array, separator) ⇒ <code>Array</code>
Joins all elements of an array into a string.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns string with all elements of array joined. If given array is empty, returns empty string.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Array to join. |
| separator | <code>string</code> | String which separates each pair of adjacent elements of the array. |

**Example**  
```js
join([ 'a', 'b', 'c' ], '-');
// => 'a-b-c'
```
<a name="slice"></a>

## slice()
TODO

**Kind**: global function  
<a name="every"></a>

## every()
TODO

**Kind**: global function  
<a name="filter"></a>

## filter()
TODO

**Kind**: global function  
<a name="find"></a>

## find()
TODO

**Kind**: global function  
<a name="findIndex"></a>

## findIndex()
TODO

**Kind**: global function  
<a name="forEach"></a>

## forEach()
TODO

**Kind**: global function  
<a name="map"></a>

## map()
TODO

**Kind**: global function  
<a name="reduce"></a>

## reduce()
TODO

**Kind**: global function  
<a name="reduceRight"></a>

## reduceRight()
TODO

**Kind**: global function  
<a name="some"></a>

## some()
TODO

**Kind**: global function  
<a name="entries"></a>

## entries()
TODO

**Kind**: global function  
<a name="keys"></a>

## keys()
TODO

**Kind**: global function  
<a name="values"></a>

## values()
TODO

**Kind**: global function  
<a name="pop"></a>

## pop()
TODO

**Kind**: global function  
<a name="shift"></a>

## shift()
TODO

**Kind**: global function  
<a name="includes"></a>

## includes()
TODO

**Kind**: global function  
<a name="indexOf"></a>

## indexOf()
TODO

**Kind**: global function  
<a name="lastIndexOf"></a>

## lastIndexOf()
TODO

**Kind**: global function  
<a name="sort"></a>

## sort()
TODO

**Kind**: global function  
<a name="and"></a>

## and()
TODO

**Kind**: global function  
<a name="or"></a>

## or()
TODO

**Kind**: global function  
<a name="isEquiv"></a>

## isEquiv()
TODO

**Kind**: global function  
<a name="pipe"></a>

## pipe()
TODO

**Kind**: global function  
<a name="compose"></a>

## compose()
TODO

**Kind**: global function  
<a name="isEmpty"></a>

## isEmpty()
TODO

**Kind**: global function  
<a name="castPath"></a>

## castPath()
TODO

**Kind**: global function  
<a name="get"></a>

## get()
TODO

**Kind**: global function  
<a name="has"></a>

## has()
TODO

**Kind**: global function  
<a name="walkPath"></a>

## walkPath()
TODO

**Kind**: global function  
<a name="assoc"></a>

## assoc()
TODO

**Kind**: global function  
<a name="dissoc"></a>

## dissoc()
TODO

**Kind**: global function  
<a name="set"></a>

## set()
TODO

**Kind**: global function  
<a name="drop"></a>

## drop()
TODO

**Kind**: global function  
<a name="assign"></a>

## assign()
TODO

**Kind**: global function  
<a name="merge"></a>

## merge()
TODO

**Kind**: global function  
# See Also

* [as-needed](https://www.npmjs.com/package/as-needed)

# License

MIT
