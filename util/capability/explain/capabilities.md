---
id: cap-explain-001
type: explanation
author_id: ebntly

layout: layouts/doc.vto

title: Explain Capabilities
sidebar_title: Capabilities
versions:
  start: v0.0
---
Capabilities are a collection of types indicating the capabilities of a type. They include a collection of capability settings that provide input to these capabilities for use in creating highly dynamic types.

While capabilities can be used for any purpose in their implementation in types, they are named such to support specific functionality, and to provide some predictability of the result they provide when used on their own, or with other capabilities.
# Capability consumer
A capability consumer is a type that identifies a supported capability in a type.

## Capability flag consumer
A capability consumer supporting only `boolean` settings (`true` and `false`).

```ts
type UseCollapsed<AsCollapsed extends boolean = boolean> = {
  [UseCollapsedKey]: AsCollapsed;
};
```
An example of a capability consumer, specifically a capability flag consumer.
### Available consumers
This is the list of the provided capability flag consumers described by their intended purpose.

#### UseAsync

The `UseAsync` capability is designed primarily for indicating support for concurrency in implementing types.

Asynchronous behavior is for types that are not resolved, or will be.
Synchronous behavior is for types that are already resolved or are known at creation.

#### UseBuiltin

The `UseBuiltin` capability is designed primarily for indicating there support for a custom implementation of a built-in feature in implementing types.

Builtin behavior uses the builtin feature.
Custom behavior uses a custom variant of the builtin feature.

#### UseDistributed

The `UseDistributed` capability is deisgnned for indicating support for distributing calculations over each type in a union.

Distributive behavior is acting on each type in the union independently.
Union behavior is actig on the union as a whole.

#### UseExcluded

The `UseExcluded` capability is designed primarily for indicating support for exclusion and inclusion in implementing types.

Excluded behavior is for types that are excluded from the result.
Included behavior is for types that are included in the result.

#### UseInverted

The `UseInverted` capability is designed primarily for indicating support for inversion in implementing types.

