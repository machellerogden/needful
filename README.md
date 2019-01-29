# Needful

Needful is a functionally-flavored micro library written in ECMAScript 2018.

[![Version](https://img.shields.io/npm/v/needful.svg)]() [![Travis](https://img.shields.io/travis/machellerogden/needful.svg)]() [![License](https://img.shields.io/npm/l/needful.svg)]()

# A few reasons to use Needful:
* single 3kb export covering the 80% use case
* immutability by default
* `0` == `true`

# Why not use lodash / ramda / underscore?

> You can't always get what you want
> But if you try sometimes you just might find
> You get what you need

Want a feature that Needful is missing? Use [Lodash](https://lodash.com/). It's got you covered.

Want automatic currying? Use [Ramda](https://ramdajs.com/). It's got your back.

Want something time-tested and battle-hardened? Use [Underscore](https://underscorejs.org/). It's been around forever—and it works.

Needful is smaller (3kb) and simpler (a single export) than its peers while still covering practically everything you'll need for effective functional-style JavaScript programming (over 5 dozen functions!).

Needful does the needful, and no more.

# API

<a name="nil"></a>

## nil : <code>undefined</code>
A safe reference to `undefined`.

While it rarely happens in practice, `undefined` is not a keyword and it
possible for it to be shadowed.

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

## partial()
Partially apply arguments.

**Kind**: global function  
<a name="partialRight"></a>

## partialRight()
Partially apply arguments, starting from the right of the arguments given
at call time.

**Kind**: global function  
<a name="clone"></a>

## clone()
Deeply clones plain objects and arrays.

**Kind**: global function  
<a name="fill"></a>

## fill()
TODO

**Kind**: global function  
<a name="push"></a>

## push()
TODO

**Kind**: global function  
<a name="reverse"></a>

## reverse()
TODO

**Kind**: global function  
<a name="unshift"></a>

## unshift()
TODO

**Kind**: global function  
<a name="splice"></a>

## splice()
TODO

**Kind**: global function  
<a name="concat"></a>

## concat()
TODO

**Kind**: global function  
<a name="join"></a>

## join()
TODO

**Kind**: global function  
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
