---
id: type-utils--options-1
icon: explain
type: explanation
layout: layouts/doc.vto
title: Explain Capabilities
sidebar_title: Capabilities
versions:
  start: v0.0
author_id: ebntly
---
Capabilities are a collection of types indicating the capabilities of a type. They include a collection of capability settings that provide input to these capabilities for use in creating highly dynamic types.
# Terminology
## Capability consumer
A type representing a capability.
### Capability flag consumer
A capability consumer supporting `boolean` operations (`true` and `false`). It is recommended that a - `boolean` input setting is considered `false`, and that a `boolean` output is `true`.
```ts
type UseCollapsed<AsCollapsed extends boolean = boolean> = {
  [UseCollapsedKey]: AsCollapsed;
};
```
An example of a capability consumer, specifically a capability flag consumer.
### Capability option consumer
A capability consumer that supports fixed, non-boolean inputs.
```ts
type Positions = 'first' | 'last' | 'middle' | 'outside';
type UsePosition<Position extends Positions = Positions > = {
  [UsePositionKey]: Position;
};
```
An example of an capability option consumer.
### Capability constrained consumer
A capability consumer that accepts a non-fixed, but constrained input.
```ts
type UseKey<KeyName extends PropertyKey = PropertyKey > = {
  [UseKeyKey]: KeyName;
};
```
An example of a capability constrained consumer.
### Capability multi-setting consumer
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
### Capability compound consumer
A capability consumer that is a combination of other consumers. Compound consumers are capability consumer sets that act as a single capability consumer, and often are multi-setting consumers as well.
```ts
type UseCondition<
  ThenType extends unknown = unknown,
  ElseType extends unknown = unknown,
> = Then<ThenType> | Else<ElseType>;
```
An example of a compound, multi-setting capability consumer.
### Capability open consumer
A capability consumer that accepts any input.
```ts
type UseType<Type extends unknown = unknown> = {
	[UseTypeKey]: Type;
};
```
An example of an capability open consumer.
> Notice that in all of the capabilities, the default input type is the input type accepted by the capability.
### Capability setting
The input satisfying a capability consumer creating a capability broker.
### Capability consumer set
A collection of capability consumers representing all of the capabilities that a specific, or set of types, it supports.
```ts
type LogicCapSet = UseCondition | UseStream | UseDefault;
```
An example of a capability consumer set. It is recommended that a capability consumer set always be a *__union__* of capability consumers.
### Capability broker
A type configuration that satisfies a specific capability consumer.
```ts
type AsFirst = UsePosition<'first'>;
```
An example of a capability broker that would satisfy the `UsePosition` capability option consumer. The capability input of the `UsePosition` capability option consumer would be `'first'`.
### Capability broker set
A collection of type configuration that satisfies a capability consumer set.
```ts
type MyLogic = AsFilter & DefaultOf<string>; 
```
An example of a capability broker set that would satisfy the `LogicCapSet` capability consumer set. It is recommended that a capability broker set always be an intersection of capability brokers.

## Slang
These are terms used within the types themselves, in an effort to reduce the wordiness of the type definitions, and to make them easier to read.
These are not official terms, but they are used consistently across the types.
- **Capability**/**Cap** - Can refer to any capability consumer.
- **Capabilities**/**CapSet** - A capability consumer set.
- **Defaults** - The default capability settings of a type. This is the effective capability settings of a type when no capability settings - are provided.
- **Setting** - Can refer to any capability broker.
- **Settings** - A capability broker set.
# Capability consumers
## Capability flag consumers
| Capability | True | False (default/implied) |
|---|---|---|
| `UseAsync` | `AsAsync` | `AsSync` |
| `UseUnsafe` | `AsUnsafe` | `AsSafe` |
| `UseStrict` | `AsStrict` | `AsLoose` |
| `UseFilter` | `AsFilter` | `AsPredicate` |
| `UseSetter` | `AsSetter` | `AsGetter` |
| `UseBuiltin` | `AsBuiltin` | `AsCustom` |
| `UseReversed` | `AsReversed` | `AsForward` |
| `UseOptional` | `AsOptional` | `AsRequired` |
| `UseExcluded` | `AsExcluded` | `AsIncluded` |
| `UseReadonly` | `AsReadonly` | `AsWritable` |
| `UseInverted` | `AsInverted` | `AsInitial` |
## Capability option consumers
<!-- `UseRecord` -->
<!-- `UseDepth` -->
## Capability constrained consumers
<!-- `UseKeys` -->
<!-- `UseKeyMap` -->
<!-- `UsePaths` - If UseIdents is used, then will take precedence as it is more specific. -->
<!-- `UsePathMap` -->
## Capability open consumers
<!-- `UseDefault` -->
<!-- `UseOfType` -->
<!-- `UseThen` -->
<!-- `UseElse` -->
## Specialty consumers
<!-- `UseCondition` -->
<!-- `UseNullOption` -->
<!-- `UseRecordKeys` -->
## Utilities
<!-- `PickCapSetting` -->
<!-- `GetCapSetting` -->
<!-- `ResolveBoolean` -->
## Types
<!-- `BaseCapConsumerSet` -->
<!-- `BaseCapConsumerSetKeys` -->