`UseInverted` differs from [`UseReversed`](#use-reversed) in that `UseInverted` is for north-south inversion, while `UseReversed` is for east-west inversion. `UseInverted` to flip a boolean result (`true` to `false`, and `false` to `true`) or a stack of operations, while `UseReversed` is for flipping the order of types in a tuple or union, or change the direction of a comparison.

Inverted behavior is for types that are inverted.
Initial behavior is for types that are retain their initial state.

#### UseOptional

The `UseOptional` capability is designed primarily for indicating support for optionality in implementing types.

Optional behavior is for types that are optional.
Required behavior is for types that are required.

#### UseImmutable

The `UseImmutable` capability is designed primarily for indicating support for immutability in implementing types.

Immutable behavior is for types that are readonly.
Mutable behavior is for types that are mutable.

#### UseReversed

The `UseReversed` capability is designed primarily for indicating support for reversal in implementing types.

`UseReversed` differs from [`UseInverted`](#use-inverted) in that `UseReversed` is for east-west inversion, while `UseInverted` is for north-south inversion. `UseReversed` is for flipping the order of types in a tuple or union, or change the direction of a comparison, while `UseInverted` is to flip a boolean result (`true` to `false`, and `false` to `true`) or a stack of operations.

Reversed behavior is for types that are reversed.
Forward behavior is for types that retain their initial state.

#### UseSetter

The `UseSetter` capability is designed primarily for indicating support for accessor behavior in implementing types.

Setter behavior is for types that are set with a value.
Getter behavior is for types that are accessed for their value.

#### UseStream

The `UseStream` capability is designed primarily for indicating support for streaming behavior in implementing types.

Filtering behavior is for types that are filtered out of the result.
Predicate behavior is for type checks.

#### UseStrict

The `UseStrict` capability is designed primarily for indicating supporting for type comparison strictness in implementing types. In TypeScript, types are a set and can contain subtypes. We can compare these types loosely or strictly. This capability, when implemented, can provide support for both.

Strict behavior is exact matching of one type to another, so `"hello world"` strictly compared to `string` would be false. And only `string` compared to `string` would be true.
Loose behavior does exact matching, but also checks whether a type is a subtype of another, so `"hello world"` loosely compared to `string` would be true.

#### UseUnsafe

The `UseUnsafe` capability is designed primarily for indicating support for unsafe behavior in implementing types.

This is generally used to constrain a result, say from `boolean` to `true`, or to `false`, but it can be used for any behavior that is considered unsafe, such as using `any` or `unknown` in a type. It may be easier to think of it as a `UseStrict` for resulting types.

Unsafe behavior is for types that are unsafe, or return types that are strict.
Safe behavior is for types that are safe, or return types that are loose.
<!-- 
## Capability option consumer
A capability consumer that supports fixed, non-boolean inputs.
```ts
type Positions = 'first' | 'last' | 'middle' | 'outside';
type UsePosition<Position extends Positions = Positions > = {
  [UsePositionKey]: Position;
};
```
An example of an capability option consumer.

### Available consumers

## Capability constrained consumer
A capability consumer that accepts a non-fixed, but constrained input.
```ts
type UseKey<KeyName extends PropertyKey = PropertyKey > = {
  [UseKeyKey]: KeyName;
};
```
An example of a capability constrained consumer.
## Capability multi-setting consumer
A capability consumer that accepts multiple, usually dependent, types.
```ts
type UseRecordKeys<
  Type extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
  Keys extends key of Type = keyof Type,
> = {
  [UseRecordKeysKey]: [Type, Keys];
};
```
An example of a multi-setting capability consumer.
## Capability compound consumer
A capability consumer that is a combination of other consumers. Compound consumers are capability consumer sets that act as a single capability consumer, and often are multi-setting consumers as well.
```ts
type UseCondition<
  ThenType extends unknown = unknown,
  ElseType extends unknown = unknown,
> = Then<ThenType> | Else<ElseType>;
```
An example of a compound, multi-setting capability consumer.
## Capability open consumer
A capability consumer that accepts any input.
```ts
type UseType<Type extends unknown = unknown> = {
	[UseTypeKey]: Type;
};
```
An example of an capability open consumer.
> Notice that in all of the capabilities, the default input type is the input type accepted by the capability.
## Capability setting
The input satisfying a capability consumer creating a capability broker.
## Capability consumer set
A collection of capability consumers representing all of the capabilities that a specific, or set of types, it supports.
```ts
type LogicCapSet = UseCondition | UseStream | UseDefault;
```
An example of a capability consumer set. It is recommended that a capability consumer set always be a *__union__* of capability consumers.
## Capability broker
A type configuration that satisfies a specific capability consumer.
```ts
type AsFirst = UsePosition<'first'>;
```
An example of a capability broker that would satisfy the `UsePosition` capability option consumer. The capability input of the `UsePosition` capability option consumer would be `'first'`.
## Capability broker set
A collection of type configuration that satisfies a capability consumer set.
```ts
type MyLogic = AsFilter & DefaultOf<string>; 
```
An example of a capability broker set that would satisfy the `LogicCapSet` capability consumer set. It is recommended that a capability broker set always be an intersection of capability brokers.

# Slang
These are terms used within the types themselves, in an effort to reduce the wordiness of the type definitions, and to make them easier to read.
These are not official terms, but they are used consistently across the types.
- **Capability**/**Cap** - Can refer to any capability consumer.
- **Capabilities**/**CapSet** - A capability consumer set.
- **Defaults** - The default capability settings of a type. This is the effective capability settings of a type when no capability settings - are provided.
- **Setting** - Can refer to any capability broker.
- **Settings** - A capability broker set.
# Capability flag consumers


# Capability option consumers
`UseRecord`
`UseDepth`
# Capability constrained consumers
`UseKeys`
`UseKeyMap`
`UsePaths` - If UseIdents is used, then will take precedence as it is more specific.
`UsePathMap`
# Capability open consumers
`UseDefault`
`UseOfType`
`UseThen`
`UseElse`
# Specialty consumers
`UseCondition`
`UseNullOption`
`UseRecordKeys`
#### Utilities
`PickCapSetting`
`GetCapSetting`
`ResolveBoolean`
# Types
`BaseCapConsumerSet`
`BaseCapConsumerSetKeys` -->
