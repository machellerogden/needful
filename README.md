# Needful

> do the needful

Needful is a micro library for functional-style programming in Node v10+.

## Why not use ramda / lodash / underscore?

[Ramda](https://ramdajs.com/) is amazing. [Lodash](http://lodash.com) is insanely useful. [Underscore](https://underscorejs.org/) started a movement.

If you want to take a functional-style approach on the front-end, use one of
the above.

If you're working in Node (> LTS) then chances are that the above libraries all have more than you need. It's true you can pull together just the pieces you want but at some point, it's easier to just to require one tiny dependency that covers the 80% use case. Needful doesn't have everything you'll want, but has what you'll need for basic functional-style programming.

**Warning:** Node 10+ only.

# Reference

Unless otherwise noted, every function provided by this library can be expected to return a new deeply cloned value.

## nil

`nil` is a variable is provided as a safe way to reference `undefined`. Since `undefined` can actually be redefined, it is never safe to reference directly.

## isArray

`isArray` is a convenience reference to `Array.isArray`.

## is

`is` is functional wrapper around the `typeof` keyword. It takes a value and a string representation of a given JavaScript type and returns a boolean if the given value is of that type.

```js
is({}, 'object'); // true
is([], 'object'); // true
is(null, 'object'); // true
is('foo', 'string'); // true
is(123, 'number'); // true
```

## isNil

_TODO_

## complement

_TODO_

## notNil

_TODO_

## isObject

_TODO_

## isEqual

_TODO_

## isFalse

_TODO_

## falsy

_TODO_

## truthy

_TODO_

## isString

_TODO_

## isNumber

_TODO_

## isBoolean

_TODO_

## isUndefined

_TODO_

## isNull

_TODO_

## isPlainObject

_TODO_

## bang

_TODO_

## partial

_TODO_

## partialRight

_TODO_

## clone

_TODO_

## fill

_TODO_

## push

_TODO_

## reverse

_TODO_

## unshift

_TODO_

## splice

_TODO_

## concat

_TODO_

## join

_TODO_

## slice

_TODO_

## every

_TODO_

## filter

_TODO_

## find

_TODO_

## findIndex

_TODO_

## forEach

_TODO_

## map

_TODO_

## reduce

_TODO_

## reduceRight

_TODO_

## some

_TODO_

## entries

_TODO_

## keys

_TODO_

## values

_TODO_

## pop

_TODO_

## shift

_TODO_

## includes

_TODO_

## indexOf

_TODO_

## lastIndexOf

_TODO_

## sort

_TODO_

## and

_TODO_

## or

_TODO_

## isEqiv

_TODO_

## pipe

_TODO_

## compose

_TODO_

## isEmpty

_TODO_

## castPath

_TODO_

## get

_TODO_

## has

_TODO_

## walkPath

_TODO_

## assoc

_TODO_

## dissoc

_TODO_

## set

_TODO_

## drop

_TODO_

## assign

_TODO_

## merge

_TODO_

## See Also

* [as-needed](https://www.npmjs.com/package/as-needed)

## License

MIT
