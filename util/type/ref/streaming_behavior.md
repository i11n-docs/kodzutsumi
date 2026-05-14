---
type: module
author_id: ebntly

layout: layouts/index.vto

title: Streaming behavior
---

This page describes the standard capabilities and behavior for streaming behavior.

## Operands

Streaming behavior is influenced by two operands, `Left` and `Right`, which represent the types being compared. The behavior is determined by the relationship between these two operands, as "Does `Left` extend `Right`?", except in cases where the behavior is influenced by the `AsInverted` setting of the `UseInverted` capability, in which case the relationship is "Does `Right` extend `Left`?".

## Capabilities

The logic types support the following capabilities that influence its behavior:

| Capability    | Default                     | Description                                                                        |
| ------------- | --------------------------- | ---------------------------------------------------------------------------------- |
| `UseUnsafe`   | `AsSafe` (***implied***)    | Determines if a `boolean` comparison result is cast to `true`.                     |
| `UseInverted` | `AsInitial` (***implied***) | Determines if the comparison result is inverted.                                   |
| `UseReversed` | `AsForward` (***implied***) | Determines if the type comparison is reversed.                                     |
| `UseUnified`  | `ASGHJK` (**default**)      | Determines if the comparison are distributed over a union or the union as a whole. |
| `UseStream`   | `AsPredicate` (**default**) | Determines if types are filtered out of a result or simply type checked.           |

> [!NOTE]
> The **implied** default means that if the capability is not explicitly set, it will be treated as the implied value.
> For example, if `UseUnsafe` is not set, it will be treated as `AsSafe`.
> The **default** means that if no capability is set, it will be treated as the default value and if not explicitly set, it will be treated as the implied value.


## Behavior

The behavior of conditional types is influenced by the capabilities set, which determine how the types are compared, how the comparison result is treated, and how the conditional branches are determined.

### Comparison

The `UseUnified` and `UseReversed` capabilities influence how the types are compared, either as a whole or distributed over a union, and whether the comparison is reversed. For this example let's compare `string` and `string | number`:

- With `UseUnified` as `ASGHJK` and `UseReversed` as `AsForward`, the comparison is "Does `string` extend `string | number`?", which results in `true`.
- With `UseUnified` as `ASGHJK` and `UseReversed` as `AsReversed`, the comparison is "Does `string | number` extend `string`?", which results in `false`.
- With `UseUnified` as `AsUnified` and `UseReversed` as `AsForward`, the comparison is "Does `[string]` extend `[string | number]`?", which results in `false`.
- With `UseUnified` as `AsUnified` and `UseReversed` as `AsReversed`, the comparison is "Does `[string | number]` extend `[string]`?", which results in `false`.

### Comparison result

The `UseUnsafe` and `UseInverted` capabilities influence how the comparison result is treated, either as a `boolean` or as a type, and whether the result is inverted.

There are cases where the comparison result is not explicitly `true` or `false`, resulting in a `boolean` result type. By default, the `boolean` result is treated as `false` (safe), as only cases where the comparison result is explicitly `true` are considered `true`. However, when `UseUnsafe` is set to `AsUnsafe`, the `boolean` result is treated as `true`, as it allows for the possibility of the comparison being `true` even if it cannot be determined at compile time. 

When `UseInverted` is set to `AsInverted`, the comparison result is inverted, meaning that `true` becomes `false` and `false` becomes `true`. This can be useful in cases where you want to check for the opposite condition.

### Streaming behavior

The `UseStream` capability influences how the types are treated in the result, either as a filtered type or as a type check. When `UseStream` is set to `AsFilter`, the types that do not satisfy the condition are filtered out of the result, resulting in a narrower type. When `UseStream` is set to `AsPredicate`, the result is a type check, effectively returning `true` or `false` based on whether the types satisfy the condition (see [Conditional Behavior matrix: IDs 1 - 32](../conditional-behavior/#behavior-matrix)).

## Behavior matrix

The behavior matrix outlines the outcomes based on different combinations of operand results and capability settings.

| ID  | `UseStream`       | `UseUnified`        | `UseReversed`     | `UseInverted`     | `UseUnsafe`    | Result |
| --- | ----------------- | ------------------- | ----------------- | ----------------- | -------------- | ------ |
| 1   | **`AsPredicate`** | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 2   | **`AsPredicate`** | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 3   | **`AsPredicate`** | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 4   | **`AsPredicate`** | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 5   | **`AsPredicate`** | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 6   | **`AsPredicate`** | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 7   | **`AsPredicate`** | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 8   | **`AsPredicate`** | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 9   | **`AsPredicate`** | **`AsUnified`**     | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 10  | **`AsPredicate`** | **`AsUnified`**     | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 11  | **`AsPredicate`** | **`AsUnified`**     | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 12  | **`AsPredicate`** | **`AsUnified`**     | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 13  | **`AsPredicate`** | **`AsUnified`**     | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 14  | **`AsPredicate`** | **`AsUnified`**     | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 15  | **`AsPredicate`** | **`AsUnified`**     | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 16  | **`AsPredicate`** | **`AsUnified`**     | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 17  | `AsFilter`        | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 18  | `AsFilter`        | **`AsDistributed`** | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 19  | `AsFilter`        | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 20  | `AsFilter`        | **`AsDistributed`** | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 21  | `AsFilter`        | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 22  | `AsFilter`        | **`AsDistributed`** | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 23  | `AsFilter`        | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 24  | `AsFilter`        | **`AsDistributed`** | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
| 25  | `AsFilter`        | **`AsUnified`**     | ***`AsForward`*** | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 26  | `AsFilter`        | **`AsUnified`**     | ***`AsForward`*** | ***`AsInitial`*** | `AsUnsafe`     |        |
| 27  | `AsFilter`        | **`AsUnified`**     | ***`AsForward`*** | `AsInverted`      | ***`AsSafe`*** |        |
| 28  | `AsFilter`        | **`AsUnified`**     | ***`AsForward`*** | `AsInverted`      | `AsUnsafe`     |        |
| 29  | `AsFilter`        | **`AsUnified`**     | `AsReversed`      | ***`AsInitial`*** | ***`AsSafe`*** |        |
| 30  | `AsFilter`        | **`AsUnified`**     | `AsReversed`      | ***`AsInitial`*** | `AsUnsafe`     |        |
| 31  | `AsFilter`        | **`AsUnified`**     | `AsReversed`      | `AsInverted`      | ***`AsSafe`*** |        |
| 32  | `AsFilter`        | **`AsUnified`**     | `AsReversed`      | `AsInverted`      | `AsUnsafe`     |        |
